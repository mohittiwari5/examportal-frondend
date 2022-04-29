import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qid:any;
  title:any;
  questions:any = [];

  constructor(private route:ActivatedRoute,
              private questionService:QuestionService,
              private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qid = this.route.snapshot.params['id'];
    this.title = this.route.snapshot.params['title'];

    this.questionService.getQuestionsOfQuiz(this.qid).subscribe(
      (data) => {
        this.questions=data;
        console.log(this.questions);
        
      },
      (error) => {
        this.snack.open("Something went wrong!",'',{
          duration: 3000
        });
      }
    );
  }

  public deleteQuestion(quesId:any){
    this.questionService.deleteQuestion(quesId).subscribe(
      (data) => {
        this.questions = this.questions.filter((question:any)=> question.quesId != quesId);
        Swal.fire("Successfull","Question Deleted Successfully",'success');
      },
      (error) => {
        Swal.fire("Failed","Error in Deleting Question.",'error');
      }
    );

  }

}
