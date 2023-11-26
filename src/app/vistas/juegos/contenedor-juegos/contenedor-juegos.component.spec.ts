import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorJuegosComponent } from './contenedor-juegos.component';

describe('ContenedorJuegosComponent', () => {
  let component: ContenedorJuegosComponent;
  let fixture: ComponentFixture<ContenedorJuegosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenedorJuegosComponent]
    });
    fixture = TestBed.createComponent(ContenedorJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
