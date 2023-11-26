import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAgregarUsuarioComponent } from './detalle-agregar-usuario.component';

describe('DetalleAgregarUsuarioComponent', () => {
  let component: DetalleAgregarUsuarioComponent;
  let fixture: ComponentFixture<DetalleAgregarUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAgregarUsuarioComponent]
    });
    fixture = TestBed.createComponent(DetalleAgregarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
