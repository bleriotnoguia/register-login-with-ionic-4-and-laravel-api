import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: any;
  apiKey: string = 'http://localhost:8000/';

  constructor(public storage: Storage , public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  createAccount(details){
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
 
        this.http.post(this.apiKey+'api/register', details, {headers: headers})
          .subscribe(res => {
            this.token = res['data']['token'];
            this.storage.set('token', res['data']['token']);
            console.log(res['data']['token']);
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  login(credentials){
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders();
       headers.append('Access-Control-Allow-Origin' , '*');
       headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
       headers.append('Accept','application/json');
       headers.append('content-type','application/json');
     
        this.http.post(this.apiKey+'oauth/token', credentials, {headers: headers})
          .subscribe(res => {
            this.token = res['access_token'];
            this.storage.set('token', res['access_token']);
            console.log(res['access_token']);
            resolve(res);
            }, (err) => {
            reject(err);
          
          });  
    });
  }

  checkAuthentication(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        this.token = value;
        resolve(this.token)
      }) 
    });        
  }

  logout(){
    this.storage.set('token', '');
   }

}