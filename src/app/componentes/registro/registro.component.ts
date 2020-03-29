import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CepService } from 'src/app/services/cep.service';
import { FormValidations } from 'src/app/services/form-validations';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  form;
  public mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskcel = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor(
    private formBuild: FormBuilder,
   private router: Router,
   private authService: AuthService,
   private empresaService: EmpresasService,
   private cepService: CepService,
  ) { 
    this.form = this.formBuild.group({
      usuario: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15), // Maximum length is 15 characters
        this.validateUsuario // Custom validation
      ])],
      email: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
        this.validateEmail])],
      telefone:[''],
      whatsappcelular:[''],         
      tipo_negocio:[''],   
      meio_pagamento:[''],
      dias_horarios: [''],
      delivery:[''],
      instagram:[''],
      facebook:[''],
      site:[''],
      obs: [''],
      descricao: [''],
      
      endereco: this.formBuild.group({
        cep: ['', [Validators.required, FormValidations.cepValidator]],
        numero: ['' ],
        complemento: [''],
        rua: [''],
        bairro: [''],
        cidade: [''],
        estado: [''],
       
      })  ,
      senha: ['', Validators.compose([
        Validators.required
      ])],
      // Confirm Password Input
      confirm: ['', Validators.required] // Field is required
    }, { validator: this.matchingPasswords('senha', 'confirm') });        

  }
  registroSubmit(){
    const registerSocio = this.form.value;
    console.log(registerSocio);
    const user = {
      "descricao": registerSocio.descricao,
    "usuario": registerSocio.usuario,
    "email": registerSocio.email,
    "telefone": registerSocio.telefone,
    "whatsapp" : registerSocio.whatsappcelular,
    "senha": registerSocio.senha,
    "cep": registerSocio.endereco.cep,
    "endereco": registerSocio.endereco.rua,
    "bairro": registerSocio.endereco.bairro,
    "cidade": registerSocio.endereco.cidade,
    "uf": registerSocio.endereco.estado,
    "tipo_negocio": registerSocio.tipo_negocio,
    "meio_pagamento": [
        "Dinheiro",
        "Crédito",
        "Débito"
    ],
    "dias_horarios": registerSocio.dias_horarios,
    "delivery": registerSocio.delivery,
    "instagram": registerSocio.instagram,
    "facebook": registerSocio.facebook,
    "site": registerSocio.site,
    "obs": registerSocio.obs
    }
    console.log(user)
    this.empresaService.registerUser(user).subscribe(data =>{
     if (!data) {
       this.messageClass = 'alert alert-danger'; // Return error class
       this.message = data; // Return error message
       this.processing = false; // Enable submit button       
     } else {
       this.messageClass = 'alert alert-success'; // Return success class
       this.message = data; // Return success message     
       // Clear form data after two seconds
       setTimeout(() => {        
         this.processing = false; // Enable submit button
         this.message = false; // Erase error/success message
         this.form.reset(); // Reset all form fields          
       }, 2000);
     }
    })
  } 
  consultaCEP(value) {
   const cep = this.form.get('endereco.cep').value;

   if (cep != null && cep !== '') {
     this.cepService.consultaCEP(cep)
     .subscribe(dados => this.populaDadosForm(dados));
   }
 }

 populaDadosForm(dados) {
   // this.form.setValue({});

   this.form.patchValue({    
     endereco: {
       rua: dados.logradouro,
       //cep: dados.cep,
       complemento: dados.complemento,
       bairro: dados.bairro,
       cidade: dados.localidade,
       estado: dados.uf
     },
    
   });
}
// Function to disable the registration form
disableForm() {
  this.form.controls['email'].disable();
  this.form.controls['usuario'].disable();
  this.form.controls['senha'].disable();
  this.form.controls['confirm'].disable();
}

// Function to enable the registration form
enableForm() {
  this.form.controls['email'].enable();
  this.form.controls['usuario'].enable();
  this.form.controls['senha'].enable();
  this.form.controls['confirm'].enable();
}

// Function to validate e-mail is proper format
validateEmail(controls) {
  // Create a regular expression
  const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  // Test email against regular expression
  if (regExp.test(controls.value)) {
    return null; // Return as valid email
  } else {
    return { 'validateEmail': true } // Return as invalid email
  }
}

// Function to validate usuario is proper format
validateUsuario(controls) {
  // Create a regular expression
  const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
  // Test usuario against regular expression
  if (regExp.test(controls.value)) {
    return null; // Return as valid usuario
  } else {
    return { 'validateUsuario': true } // Return as invalid usuario
  }
}

// Function to validate senha
validatePassword(controls) {
  // Create a regular expression
  const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
  // Test senha against regular expression
  if (regExp.test(controls.value)) {
    return null; // Return as valid senha
  } else {
    return { 'validatePassword': true } // Return as invalid senha
  }
}

// Funciton to ensure senhas match
matchingPasswords(senha, confirm) {
  return (group: FormGroup) => {
    // Check if both fields are the same
    if (group.controls[senha].value === group.controls[confirm].value) {
      return null; // Return as a match
    } else {
      return { 'matchingPasswords': true } // Return as error: do not match
    }
  }
}

  ngOnInit(): void {
  }

}
