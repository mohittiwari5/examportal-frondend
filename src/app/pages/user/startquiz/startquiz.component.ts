import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-startquiz',
  templateUrl: './startquiz.component.html',
  styleUrls: ['./startquiz.component.css']
})
export class StartquizComponent implements OnInit {

  qid: any;
  questions: any;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timer:any;

  constructor(private locationStrategy: LocationStrategy, private route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this.route.snapshot.params['qid'];
    this.loadQuestions();
  }



  public loadQuestions() {
    this.questionService.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data) => {
        this.questions = data;
        this.questions.forEach((q: any) => {
          q['givenAnswer'] = '';
          this.timer = this.questions.length * 2 * 60;
        })
        console.log(this.questions)
      },
      (error) => {
        Swal.fire("Error", "Error in loading questions of quiz", error);
      }
    );
  }


  //prevent to back when on start quiz page
  public preventBackButton() {
    history.pushState(null, "", location.href);
    this.locationStrategy.onPopState(
      () => {
        history.pushState(null, "", location.href);
      }
    );
  }

  //to calculate the quiz marks
  public submitQuiz() {

    Swal.fire({
      title: 'Are you sure to Submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: "No",
      icon: 'question'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isSubmit = true;
        //calculation
        this.questions.forEach((q: any) => {
          if (q.givenAnswer == q.answer) {
            this.correctAnswers++;
            let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
            this.marksGot += marksSingle;
          }

          if(q.givenAnswer.trim() != ''){
            this.attempted++;
          }

        });
        console.log("Correct Answer::" + this.correctAnswers);
        console.log("Marks Got::" + this.marksGot);

      }
    })

  }


  public startTimer(){
    let t = window.setInterval(()=>{
      
      if(this.timer<=0){
        this.submitQuiz();
        clearInterval(t);
      }


    },1000)
  }

}
