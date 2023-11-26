import { Component } from '@angular/core';
import { Juego } from 'src/app/modelos/juego';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.css']
})
export class ListaJuegosComponent {
  juegos?: Juego[];
  constructor(private fbs: FirebaseService) {}

  ngOnInit(): void {
    this.fbs.getFireBase('juegos').subscribe((res) => (this.juegos = res));
  }

  // Método que elimina un juego en la base de datos
  deleteJuego(juego: Juego) {
    this.fbs
      .deleteFireBase(juego, 'juegos')
      .then(() =>
        Swal.fire({
          title: 'Eliminado!',
          text: 'Juego ha sido eliminado',
          icon: 'success',
        })
      )
      .catch(() =>
        Swal.fire({
          title: 'Oops...!',
          text: 'El juego no ha sido eliminado',
          icon: 'error',
        })
      );
  }
}
