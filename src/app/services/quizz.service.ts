import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import localQuizz from '../../assets/data/quizz_questions.json';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  private apiUrl = environment.apiUrl;
  private authHeader: string = 'X-Access-Key';
  private authToken: string = environment.apiKey;

  constructor(private http: HttpClient) { }

  getQuizzData(): Observable<any> {
    
    const headers = new HttpHeaders({
      [this.authHeader]: this.authToken
    });

    
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map(response => {
        
        return response.record;
      }),
      catchError(error => {
        console.log('Erro ao buscar dados do endpoint, usando dados locais:', error);
        
        return of(localQuizz);
      })
    );
  }
}