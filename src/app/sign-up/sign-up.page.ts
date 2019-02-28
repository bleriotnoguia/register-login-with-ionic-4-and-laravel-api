import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(public authService: AuthService , public router: Router) { }

  ngOnInit() {
  }

  username:string = '';
  password:string = '';
  c_password:string = '';
  phone_number:number;
  email:string = '';

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  navigate(){
    this.router.navigate(['/home']);
  }

  errorFunc(message){
    alert(message);
  }

  myRegister(){
 
    if (this.email.trim()  &&  this.username.trim()  && this.password.trim() ) {  
      if (this.password.trim()  === '') {
        this.errorFunc('Please put your password')
      }else{
        let credentials = {
          email: this.email,
          username: this.username,
          phone_number: this.phone_number,
          password: this.password,
          c_password: this.c_password
        };
         this.authService.createAccount(credentials).then((result) => {
            //console.log(result);
            this.navigate();
        }, (err) => {
            console.log(err);
            this. errorFunc('Wrong credentials ! try again')
            console.log("credentials: "+JSON.stringify(credentials));
        });
 
      }
      
   }
   else{
    this. errorFunc('Please put a vaild password !  for ex:(12345678)')
    }
 

}


}
