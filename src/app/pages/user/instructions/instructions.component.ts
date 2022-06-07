import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qid:any;
  quiz:any;

  constructor(private route:ActivatedRoute,private router:Router,private quizService:QuizService) { }

  ngOnInit(): void {
    this.qid = this.route.snapshot.params['qid'];
    this.quizService.getQuiz(this.qid).subscribe(
      (data) => {
        this.quiz = data;
      },
      (error) => {
        alert("Error in Instruction loading quiz data");
      }
    );
  }

  public startQuiz(){

    Swal.fire({
      title: 'Do you want to start the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      cancelButtonText: "Cancel",
      icon:'question'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this.router.navigate(['/startquiz/'+this.qid]);   
      }
    })
    
  }

}
