import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  email:string = '';
  password:string = '';

  ngOnInit() {
  }

  navigate(){
    this.router.navigate(['/home']);
  }

  errorFunc(msg: string){
    alert(msg);
  }

  myLogIn(){
 
    if (this.email.trim() !=='') {    
      
      console.log(this.email.trim() + "   " + this.password.trim());
       
      if (this.password.trim()  === '') {
        this.errorFunc('Please put your password');
      }else{
          let credentials = {
              username: this.email, // because laravel use email as username by default for authentication 
              password: this.password,
              grant_type: 'password', // grant_type, client_id and client_secret was used here because i used passport package to create my API
              client_id: '2',
              client_secret: 'sOHcGgTHeFyc0XMVwbKtMDpJlQs8sX14SaVH5FlI'
          };
  
          this.authService.login(credentials).then((result) => {
              // console.log(result);
              console.log(result['access_token']);
              this.navigate();
          }, (err) => {
              console.log(err);
              this.errorFunc('Wrong credentials ! try again');
              console.log("credentials: "+JSON.stringify(credentials));
          });
      }
    }
    else{
        this.errorFunc('Please put a vaild password !  for ex:(123456)');
    }
}

}
