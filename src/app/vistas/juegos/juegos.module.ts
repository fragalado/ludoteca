import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { FormsModule } from "@angular/forms";
import { ContenedorJuegosComponent } from './contenedor-juegos/contenedor-juegos.component';
import { DetalleJuegoComponent } from './detalle-juego/detalle-juego.component';
import { ListaJuegosComponent } from './lista-juegos/lista-juegos.component';



@NgModule({
  declarations: [
    ContenedorJuegosComponent,
    DetalleJuegoComponent,
    ListaJuegosComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule,
  ]
})
export class JuegosModule { }
