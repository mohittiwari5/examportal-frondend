import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {

    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: ""

  };

  constructor(private _snackBar: MatSnackBar,private userService:UserService) { }

  ngOnInit(): void {
  }

  public formSubmit(){
    
    if(this.user.username === '' || this.user.username === null){
      //alert("User is required!");
      this._snackBar.open("Username is required",'',{
        duration: 2000,
      });
      return;
    }

    //addUser: userservice
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        Swal.fire('SUCCESS','User '+ this.user.username+' is generated','success');
      },
      (error) => {
          //error
        //alert("Error::"+error);
        this._snackBar.open("Something went wrong",'',{
          duration: 2000,
        });
      }
    );

  }



}
