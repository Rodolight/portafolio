import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class ProductosService {
  productos: any[] = [];
  productos_filtrados:any[] = [];
  cargando_prod: boolean = true;

  constructor(private http:Http) {
    this.cargar_productos();

   }
   public buscar_producto( termino:string ){
     // console.log("Buscando productos");
     // console.log(this.productos.length);

      if( this.productos.length === 0 ){
        this.cargar_productos().then( ()=>{
          // termino la cargando_prod
          this.filtrar_productos(termino);
        });
      }else{
        this.filtrar_productos(termino);
      }
  }

  private filtrar_productos(termino:string){

    this.productos_filtrados = [];
    termino = termino.toLowerCase();

    this.productos.forEach( prod =>{

      if( prod.categoria.indexOf( termino ) >= 0 ||
          prod.titulo.toLowerCase().indexOf( termino) >=0 ){

        this.productos_filtrados.push( prod );
      }
    });
  }

  public cargar_productos(){

      this.cargando_prod = true;

      let promesa = new Promise ( ( resolve, reject) =>{

        this.http.get('https://paginaweb-dbbc4.firebaseio.com/productos_idx.json')
        .subscribe( res => {
          /*console.log(res.json());*/

        /*  setTimeout(()=>{*/
            this.cargando_prod = false;
            this.productos = res.json();
            resolve();
            //console.log(this.productos);
          /*},1500)*/
        });

      });

      return promesa;
    }

  public cargar_producto(cod: string){
    return this.http.get(`https://paginaweb-dbbc4.firebaseio.com/productos/${cod}.json`)
  }
}
