import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qId = 0;
  quiz: any;
  categories: any = [];

  constructor(private route: ActivatedRoute,
    private quizService: QuizService,
    private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qid'];
    // alert(this.qId);
    this.quizService.getQuiz(this.qId).subscribe(
      (data) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);

      }
    );

    this.categoryService.categories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        alert("Error in category loading ")
      }
    );

  }

  public updateQuiz() {
    //validate quiz




    this.quizService.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire("SUCCESS", 'Quiz Updated Successfully', 'success').then(
          (result) => {
            this.router.navigate(['/admin-dashboard/view-quizzes']);
          });
      },
      (error) => {
        Swal.fire("Error!", "Error in updating Quiz", 'error');
      }
    );

  }

}
