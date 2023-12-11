import { lastValueFrom } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Sobre, SobreJSON } from 'domain/sobre'
import { REST_SERVER_URL } from 'app/configuration'

@Injectable({
  providedIn: 'root'
})
export class SobresService {

  constructor(private httpClient: HttpClient) { }



  async obtenerSobres(tipoOrdenamiento: string, idUsuario: number, criterioBusqueda: string,): Promise<Sobre[]> {
    const sobresFromUrl = this.httpClient.get<SobreJSON[]>(`${REST_SERVER_URL}/ordenarSobres?tipoOrdenamiento=${tipoOrdenamiento}&idUsuario=${idUsuario}&criterioBusqueda=${criterioBusqueda}`)
    const sobres = await lastValueFrom(sobresFromUrl)
    return sobres.map((sobreJson: SobreJSON) => Sobre.fromJSON(sobreJson))

  }

}
/* 
export class StubSobresService extends SobresService {

  override obtenerSobres(): Sobre[] {
    return [
      new Sobre("Supermercado Chumbo", this.ubicacion, "Avenida Siempre Viva, 5555, Springfield", 13, 200, Tipo.SUPERMERCADO, 300),
      new Sobre("Libreria Jorge", this.ubicacion, "Avenida Siempre Viva, 5555, Springfield", 32, 100, Tipo.LIBRERIA, 150),
      new Sobre("Libreria Daniel", this.ubicacion, "Avenida Siempre Viva, 5555, Springfield", 5, 10, Tipo.LIBRERIA, 240),
      new Sobre("Kiosko Lo Pibe!", this.ubicacion, "Avenida Siempre Viva, 5555, Springfield", 100, 150, Tipo.KIOSCO, 250),
    ]

  }

} */