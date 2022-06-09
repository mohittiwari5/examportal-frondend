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
        this.timer = this.questions.length * 2 * 60;
        // this.questions.forEach((q: any) => {
        //   q['givenAnswer'] = '';
        // })
        console.log(this.questions)
        this.startTimer();
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
        this.evalQuiz();
      }
    })

  }

  public evalQuiz(){
    this.isSubmit = true;

    //call to server to evaluate quiz on server
    this.questionService.evalQuiz(this.questions).subscribe(
      (data:any) => {
        console.log("Data from server:: "+JSON.stringify(data));
        this.attempted = data.attempted;
        this.marksGot = data.marksGot;
        this.correctAnswers = data.correctAnswers;
        this.isSubmit = true;
      },
      (error) => {
        console.log("error in Sending to Server::"+error);
      }
    );

        //calculation
        // this.questions.forEach((q: any) => {
        //   if (q.givenAnswer == q.answer) {
        //     this.correctAnswers++;
        //     let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
        //     this.marksGot += marksSingle;
        //   }

        //   if(q.givenAnswer.trim() != ''){
        //     this.attempted++;
        //   }

        // });
        // console.log("Correct Answer::" + this.correctAnswers);
        // console.log("Marks Got::" + this.marksGot);
  }


  public startTimer(){
    let t = window.setInterval(()=>{
      
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }
      else{
        this.timer--;
      }

    },1000)
  }


  public getFormattedTime(){
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer-mm*60;
    return`${mm} min : ${ss} sec`
  }

}
