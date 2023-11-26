import { Component } from '@angular/core';
import { Alquiler, DatosAlquiler } from 'src/app/modelos/alquiler';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-lista-alquileres',
  templateUrl: './lista-alquileres.component.html',
  styleUrls: ['./lista-alquileres.component.css']
})
export class ListaAlquileresComponent {
  alquileres: Alquiler[] = []; // Variable donde guardaremos los alquileres
  alquiler?: Alquiler; // Variable para crear objetos de tipo Alquiler
  alquileresString?: any[]; // Variable donde almacenaremos los alquileres de la base de datos

  constructor(private fbs: FirebaseService) {}

  ngOnInit() {
    this.obtieneAlquiler();
  }

  // Método que obtiene los alquileres
  // En la base de datos tendremos idJuego, idUsuario, fechaInicio y fechaFin
  // El método obtendrá el juego que tenga ese id y el usuario que tenga el id
  obtieneAlquiler() {
    // Limpiamos la lista alquileres
    this.alquileres = [];

    // Obtenemos los alquileres de la base de datos
    this.fbs.getFireBase('alquileres').subscribe((res) => {
      // Guardamos los alquileres en alquileresString
      // Aqui tendremos idUsuario:string y idJuego:string
      this.alquileresString = res;

      // Ahora vamos a recorrer alquileresString
      this.alquileresString.forEach((element: DatosAlquiler) => {
        // Obtenemos el juego según el id
        this.fbs
          .getFireBasePorId('juegos', element.idJuego)
          .subscribe((dataJuego) => {
            // Guardamos el juego en la constante juego
            const juego = dataJuego;

            // Hacemos lo mismo para usuario
            this.fbs
              .getFireBasePorId('usuarios', element.idUsuario)
              .subscribe((dataUsuario) => {
                // Guardamos el usuario en la constante usuario
                const usuario = dataUsuario;

                // Ahora creamos un objeto alquiler con los datos
                this.alquiler = {
                  id: element.id,
                  juego: juego,
                  usuario: usuario,
                  fechaInicio: element.fechaInicio,
                  fechaFin: element.fechaFin,
                };

                // Por ultimo
                // Lo añadimos a la lista alquileres
                this.alquileres.push(this.alquiler);
              });
          });
      });
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
