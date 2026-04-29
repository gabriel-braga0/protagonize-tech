import { Component, ViewChild } from '@angular/core';
import { TarefaForm } from './components/tarefa-form/tarefa-form';
import { TarefaList } from './components/tarefa-list/tarefa-list';
import { Tarefa } from './models/tarefa.model';

@Component({
  selector: 'app-root',
  imports: [TarefaForm, TarefaList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  modalAberto = false;
  tarefaEmEdicao: Tarefa | null = null;
  filtroAtivo = 'Todas';

  toast: { visivel: boolean; mensagem: string; tipo: 'sucesso' | 'erro' } = {
    visivel: false,
    mensagem: '',
    tipo: 'sucesso',
  };

  @ViewChild(TarefaList) componenteLista!: TarefaList;

  abrirModalNovaTarefa(): void {
    this.tarefaEmEdicao = null;
    this.modalAberto = true;
  }

  abrirModalEdicao(tarefa: Tarefa): void {
    this.tarefaEmEdicao = tarefa;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.tarefaEmEdicao = null;
  }

  mostrarToast(mensagem: string, tipo: 'sucesso' | 'erro'): void {
    this.toast = { visivel: true, mensagem, tipo };
    setTimeout(() => {
      this.toast.visivel = false;
    }, 4000);
  }

  onAcaoFormulario(evento: { mensagem: string; tipo: 'sucesso' | 'erro' }): void {
    if (evento.tipo === 'sucesso') {
      this.fecharModal();
      this.componenteLista.carregarTarefas();
    }
    this.mostrarToast(evento.mensagem, evento.tipo);
  }

  aplicarFiltro(status: string): void {
    this.filtroAtivo = status;
  }
}
