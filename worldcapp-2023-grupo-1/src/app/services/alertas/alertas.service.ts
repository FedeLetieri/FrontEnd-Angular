import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  alerta$ = new Subject<string>

  constructor() { }


  mostrarFiguritaFaltanteAgregada(mensaje: string): void {
    this.alerta$.next(mensaje)
  }

}
