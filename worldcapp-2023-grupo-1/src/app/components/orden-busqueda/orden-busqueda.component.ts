import { Component,EventEmitter,Output,ViewEncapsulation } from '@angular/core'


@Component({
  selector: 'app-orden-busqueda',
  templateUrl: './orden-busqueda.component.html',
  styleUrls: ['./orden-busqueda.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrdenBusquedaComponent {
  @Output() modificarCriterio = new EventEmitter<string>() 
  

  cambiarCriterio(criterioNuevo:string){
    this.modificarCriterio.emit(criterioNuevo)
  }

  

}
