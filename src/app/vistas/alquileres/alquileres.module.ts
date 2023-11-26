import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlquileresRoutingModule } from './alquileres-routing.module';
import { FormsModule } from '@angular/forms';
import { ContenedorAlquileresComponent } from './contenedor-alquileres/contenedor-alquileres.component';
import { DetalleAlquilerComponent } from './detalle-alquiler/detalle-alquiler.component';
import { ListaAlquileresComponent } from './lista-alquileres/lista-alquileres.component';


@NgModule({
  declarations: [
    ContenedorAlquileresComponent,
    DetalleAlquilerComponent,
    ListaAlquileresComponent
  ],
  imports: [
    CommonModule,
    AlquileresRoutingModule,
    FormsModule
  ]
})
export class AlquileresModule { }
