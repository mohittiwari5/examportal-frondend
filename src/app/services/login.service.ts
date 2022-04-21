import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  //current user which is logged in
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //login user:Set Token in Local Storage
  public loginUser(token: any) {
    localStorage.setItem("token", token);
    return true;
  }

  //isLogin: user is Logged in or not
  public isLoggedIn() {
    let tokenString = localStorage.getItem("token");

    if (tokenString == undefined || tokenString == "" || tokenString == null) {
      return false;
    }

    return true;
  }

  //Logout: remove token from local storage
  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //get token
  public getToken() {
    return localStorage.getItem("token");
  }

  //set user details
  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  //get USer details
  public getUser() {
    let userString = localStorage.getItem("user");
    if (userString != null) {
      return JSON.parse(userString);
    }
    else {
      this.logout();
      return null;
    }
  }

  //get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }




}
