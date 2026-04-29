import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private apiUrl = 'https://localhost:7226/api/Tarefas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
  }

  criar(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, tarefa);
  }

  atualizar(id: number, tarefa: Tarefa): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, tarefa);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
