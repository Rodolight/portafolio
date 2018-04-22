import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class ProductosService {
  productos: any[] = [];
  cargando_prod: boolean = true;

  constructor(private http:Http) {
    this.cargar_productos();

   }

  public cargar_productos(){

    if( this.productos.length == 0){
      this.cargando_prod = true;

      this.http.get('https://paginaweb-dbbc4.firebaseio.com/productos_idx.json')
      .subscribe( res => {
        /*console.log(res.json());*/

      /*  setTimeout(()=>{*/
          this.cargando_prod = false;
          this.productos = res.json();
        /*},1500)*/
      });
    }

  }
}
