import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { REST_SERVER_URL } from 'app/configuration'
import { Figurita, FiguritaJSON } from 'domain/figurita'
import { BehaviorSubject, catchError, lastValueFrom, map, throwError } from 'rxjs'

async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

@Injectable({
  providedIn: 'root'
})
export class FiguritaService {
  figuritas!: Figurita[]
  private figuritasFaltantes$ = new BehaviorSubject<Figurita[]>([])
  private figuritasRepetidas$ = new BehaviorSubject<Figurita[]>([])

  constructor(private httpClient: HttpClient) { }

  private async obtenerFiguritasFromBack(url: string): Promise<Figurita[]> {
    const figuritas$ = this.httpClient.get<FiguritaJSON[]>(`${REST_SERVER_URL}/${url}`)
    const figuritas = await lastValueFrom(figuritas$)
    return figuritas.map((figuritaJSON: FiguritaJSON) => { return Figurita.fromJSON(figuritaJSON) })
  }

  async figuritasBusqueda(filtros?: string) { await delay(2000); return await this.obtenerFiguritasFromBack(`busqueda-figuritas/figuritas?${filtros}`) }
  async figuritasRepetidasParaAgregar(idUsuario: number, filtros?: string) { await delay(2000); return await this.obtenerFiguritasFromBack(`busqueda-figuritas-repetidas/figuritas?usuario=${idUsuario}&${filtros}`) }
  async figuritasFaltantesParaAgregar(idUsuario: number, filtros?: string) { await delay(2000); return await this.obtenerFiguritasFromBack(`busqueda-figuritas-faltantes/figuritas?usuario=${idUsuario}&${filtros}}`) }

  obtenerFiguritasFaltantesFromBack(idUsuario: number) {
    this.httpClient.get<FiguritaJSON[]>(`${REST_SERVER_URL}/figuritasFaltantes?idUsuario=${idUsuario}`).pipe(
      map((figuritasJSON: FiguritaJSON[]) => figuritasJSON.map((figuritaJSON: FiguritaJSON) => Figurita.fromJSON(figuritaJSON)))
    ).subscribe((figuritas) => {
      this.figuritasFaltantes$.next(figuritas)
    })
  }

  obtenerFiguritasRepetidasFromBack(idUsuario: number) {
    this.httpClient.get<FiguritaJSON[]>(`${REST_SERVER_URL}/figuritasRepetidas?idUsuario=${idUsuario}`).pipe(
      map((figuritasJSON: FiguritaJSON[]) => figuritasJSON.map((figuritaJSON: FiguritaJSON) => Figurita.fromJSON(figuritaJSON)))
    ).subscribe((figuritas) => {
      this.figuritasRepetidas$.next(figuritas)
    })
  }

  get figuritasFaltantesUsuario(): BehaviorSubject<Figurita[]> {
    return this.figuritasFaltantes$
  }

  get figuritasRepetidasUsuario(): BehaviorSubject<Figurita[]> {
    return this.figuritasRepetidas$
  }

  agregarFiguritaFaltante(idUsuario: number, idFiguritaAagregar: number, figurita: Figurita) {

    this.httpClient.put<Figurita>(`${REST_SERVER_URL}/figuritasFaltantes?idUsuario=${idUsuario}&idFiguritaFaltante=${idFiguritaAagregar}`, {}).pipe(
      catchError(this.handleError)) //Agarro el error si la figurita ya se encuentra en la lista de faltantes
      .subscribe(() => {
        const figuritas = this.figuritasFaltantes$.getValue() // Obtiene la lista actual
        figuritas.push(figurita) // Agrega la nueva figurita a la lista
        this.figuritasFaltantes$.next(figuritas) // Actualiza el BehaviorSubject con la lista actualizada
        console.log("Figurita agregada con éxito a faltantes")
      })
  }

  agregarFiguritaRepetida(idUsuario: number, idFiguritaAagregar: number, figurita: Figurita) {

    this.httpClient.put<Figurita>(`${REST_SERVER_URL}/figuritasRepetidas?idUsuario=${idUsuario}&idFiguritaRepetida=${idFiguritaAagregar}`, {}).pipe(
      catchError(this.handleError)) //Agarro el error si la figurita ya se encuentra en la lista de repetidas
      .subscribe(() => {
        const figuritas = this.figuritasRepetidas$.getValue() // Obtiene la lista actual
        figuritas.push(figurita) // Agrega la nueva figurita a la lista
        this.figuritasRepetidas$.next(figuritas) // Actualiza el BehaviorSubject con la lista actualizada
        console.log("Figurita agregada con éxito a repetidas")
      })
  }

  eliminarFiguritaFaltante(idUsuario: number, figurita: Figurita) {
    this.httpClient.delete(`${REST_SERVER_URL}/figuritasFaltantes?idUsuario=${idUsuario}&idFiguritaFaltante=${figurita.id}`, {}).subscribe(() => {
      // Realizar la eliminación local de la figurita en la lista
      const figuritas = this.figuritasFaltantes$.getValue()
      const index = figuritas.indexOf(figurita)

      if (index !== -1) {
        figuritas.splice(index, 1) // Elimina la figurita de la lista
        this.figuritasFaltantes$.next(figuritas) // Notifica a los suscriptores
      }
    }
    )
  }

  eliminarFiguritaRepetida(idUsuario: number, figurita: Figurita) {
    this.httpClient.delete(`${REST_SERVER_URL}/figuritasRepetidas?idUsuario=${idUsuario}&idFiguritaRepetida=${figurita.id}`, {}).subscribe(() => {
      // Realizar la eliminación local de la figurita en la lista
      const figuritas = this.figuritasRepetidas$.getValue()
      const index = figuritas.indexOf(figurita)

      if (index !== -1) {
        figuritas.splice(index, 1) // Elimina la figurita de la lista
        this.figuritasRepetidas$.next(figuritas) // Notifica a los suscriptores
      }
    }
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 400) {
      console.log("La figurita ya se encuentra en la lista")
    }
    return throwError(() => new Error('La figurita ya se encuentra en la lista'))
  }

