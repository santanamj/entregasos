import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  domain = environment.domain;  
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  authToken: any;
  user: any;
  options;
  currentUser = {};
  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }
  getToken() {
    return localStorage.getItem('id_token');
  }
  // Function to get token from client local storage
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token; // Get token and asssign to variable to be used elsewhere
  }
  // Function to register user accounts
  registerUser(user) {   
    return this.http.post(this.domain + 'v1/empresas', user)
  }
  login(user: User) {
    return this.http.post<any>(`${this.domain}api/login`, user)
  }
  // Function to logout
  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }
  
 
  getUsers(id) {
    
    return this.http.get(this.domain + 'api/profile/' + id, this.options)
  }
}
