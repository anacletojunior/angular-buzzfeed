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
  private authHeader: string = "";
  private authToken: string = "";

  constructor(private http: HttpClient) { }

  getQuizzData(): Observable<any> {
    // Cria o objeto HttpHeaders com a chave e valor de autenticação
    const headers = new HttpHeaders({
      [this.authHeader]: this.authToken
    });

    // Repassa os headers na chamada do método get
    // e extrai o campo 'record' que contém os dados reais
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        // JSONBin retorna os dados no campo 'record'
        return response.record || response;
      }),
      catchError(error => {
        console.log('Erro ao buscar dados do endpoint, usando dados locais:', error);
        // Em caso de erro, retorna os dados locais
        return of(localQuizz);
      })
    );
  }
}