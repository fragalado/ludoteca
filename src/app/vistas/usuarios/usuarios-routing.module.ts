import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorUsuariosComponent } from './contenedor-usuarios/contenedor-usuarios.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { DetalleAgregarUsuarioComponent } from './detalle-agregar-usuario/detalle-agregar-usuario.component';

const routes: Routes = [
  {
    path: "", component: ContenedorUsuariosComponent, children: [
      { path: "listado", component: ListaUsuariosComponent },
      { path: "detalle/:id", component: DetalleUsuarioComponent },
      { path: "agregar", component: DetalleAgregarUsuarioComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
