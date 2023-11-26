import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alquiler, DatosAlquiler } from 'src/app/modelos/alquiler';
import { Juego } from 'src/app/modelos/juego';
import { Usuario } from 'src/app/modelos/usuario';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-detalle-alquiler',
  templateUrl: './detalle-alquiler.component.html',
  styleUrls: ['./detalle-alquiler.component.css']
})
export class DetalleAlquilerComponent {
  alquiler: Alquiler = {usuario: {nombre:"", apellidos:"",email:""}, juego: {nombreJuego:"", urlImagen:""}, fechaInicio: "", fechaFin: ""};
  usuario?: Usuario;
  juego?: Juego;
  juegos?: Juego[];
  usuarios?: Usuario[];
  constructor(private fbs: FirebaseService, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') != null) {
      const id = this.route.snapshot.paramMap.get('id');
      this.obtieneAlquiler(id!);
    } else {
      this.obtieneJuegos();
      this.obtieneUsuarios();
    }
  }

  obtieneAlquiler(id: string) {
    this.fbs.getFireBasePorId('alquileres', id).subscribe((res) => {
      const alquilerString: DatosAlquiler = res;

      this.fbs
        .getFireBasePorId('usuarios', alquilerString.idUsuario)
        .subscribe((datosUsuario) => {
          this.usuario = datosUsuario;

          this.fbs
            .getFireBasePorId('juegos', alquilerString.idJuego)
            .subscribe((datosJuego) => {
              this.juego = datosJuego;

              this.alquiler = {
                id: alquilerString.id,
                juego: this.juego!,
                usuario: this.usuario!,
                fechaInicio: alquilerString.fechaInicio,
                fechaFin: alquilerString.fechaFin,
              };

              // Ahora obtenemos la lista de usuarios
              this.fbs.getFireBase('usuarios').subscribe((res) => {
                // Añadimos res a usuarios
                this.usuarios = res;

                // Ahora vamos a borrar de la lista usuarios el usuario que tiene el alquiler
                // if (this.alquiler != undefined) {
                //   const alquilerGuardado = this.alquiler;

                //   this.usuarios = this.usuarios.filter(function (usu) {
                //     return usu.id != alquilerGuardado.usuario.id;
                //   });
                // }
              });

              // Ahora obtenemos la lista de juegos
              this.fbs.getFireBase('juegos').subscribe((res) => {
                // Añadimos res a juegos
                this.juegos = res;

                // Ahora vamos a borrar de la lista juegos el juego que tiene el alquiler
                // if (this.alquiler != undefined) {
                //   const alquilerGuardado = this.alquiler;

                //   this.juegos = this.juegos.filter(function (jue) {
                //     return jue.id != alquilerGuardado.juego.id;
                //   });
                // }
              });
            });
        });
    });
  }

  obtieneJuegos() {
    this.fbs.getFireBase('juegos').subscribe((res) => (this.juegos = res));
  }

  obtieneUsuarios() {
    this.fbs.getFireBase('usuarios').subscribe((res) => (this.usuarios = res));
  }

  enviarDatos(){
    const datosAlquiler: DatosAlquiler = {id: this.alquiler?.id, idJuego: this.alquiler?.juego.id!, idUsuario: this.alquiler?.usuario.id!, fechaInicio: this.alquiler.fechaInicio, fechaFin: this.alquiler.fechaFin};
    if(this.route.snapshot.paramMap.get('id') != null) {
      console.log("Entra en modificarAlquiler");
      this.modificarAlquiler(datosAlquiler);
    } else {
      console.log("Entra en guardarAlquiler");
      this.guardarAlquiler(datosAlquiler);
    }
    
  }

  modificarAlquiler(datosAlquiler: DatosAlquiler){
    this.fbs.updateFireBase(datosAlquiler, "alquileres", datosAlquiler.id!)
      .then(() => console.log("Alquiler cambiado"))
      .catch(error => console.error(error));
  }

  guardarAlquiler(datosAlquiler: DatosAlquiler){
    datosAlquiler = {id: "", idJuego: datosAlquiler.idJuego, idUsuario: datosAlquiler.idUsuario, fechaInicio: datosAlquiler.fechaInicio, fechaFin: datosAlquiler.fechaFin}
    this.fbs.setFireBase(datosAlquiler, "alquileres")
      .then(() => console.log("Alquiler guardado"))
      .catch(error => console.error(error));
  }
}
