import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorAlquileresComponent } from './contenedor-alquileres.component';

describe('ContenedorAlquileresComponent', () => {
  let component: ContenedorAlquileresComponent;
  let fixture: ComponentFixture<ContenedorAlquileresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenedorAlquileresComponent]
    });
    fixture = TestBed.createComponent(ContenedorAlquileresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
