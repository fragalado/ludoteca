import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent {
  id: string = '';
  usuario?: Usuario;
  constructor(private fbs: FirebaseService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.devuelveUsuarioId();
  }

  // Método que busca el usuario segun el id
  devuelveUsuarioId(): void {
    this.fbs
      .getFireBasePorId('usuarios', this.id)
      .subscribe((res) => (this.usuario = res));
  }

  // Método que actualiza el usuario en la bbdd
  actualizaUsuario(): void {
    this.fbs
      .updateFireBase(this.usuario, 'usuarios', this.usuario?.id!)
      .then(() =>
        Swal.fire({
          title: 'Actualizado!',
          text: 'Usuario ha sido actualizado',
          icon: 'success',
        })
      )
      .catch(() =>
        Swal.fire({
          title: 'Oops...!',
          text: 'El usuario no ha sido actualizado',
          icon: 'error',
        })
      );
  }
}
