import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any = [];



  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.quizService.quizzes().subscribe(
      (data:any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },

      (error) => {
        Swal.fire('Error !','Error in loading data','error')
      }
    );
  }

  public deleteQuiz(qid:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
     
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(qid).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz:any)=> quiz.qid != qid)
            Swal.fire('Deleted!','Your file has been deleted.','success');            
          },
          (error) => {
            Swal.fire('Error!',"Error in deleting Quiz",'error')
          }
        );         
      }
    })
  }
  
}
