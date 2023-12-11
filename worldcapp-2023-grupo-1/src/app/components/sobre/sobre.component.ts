import { Component, Input, ViewEncapsulation } from '@angular/core'
import { Direccion, Sobre } from 'domain/sobre'
import { Ubicacion } from 'domain/sobre'
@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SobreComponent {
  title = "Sobre"
  @Input() sobre!: Sobre

  public get iconoSobre() {

    if (this.sobre.esSupermercado()) return 'fa-basket-shopping'
    if (this.sobre.esKiosko()) return 'fa-store'
    return 'fa-pen-ruler'
  }

  obtenerDireccionFormateada() {
    return this.sobre.direccion.toString()
  }

}

export class StubSobreComponent extends SobreComponent {
  ubicacion = new Ubicacion(-34.2023, -58.23023001)
  direccion = new Direccion("a", "b", "c", 1, this.ubicacion)
  override sobre = new Sobre("Supermercado Chumbo", this.ubicacion, this.direccion, 13, 200, "Supermercado", 300)

}
