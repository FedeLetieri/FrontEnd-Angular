import { Component, ViewEncapsulation, ChangeDetectionStrategy, Injectable, ChangeDetectorRef } from '@angular/core'
import { Figurita } from 'domain/figurita'
import { BarraBusquedaComponent } from 'app/components/barra-busqueda/barra-busqueda.component'
import { FiguritaComponent } from 'app/components/figurita/figurita.component'
import { FiltroBusquedaComponent } from 'app/components/filtro-busqueda/filtro-busqueda.component'
import { CheckboxComponent } from 'app/components/shared/input/checkbox/checkbox.component'
import { StubFiguritaService } from 'app/services/figurita/figurita.service'
import { PaginatorComponent } from 'app/components/paginator/paginator.component'
import { PageNumberComponent } from 'app/components/shared/page-number/page-number.component'
<<<<<<< HEAD
import { BusquedaFiguritas } from 'assets/typescript/BusquedaFiguritas'
import { AlertasService } from 'app/services/alertas/alertas.service'
=======
import { BusquedaFiguritas } from 'app/utils/BusquedaFiguritas'
>>>>>>> 93c234d0e8cbc11923bc1e213734cae974e916c6

@Component({
  selector: 'app-busqueda-figuritas',
  templateUrl: './busqueda-figuritas.component.html',
  styleUrls: ['./busqueda-figuritas.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusquedaFiguritasComponent extends BusquedaFiguritas {
  override pageSize: number = 3

  override figuritaServiceCall(): Promise<Figurita[]> { return this.figuritaService.figuritasBusqueda(this.filtrosAplicados()) }

  override recibirAlerta(): void { }
}
/*
@Injectable({
  providedIn: 'root'
})
export class StubBusquedaFiguritasComponent extends BusquedaFiguritasComponent {

  constructor(service: StubFiguritaService, ref: ChangeDetectorRef, alert: AlertasService) { super(service, ref, alert) }

  filterRango() { this.figuritas = this.figuritas.filter(figurita => figurita.valorTotal >= get && figurita.valorTotal <= this.filtros.rango.contenido.max) }
  filterPromesa() { this.figuritas = this.figuritas.filter(figurita => figurita.promesa) }
  filterOnFire() { this.figuritas = this.figuritas.filter(figurita => figurita.onFire) }
}
*/
export const busquedaFiguritasTestDeclarations = [
  BarraBusquedaComponent,
  FiguritaComponent,
  FiltroBusquedaComponent,
  CheckboxComponent,
  PaginatorComponent,
  PageNumberComponent
]
