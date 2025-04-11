import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import localQuizz from '../../assets/data/quizz_questions.json';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  private apiUrl = 'https://api.jsonbin.io/v3/b/67f898a38960c979a582cbbd';
  
  // IMPORTANTE: Substitua '$YOUR_ACCESS_KEY' pelo seu token real de acesso ao JSONBin
  private authHeader: string = 'X-Access-Key';
  private authToken: string = '$2a$10$vgCdwcQFiMBCYKAU.MjSIuJCJgovINPU.cbtKW/IXJ0i3pMzn7ALG';

  constructor(private http: HttpClient) { }

  getQuizzData(): Observable<any> {
    // Cria o objeto HttpHeaders com a chave e valor de autenticação
    const headers = new HttpHeaders({
      [this.authHeader]: this.authToken
    });

    // Repassa os headers na chamada do método get
    // e extrai o campo 'record' que contém os dados reais
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
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