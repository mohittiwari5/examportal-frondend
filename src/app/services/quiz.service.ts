import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public quizzes(){
    return this.http.get(`${baseUrl}/quiz/`)
  }

  //add quiz
  public addQuiz(quiz:any){
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }


  //delete quiz
  public deleteQuiz(quizId:any){
    return this.http.delete(`${baseUrl}/quiz/${quizId}`);
  }

  //get the single quiz
  public getQuiz(quizId:any){
    return this.http.get(`${baseUrl}/quiz/${quizId}`);
  }

   //update  quiz
   public updateQuiz(quiz:any){
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }

  //get quizzes of category
  public getQuizzesOfCategory(cid:any){
    return this.http.get(`${baseUrl}/quiz/category/${cid}`);
  }

}
