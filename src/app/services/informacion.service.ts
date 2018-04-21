import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class InformacionService {
   info:any = {};
   equipo:any []=[];

   cargada:boolean=false;
   cargada_sobre_nosotros:boolean=false;

  constructor(public http:Http) {

    this.carga_sobre_nosotros();
    this.carga_info();

   }

  public carga_info(){
     this.http.get("assets/data/info.pagina.json")
     .subscribe( data =>{
       this.cargada=true;
       this.info = data.json();

     });
  }

  public carga_sobre_nosotros(){

  this.http.get("https://paginaweb-dbbc4.firebaseio.com/equipo.json")
  .subscribe( data =>{
    this.cargada_sobre_nosotros=true;
    this.equipo = data.json();

  });
}

}
