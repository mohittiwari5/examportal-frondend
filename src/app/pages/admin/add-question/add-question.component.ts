import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  qId: any;
  title: any;
  question = {
    quiz: {
      qid: ''
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  }

  constructor(private route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qid'];
    this.title = this.route.snapshot.params['title'];

    this.question.quiz['qid'] = this.qId;

  }

  public addQuestion() {

    //
    //TODO: Validation for all fields to not to be blank
    //


    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }

    this.questionService.addQuestion(this.question).subscribe(
      (data) => {
        Swal.fire("SUCCESS", "Question added successfully.", 'success');
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
      },
      (error) => {
        Swal.fire("Failed !", "Error in adding question on Server", 'error');
      }
    );
  }

}