  getById(id: number) {
    return this.httpClient.get<FiguritaJSON>(`${REST_SERVER_URL}/figurita/${id}`)
  }
}


@Injectable({
  providedIn: 'root'
})
export class StubFiguritaService extends FiguritaService {

  constructor(httpClient: HttpClient) {
    super(httpClient)
    this.figuritas = [
      new Figurita(2, 'Ángel Di María', 100, new Date('1987-06-24'), 'ARG', 3, 'Delantero', 5, 124, 72, 1.7, 80000000, false, false, 2002, "CONMEBOL", 10, true, 'ALTO', 150, 176),
      new Figurita(3, 'Emiliano Martínez', 1000, new Date('1987-06-24'), 'ARG', 3, 'Delantero', 5, 124, 72, 1.7, 80000000, true, false, 2002, "CONMEBOL", 10, true, 'ALTO', 150, 176)
    ]
  }

  override async figuritasBusqueda(): Promise<Figurita[]> {
    return [
      new Figurita(1, 'Lionel Messi', 10, new Date('1987-06-24'), 'ARG', 3, 'Delantero', 5, 124, 72, 1.7, 80000000, true, false, 2002, "CONMEBOL", 10, true, 'ALTO', 150, 176, 'Daniel González'),
      new Figurita(2, 'Ángel Di María', 11, new Date('1988-02-14'), 'ARG', 3, 'Delantero', 2, 100, 75, 1.8, 150000, false, true, 2005, "CONMEBOL", 10, false, 'MEDIO', 100, 180, 'Juan Pérez'),
      new Figurita(3, 'Emiliano Martínez', 23, new Date('1992-09-02'), 'ARG', 3, 'Arquero', 4, 132, 72, 1.95, 402112, true, false, 2012, "CONMEBOL", 10, true, 'BAJO', 120, 160, 'Roberto Álvarez')
    ]
  }

  override async figuritasRepetidasParaAgregar(): Promise<Figurita[]> {
    return [
      new Figurita(5, 'Lionel Messi', 10, new Date('1987-06-24'), 'ARG', 3, 'Delantero', 5, 124, 72, 1.7, 80000000, true, true, 2002, "CONMEBOL", 10, true, 'ALTO', 150, 176),
      new Figurita(6, 'Lionel Messi', 10, new Date('1987-06-24'), 'ARG', 3, 'Delantero', 5, 124, 72, 1.7, 80000000, false, true, 2002, "CONMEBOL", 10, true, 'ALTO', 150, 300),
      new Figurita(7, 'Lionel Messi', 10, new Date('1987-06-24'), 'ARG', 3, 'Delantero', 5, 124, 72, 1.7, 80000000, true, true, 2002, "CONMEBOL", 10, true, 'ALTO', 150, 176),
    ]
  }

  override async figuritasFaltantesParaAgregar(): Promise<Figurita[]> {
    return [new Figurita(1, 'Lionel Messi', 10, new Date('1987-06-24'), 'ARG', 3, 'Delantero', 5, 124, 72, 1.7, 80000000, true, true, 2002, "CONMEBOL", 10, true, 'ALTO', 150, 176),
    new Figurita(2, 'Ángel Di María', 100, new Date('1987-06-24'), 'ARG', 3, 'Delantero', 5, 124, 72, 1.7, 80000000, false, false, 2002, "CONMEBOL", 10, true, 'ALTO', 150, 180),
    new Figurita(3, 'Emiliano Martínez', 1000, new Date('1987-06-24'), 'ARG', 3, 'Delantero', 5, 124, 72, 1.7, 80000000, true, false, 2002, "CONMEBOL", 10, true, 'ALTO', 150, 176),
    new Figurita(4, 'Lionel Messi', 10, new Date('1987-06-24'), 'ARG', 3, 'Delantero', 5, 124, 72, 1.7, 80000000, true, true, 2002, "CONMEBOL", 10, true, 'ALTO', 150, 176)]
  }

  /*
    override figuritasRepetidasUsuario() {
      return [
        new Figurita(5, 'Lionel Messi', 10, new Date('1987-06-24'), 'ARG', 3, 'Delantero', 5, 124, 72, 1.7, 80000000, true, true, 2002, "CONMEBOL", 10, true, 'ALTO', 150, 176),
        new Figurita(6, 'Lionel Messi', 10, new Date('1987-06-24'), 'ARG', 3, 'Delantero', 5, 124, 72, 1.7, 80000000, true, true, 2002, "CONMEBOL", 10, true, 'ALTO', 150, 176),
        new Figurita(7, 'Lionel Messi', 10, new Date('1987-06-24'), 'ARG', 3, 'Delantero', 5, 124, 72, 1.7, 80000000, true, true, 2002, "CONMEBOL", 10, true, 'ALTO', 150, 176),
      ]
    }
  
       override figuritasFaltantesUsuario() {
        return [new Figurita(2, 'Ángel Di María', 100, new Date('1987-06-24'), 'ARG', 3, 'Delantero', 5, 124, 72, 1.7, 80000000, false, false, 2002, "CONMEBOL", 10, true, 'ALTO', 150, 176),
        new Figurita(3, 'Emiliano Martínez', 1000, new Date('1987-06-24'), 'ARG', 3, 'Delantero', 5, 124, 72, 1.7, 80000000, true, false, 2002, "CONMEBOL", 10, true, 'ALTO', 150, 176),]
      } */
}