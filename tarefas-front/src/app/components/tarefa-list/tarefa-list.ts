import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { TarefaService } from '../../services/tarefa';
import { Tarefa } from '../../models/tarefa.model';

@Component({
  selector: 'app-tarefa-list',
  imports: [DatePipe],
  templateUrl: './tarefa-list.html',
  styleUrl: './tarefa-list.css',
})
export class TarefaList implements OnInit {
  @Input() filtro: string = 'Todas';
  @Output() editar = new EventEmitter<Tarefa>();
  @Output() erroHttp = new EventEmitter<string>();
  @Output() sucesso = new EventEmitter<string>();

  tarefas: Tarefa[] = [];
  carregando: boolean = true;

  tarefaParaExcluir: Tarefa | null = null;
  excluindo: boolean = false;

  constructor(
    private tarefaService: TarefaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.carregando = true;

    this.tarefaService
      .listar()
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (dados) => (this.tarefas = dados),
        error: () =>
          this.erroHttp.emit(
            'Não foi possível conectar ao servidor. Verifique se a API está rodando.',
          ),
      });
  }

  get tarefasFiltradas(): Tarefa[] {
    if (this.filtro === 'Pendentes') return this.tarefas.filter((t) => t.status === 'Pendente');
    if (this.filtro === 'Concluídas') return this.tarefas.filter((t) => t.status === 'Concluída');
    return this.tarefas;
  }

  abrirModalExclusao(tarefa: Tarefa): void {
    this.tarefaParaExcluir = tarefa;
  }

  fecharModalExclusao(): void {
    if (!this.excluindo) {
      this.tarefaParaExcluir = null;
    }
  }

  confirmarExclusao(): void {
    if (!this.tarefaParaExcluir?.id) return;

    this.excluindo = true;

    this.tarefaService
      .deletar(this.tarefaParaExcluir.id)
      .pipe(
        finalize(() => {
          this.excluindo = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.sucesso.emit('Tarefa excluída com sucesso!');

          this.tarefaParaExcluir = null;

          this.carregarTarefas();
        },
        error: () => this.erroHttp.emit('Falha ao excluir a tarefa. Tente novamente.'),
      });
  }
}
