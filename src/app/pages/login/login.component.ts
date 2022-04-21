import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginData = {
    username:'',
    password:''
  }

  constructor(private snack:MatSnackBar,private loginService:LoginService) { }

  ngOnInit(): void {
  }

  public formSubmit(){
    
    if(this.loginData.username.trim()=="" || this.loginData.username==null){
      this.snack.open("Username is required",'',{
        duration:3000
      });
      return;
    }

    if(this.loginData.password.trim()=="" || this.loginData.password==null){
      this.snack.open("Password is required",'',{
        duration:3000
      });
      return;
    }

    //request server to generate token
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
          console.log('SUCCESS:::'+data.token);

          //Login.....
          this.loginService.loginUser(data.token);
          this.loginService.getCurrentUser().subscribe(
            (user:any) => {
              this.loginService.setUser(user);
              console.log("USER IN GENERATE TOKEN:::"+JSON.stringify(user));

              //redirect: ADMIN -> admin-dashboard
              //redirect: NORMAL -> normal-dashboard


            },
            (error) => {

            }
          );

      },
      (error) => {
        console.log("ERROR::"+error);
      }
    );
  }

}
