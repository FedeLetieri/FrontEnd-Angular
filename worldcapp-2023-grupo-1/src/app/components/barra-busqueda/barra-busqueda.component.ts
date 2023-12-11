import { Component, ViewEncapsulation, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BarraBusquedaComponent {
  busqueda!: string
  @Output() busquedaEmitter: EventEmitter<string> = new EventEmitter<string>

  emitBusqueda(): void { this.busquedaEmitter.emit(this.busqueda) }
}

export class StubBarraBusquedaComponent extends BarraBusquedaComponent {
  emitExecuted: boolean = false
  override emitBusqueda() { this.emitExecuted = true }
}
