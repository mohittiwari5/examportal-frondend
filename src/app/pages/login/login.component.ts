import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginData = {
    username: '',
    password: ''
  }

  constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  public formSubmit() {

    if (this.loginData.username.trim() == "" || this.loginData.username == null) {
      this.snack.open("Username is required", '', {
        duration: 3000
      });
      return;
    }

    if (this.loginData.password.trim() == "" || this.loginData.password == null) {
      this.snack.open("Password is required", '', {
        duration: 3000
      });
      return;
    }

    //request server to generate token
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('SUCCESS:::' + data.token);

        //Login.....
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            this.loginService.setUser(user);
            console.log("USER IN GENERATE TOKEN:::" + JSON.stringify(user));

            //redirect: ADMIN -> admin-dashboard
            //redirect: NORMAL -> normal-dashboard

            if (this.loginService.getUserRole() === "ADMIN") {
              //admin-dashboard
              this.router.navigate(['admin-dashboard']);
              this.loginService.loginStatusSubject.next(true);

            }
            else if (this.loginService.getUserRole() === "NORMAL") {
              //user-dashboard
              this.router.navigate(['user-dashboard/0']);
              this.loginService.loginStatusSubject.next(true);
            }
            else {
              this.loginService.logout();
            }
          },
          (error) => {
            this.snack.open("Invalid Details!!");
          }
        );

      },
      (error) => {
        console.log("ERROR::" + error);
        this.snack.open("Invalid Details!!", '', {
          duration: 3000
        });
      }
    );
  }

}
