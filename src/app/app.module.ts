import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule, NavbarModule, WavesModule, ButtonsModule, TableModule, ModalModule, InputsModule, ChartsModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { TextMaskModule } from 'angular2-text-mask';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { EmpresasComponent } from './componentes/empresas/empresas.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ProdutosComponent } from './componentes/produtos/produtos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { EmpresasService } from './services/empresas.service';
import { ProdutosService } from './services/produtos.service';
import { ErrorMsgComponent } from './shared/error-msg/error-msg.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmpresasComponent,
    LoginComponent,
    RegistroComponent,
    ProdutosComponent,
    ErrorMsgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule, 
    TextMaskModule,   
    MDBBootstrapModule.forRoot(),
    NavbarModule, WavesModule, ButtonsModule, TableModule, ModalModule, InputsModule, ChartsModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService, EmpresasService, ProdutosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
