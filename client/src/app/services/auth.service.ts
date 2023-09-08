import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serviceUrl: string = 'http://localhost:3000';
  token: string;
  user: any;

  redirectUrl: string;

  constructor(private http: HttpClient, private toastController: ToastController) { 
    this.token = sessionStorage.getItem('token');
    if(!this.token)
      this.token = localStorage.getItem('token');
  }

  async Login(loginDetails: {url: string, userName: string, password: string, stayLoggedIn: boolean}) {
    try {
      this.serviceUrl = loginDetails.url;
      localStorage.setItem('url', this.serviceUrl);
      let token = await this.http.post(`${this.serviceUrl}/auth/login`, loginDetails).toPromise() as {access_token: string};
      if(token) {
        this.token = token.access_token;
        sessionStorage.setItem('token', this.token);
        if(loginDetails.stayLoggedIn)
          localStorage.setItem('token', this.token);
        this.user = await this.http.get(`${this.serviceUrl}/user/self`, {headers: {'Authorization': 'Bearer '+this.token}}).toPromise();
      }
      return true;
    } catch (error) {
      console.log(error);
      const toast = await this.toastController.create({
        color: 'danger',
        message: error.error.message,
        duration: 2000
      });
      toast.present();
    }
  }

  async Logout() {
    this.token = undefined;
    this.user = undefined;
    sessionStorage.clear();
    localStorage.removeItem('token');
  }

  async isLoggedIn() {
    try {
      this.user = await this.http.get(`${this.serviceUrl}/user/self`, {headers: {'Authorization': 'Bearer '+this.token}}).toPromise();
      return true;
    } catch (error) {
      return false;
    }
  }

  async Get<T>(url: string, queryParams?: {[id: string]: string}): Promise<T> {
    return await this.http.get(`${this.serviceUrl}${url}`, {headers: {'Authorization': 'Bearer '+this.token}, params: queryParams}).toPromise() as Promise<T>;
  }

  async Post<T>(url: string, body: any): Promise<T> {
    return await this.http.post(`${this.serviceUrl}${url}`, body, {headers: {'Authorization': 'Bearer '+this.token}}).toPromise() as Promise<T>;
  }

  async Put<T>(url: string, body: any): Promise<T> {
    return await this.http.put(`${this.serviceUrl}${url}`, body, {headers: {'Authorization': 'Bearer '+this.token}}).toPromise() as Promise<T>;
  }
}
