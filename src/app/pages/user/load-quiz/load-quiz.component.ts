import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId: any;
  quizzes: any;
  constructor(private route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params) => {
        this.catId = params['catId'];
        if (this.catId == 0) {
          this.quizService.getActiveQuizzes().subscribe(
            (data) => {
              this.quizzes = data;
              console.log(this.quizzes)
            },
            (error) => {
              alert("Error is loading quizzes")
            }
          );
        }
        else {
          console.log("load specific quiz");
          this.quizService.getActiveQuizzesOfCategory(this.catId).subscribe(
            (data) => {
                this.quizzes = data;
            },
            (error) => {
                alert("Error in load specific quiz ")
            }
          );
        }

      }
    );


  }

}
