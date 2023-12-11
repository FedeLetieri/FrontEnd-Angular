import { UsuarioService } from 'app/services/usuario/usuario.service'
import { Sobre } from 'domain/sobre'
import { Usuario } from './../../../domain/usuario'
import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { SobresService } from 'app/services/sobres/sobres.service'
import { Paginable, PaginatorComponent } from 'app/components/paginator/paginator.component'
import { PageNumberComponent } from 'app/components/shared/page-number/page-number.component'
import { SobreComponent } from 'app/components/sobre/sobre.component'
import { BarraBusquedaComponent } from 'app/components/barra-busqueda/barra-busqueda.component'
import { OrdenBusquedaComponent } from 'app/components/orden-busqueda/orden-busqueda.component'
import { CheckboxComponent } from 'app/components/shared/input/checkbox/checkbox.component'
import { Observable } from 'rxjs'



@Component({
  selector: 'app-busqueda-sobres',
  templateUrl: './busqueda-sobres.component.html',
  styleUrls: ['./busqueda-sobres.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BusquedaSobresComponent extends Paginable<Sobre> implements OnInit {
  override pageSize: number = 3
  tipoOrdenamiento = 'cercanos'
  criterio: string = ''
  sobres!: Sobre[]
  usuario$!: Observable<Usuario>
  sessionId!: number

  constructor(public servicioSobres: SobresService, public usuarioService: UsuarioService) { super() }

  ngOnInit(): void {
    this.sessionId = JSON.parse(localStorage.getItem('session')!).id
    this.obtenerSobresFromService()
    this.obtenerInformacionUsuarioFromService(this.sessionId)
  }

  override items(): Sobre[] { return this.sobres }

  async obtenerSobresFromService() {
    this.sobres = await this.servicioSobres.obtenerSobres(this.tipoOrdenamiento, this.sessionId, this.criterio)

  }

  obtenerInformacionUsuarioFromService(id: number) {
    this.usuarioService.getInfoUsuario(id)
  }

  sobresExist(): boolean { return this.sobres != undefined }
  //override items() { return this.sobres }
}



/* 
export class StubBusquedaSobres extends BusquedaSobresComponent {
  ubicacion = new Ubicacion(-34.2023, -58.23023001)
  direccion = new Direccion("a","b","c",1,this.ubicacion)

  override sobres: Sobre[] = [
    new Sobre("Supermercado Chumbo", this.ubicacion, this.direccion, 13, 200, "Supermercado", 300),
    new Sobre("Libreria Jorge", this.ubicacion, this.direccion, 32, 100, "Libreria", 150),
    new Sobre("Libreria Daniel", this.ubicacion,this.direccion, 5, 10, "Libreria", 240),
    new Sobre("Kiosko Lo Pibe!", this.ubicacion, this.direccion, 100, 150, "Kiosco", 250),
  ]

}
 */
export const busquedaSobresTestDeclarations = [
  BusquedaSobresComponent,
  BarraBusquedaComponent,
  CheckboxComponent,
  PaginatorComponent,
  PageNumberComponent,
  SobreComponent,
  OrdenBusquedaComponent,
]
