import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { TarefaService } from '../../services/tarefa';
import { Tarefa } from '../../models/tarefa.model';

@Component({
  selector: 'app-tarefa-form',
  imports: [ReactiveFormsModule],
  templateUrl: './tarefa-form.html',
  styleUrl: './tarefa-form.css',
})
export class TarefaForm implements OnChanges {
  @Input() tarefa: Tarefa | null = null;
  @Output() fechar = new EventEmitter<void>();
  @Output() acaoConcluida = new EventEmitter<{ mensagem: string; tipo: 'sucesso' | 'erro' }>();

  form: FormGroup;
  salvando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private tarefaService: TarefaService,
  ) {
    this.form = this.fb.group({
      id: [null],
      titulo: ['', [Validators.required, Validators.maxLength(120)]],
      descricao: ['', Validators.maxLength(500)],
      status: ['Pendente', Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.tarefa) {
      this.form.patchValue(this.tarefa);
    } else {
      this.form.reset({ status: 'Pendente' });
    }
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;
    const dados = { ...this.form.value };

    if (dados.id) {
      this.tarefaService
        .atualizar(dados.id, dados)
        .pipe(finalize(() => (this.salvando = false)))
        .subscribe({
          next: () =>
            this.acaoConcluida.emit({
              mensagem: 'Tarefa atualizada com sucesso!',
              tipo: 'sucesso',
            }),
          error: () =>
            this.acaoConcluida.emit({
              mensagem: 'Erro ao conectar com a API para atualizar.',
              tipo: 'erro',
            }),
        });
    } else {
      delete dados.id;

      this.tarefaService
        .criar(dados)
        .pipe(finalize(() => (this.salvando = false)))
        .subscribe({
          next: () =>
            this.acaoConcluida.emit({ mensagem: 'Tarefa criada com sucesso!', tipo: 'sucesso' }),
          error: () =>
            this.acaoConcluida.emit({
              mensagem: 'Erro ao conectar com a API para criar.',
              tipo: 'erro',
            }),
        });
    }
  }
}
