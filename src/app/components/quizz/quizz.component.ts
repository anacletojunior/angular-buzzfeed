import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../services/quizz.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string =""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false
  
  
  quizzData: any;
  

  isLoading: boolean = true;

  constructor(private quizzService: QuizzService) { }

 
  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  ngOnInit(): void {
    this.loadQuizzData();
  }

  loadQuizzData(): void {
    this.isLoading = true;
    this.quizzService.getQuizzData().subscribe(
      data => {
        this.quizzData = data;
        this.initializeQuizz();
        this.isLoading = false;
      },
      error => {
        console.error('Erro ao carregar dados do quiz:', error);
        this.isLoading = false;
      }
    );
  }

  initializeQuizz(): void {
    if(this.quizzData){
      this.finished = false;
      this.title = this.quizzData.title;

      this.questions = this.quizzData.questions;
      this.questionSelected = this.questions[this.questionIndex];
      
      this.questionSelected.options = this.shuffleArray([...this.questionSelected.options]);

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;

      console.log(this.questionIndex);
      console.log(this.questionMaxIndex);
    }
  }

  playerChoose(value:string){
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep(){
    this.questionIndex+=1;

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex];
        
        this.questionSelected.options = this.shuffleArray([...this.questionSelected.options]);
    }else{
      const finalAnswer:string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = this.quizzData.results[finalAnswer as keyof typeof this.quizzData.results];
    }
  }

  async checkResult(anwsers:string[]){
    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous;
        }else{
          return current;
        }
    });

    return result;
  }
}
