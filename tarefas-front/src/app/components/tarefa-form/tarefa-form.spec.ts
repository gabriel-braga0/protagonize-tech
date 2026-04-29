import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaForm } from './tarefa-form';

describe('TarefaForm', () => {
  let component: TarefaForm;
  let fixture: ComponentFixture<TarefaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TarefaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
