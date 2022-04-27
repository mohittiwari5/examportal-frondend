import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories:any = [];

  quizData = {
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:''
    }
  }

  constructor(private categoryService:CategoryService,private snack:MatSnackBar,private quizService:QuizService) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data:any) => {
          //load categories
          this.categories = data;
          //console.log(this.categories);          
      },
      (error) => {
        console.log("Error in ADD QUIZ::"+error);
        Swal.fire('ERROR!',"Error in loading data from server",'error');
      }
    );
  }


  public addQuiz(){
    if(this.quizData.title.trim()=='' || this.quizData.title==null ){
        this.snack.open("Title can't empty",'',{
          duration:3000,
          verticalPosition:'top'
        })
      return;
    }

    //validation

    //call server
    this.quizService.addQuiz(this.quizData).subscribe(
      (data) => {
        Swal.fire('Success','Quiz is successfully added','success');
        this.quizData = {
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
            cid:''
          }
        }
        
      },
      (error) => {
        Swal.fire('Failed','Error in adding quiz','error');
        console.log(error);
        
      }
    );
    
  }

}
