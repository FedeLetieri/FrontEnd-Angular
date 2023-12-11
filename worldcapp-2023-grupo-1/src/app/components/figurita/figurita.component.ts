import { FiguritaService } from 'app/services/figurita/figurita.service'
import { Component, ViewEncapsulation, Input } from '@angular/core'
import { Figurita } from 'domain/figurita'
import { Router } from '@angular/router'

@Component({
  selector: 'app-figurita',
  templateUrl: './figurita.component.html',
  styleUrls: ['./figurita.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FiguritaComponent {
  
  constructor(private router: Router, private figuritaService: FiguritaService) { 
    this.sessionId = JSON.parse(localStorage.getItem('session')!).id
  }

  @Input() figurita!: Figurita
  @Input() paginaOrigen!: string
  testIds: string[] = ['casacaFigurita', 'nacimientoFigurita', 'seleccionFigurita', 'posicionFigurita']
  format: string = 'es-AR'
  profileRoutes = ['/perfil/repetidas', '/perfil/repetidas']
  imgPelota = "../../assets/img/pelota.png"
  @Input() hidden!: boolean
  @Input() repetida!: boolean
  private sessionId!: number

  get mainItems() {
    return Array.from(Object.entries({
      'Casaca': this.figurita.casaca,
      'Nacimiento': this.figurita.nacimiento,
      'Selección': this.figurita.seleccion,
      'Posición': this.figurita.posicion
    }))
  }

  isSeleccion(value: string) { return value == this.mainItems[2][0] }

  isNacimiento(value: string) { return value == this.mainItems[1][0] }

  goToDetail(id: number) { this.router.navigate(['/detalle-figurita', id], { queryParams: { origen: this.paginaOrigen } }) }

  eliminarFiguritaFaltante(): void {
    this.figuritaService.eliminarFiguritaFaltante(this.sessionId, this.figurita)
  }

  eliminarFiguritaRepetida(): void {
    this.figuritaService.eliminarFiguritaRepetida(this.sessionId, this.figurita)
  }
}
export class StubFiguritaComponent extends FiguritaComponent {
  override figurita = new Figurita(1, 'Lionel Messi', 15, new Date('1987-6-24'), 'ARG', 3, 'Delantero', 5, 124, 72, 1.7, 80000000, true, true, 2002, "CONMEBOL", 15, true, 'ALTO', 150, 176, 'Daniel González')
}
