import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    title: '',
    description: ''
  }


  constructor(private categoryService: CategoryService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  public formSubmit() {
    // console.log('Inside')
    if (this.category.title.trim() == '' || this.category.title == null) {
      this.snack.open("Title can not be empty!", '', {
        duration: 3000,
        verticalPosition: 'top',        
      })
      return;
    }

    this.categoryService.addCategory(this.category).subscribe(
      (data) => {
        Swal.fire("SUCCESS",'Category Added successfully','success');
        this.category.title = '';
        this.category.description = '';
      },

      (error) => {
        console.log(error);
        Swal.fire("Failed",'Server Error','error');
      }
    );


  }

}
