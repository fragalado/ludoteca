import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ContenedorUsuariosComponent } from './contenedor-usuarios/contenedor-usuarios.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { DetalleAgregarUsuarioComponent } from './detalle-agregar-usuario/detalle-agregar-usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    ContenedorUsuariosComponent,
    DetalleUsuarioComponent,
    DetalleAgregarUsuarioComponent,
    ListaUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule
  ]
})
export class UsuariosModule { }
