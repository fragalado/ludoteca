import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorJuegosComponent } from './contenedor-juegos/contenedor-juegos.component';
import { ListaJuegosComponent } from './lista-juegos/lista-juegos.component';
import { DetalleJuegoComponent } from './detalle-juego/detalle-juego.component';


const routes: Routes = [
  {
    path: "", component: ContenedorJuegosComponent, children: [
      { path: "listado", component: ListaJuegosComponent },
      { path: "detalle/:id", component: DetalleJuegoComponent },
      { path: "agregar", component: DetalleJuegoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
