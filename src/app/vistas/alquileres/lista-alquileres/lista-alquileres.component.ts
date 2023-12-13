import { Component } from '@angular/core';
import { Alquiler, DatosAlquiler } from 'src/app/modelos/alquiler';
import { Juego } from 'src/app/modelos/juego';
import { Usuario } from 'src/app/modelos/usuario';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-lista-alquileres',
  templateUrl: './lista-alquileres.component.html',
  styleUrls: ['./lista-alquileres.component.css']
})
export class ListaAlquileresComponent {
  alquileres: Alquiler[] = []; // Variable donde guardaremos los alquileres
  //alquiler?: Alquiler; // Variable para crear objetos de tipo Alquiler
  alquileresString?: any[]; // Variable donde almacenaremos los alquileres de la base de datos
  juegos?: Juego[];
  usuarios?: Usuario[];

  constructor(private fbs: FirebaseService) { }

  ngOnInit() {
    this.obtieneAlquiler();
  }

  // Método que obtiene los alquileres
  // En la base de datos tendremos idJuego, idUsuario, fechaInicio y fechaFin
  // El método obtendrá el juego que tenga ese id y el usuario que tenga el id
  obtieneAlquiler() {
    // Obtenemos los alquileres de la base de datos
    this.fbs.getFireBase('alquileres').subscribe((res) => {
      // Guardamos los alquileres en alquileresString
      // Aqui tendremos idUsuario:string y idJuego:string
      this.alquileresString = res;

      this.fbs.getFireBase("juegos").subscribe((res2) => {
        this.juegos = res2;

        this.fbs.getFireBase("usuarios").subscribe((res3) => {
          this.usuarios = res3;

          // Limpiamos la lista alquileres
          this.alquileres = [];

          // Ahora recorremos la lista alquileres
          this.alquileresString?.forEach((alquiler) => {

            var juegoGuardado: Juego = { nombreJuego: "", urlImagen: "" };
            var usuarioGuardado: Usuario = { nombre: "", apellidos: "", email: "" };

            // Recorremos los juegos y buscamos el idJuego del alquiler
            this.juegos?.forEach((juego) => {
              if (alquiler.idJuego == juego.id) {
                juegoGuardado = juego;
              }
            })

            // Recorremos los usuarios y buscamos el idUsuario del alquiler
            this.usuarios?.forEach((usuario) => {
              if (usuario.id == alquiler.idUsuario)
                usuarioGuardado = usuario;
            })

            // Comprabamos si existe id en juegoGuardado y usuarioGuardado
            if (juegoGuardado.id && usuarioGuardado.id) {
              // Ahora creamos un alquiler y lo guardamos en la lista alquileres
              const alquilerDatos: Alquiler = {
                id: alquiler.id,
                fechaFin: alquiler.fechaFin,
                fechaInicio: alquiler.fechaInicio,
                juego: juegoGuardado,
                usuario: usuarioGuardado,
              }

              this.alquileres.push(alquilerDatos);
            }
          })
        })
      })
    });
  }

  // Método que elimina un alquiler pasado por parámetros de la base de datos
  deleteAlquiler(alquiler: Alquiler) {
    this.fbs
      .deleteFireBase(alquiler, 'alquileres')
      .then(() =>
        Swal.fire({
          title: 'Eliminado!',
          text: 'Alquiler ha sido eliminado',
          icon: 'success',
        })
      )
      .catch(() =>
        Swal.fire({
          title: 'Oops...!',
          text: 'El alquiler no ha sido eliminado',
          icon: 'error',
        })
      );
  }
}
