import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorAlquileresComponent } from './contenedor-alquileres/contenedor-alquileres.component';
import { ListaAlquileresComponent } from './lista-alquileres/lista-alquileres.component';
import { DetalleAlquilerComponent } from './detalle-alquiler/detalle-alquiler.component';


const routes: Routes = [
  {
    path: "", component: ContenedorAlquileresComponent, children: [
      { path: "listado", component: ListaAlquileresComponent },
      { path: "detalle/:id", component: DetalleAlquilerComponent },
      { path: "agregar", component: DetalleAlquilerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlquileresRoutingModule { }
