import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public categories:any;
  constructor(private categoryService:CategoryService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data)  => {

        this.categories = data;

      },
      (error) => {
        this.snack.open("Error is loading categories from server","",
        {
          duration: 3000
        })
      }
    );
  }

}
