import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FormUsuario, FormUsuarioJSON, PerfilUsuario, Usuario, UsuarioJSON } from 'domain/usuario'
import { REST_SERVER_URL } from 'app/configuration'
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs'
import { JugadorDTO } from 'domain/jugador'
import { Seleccion } from 'domain/seleccion'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //Para inicializar sin romper y luego ir guardando las actualizaciones recibidas
  private usuarioLogueado: Usuario = new Usuario("", "", new Date("1990-01-15"), "", "", "", "", 0, 0, 0, 0, "", null, null ,"", "")

  //Observable para manetener todos los componentes que utilizen la misma info de usuario actualizados de manera sincronizada
  private sharingObservablePrivate: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(this.usuarioLogueado)
  
  get sharingObservable(): Observable<Usuario> {
    return this.sharingObservablePrivate.asObservable()
  }
  
  set sharingObservable(data: Usuario) {
    this.sharingObservablePrivate.next(data)
  }
  
  constructor(private httpClient: HttpClient) {}

  //Funciones para obtener los datos que se necesitan para que el formulario sea funcional (Datos provenientes del backend) 
  async getAllProvincias():Promise<string[]>{
    try {
      const response = this.httpClient.get<string[]>(`${REST_SERVER_URL}/provincias`)
      const lastResponse = await lastValueFrom(response)
      return lastResponse
    } catch (error) {
      throw error
    }
  }

  async getLocalidades(provincia: string):Promise<string[]>{
    try {
      const response = this.httpClient.get<string[]>(`${REST_SERVER_URL}/localidades?provincia=${provincia}`)
      const lastResponse = await lastValueFrom(response)
      return lastResponse
    } catch (error) {
      throw error
    }
  }

  async getAllJugadores():Promise<JugadorDTO[]>{
    try {
      const response = this.httpClient.get<JugadorDTO[]>(`${REST_SERVER_URL}/jugadores`)
      const lastResponse = await lastValueFrom(response)
      return lastResponse
    } catch (error) {
      throw error
    }
  }


  async getAllSelecciones():Promise<Seleccion[]>{
    try {
      const response = this.httpClient.get<Seleccion[]>(`${REST_SERVER_URL}/selecciones`)
      const lastResponse = await lastValueFrom(response)
      return lastResponse
    } catch (error) {
      throw error
    }
  }


  //Funciones para obtener los datos del Usuario del backend
  async getInfoUsuario(idUsuario: number):Promise<void>{
    try {
      const response = this.httpClient.get<UsuarioJSON>(`${REST_SERVER_URL}/infoUsuario?id=${idUsuario}`)
      const responseJSON = await lastValueFrom(response)
      const infoUsuario = Usuario.fromJson(responseJSON)
      this.usuarioLogueado = infoUsuario
      this.sharingObservable = infoUsuario
    } catch (error) {
      throw error
    }
  }
  
  //Funciones para cambiar los datos del Usuario del backend
  async putPerfilUsuario(idUsuario: number, perfilUsuario: PerfilUsuario): Promise<void> {
    try {
      const response = this.httpClient.put<PerfilUsuario>(`${REST_SERVER_URL}/perfilUsuario?id=${idUsuario}`, perfilUsuario)
      const responseJSON = await lastValueFrom(response)
      
      // Extrae los valores de username e imagen de la respuesta
      const { username, imagen } = responseJSON

      // Actualiza el usuarioLogueado con los nuevos valores
      this.usuarioLogueado.username = username
      this.usuarioLogueado.imagen = imagen

      // Actualiza el observable para reflejar los cambios
      this.sharingObservable = this.usuarioLogueado
  
    } catch (error) {
      throw error
    }
  }

  async putFormUsuario(idUsuario: number, formUsuario: FormUsuarioJSON): Promise<void> {
    try {
      const response = this.httpClient.put<FormUsuarioJSON>(`${REST_SERVER_URL}/perfilInfoGeneralUsuario?id=${idUsuario}`, formUsuario)
      const responseJSON = await lastValueFrom(response)
      
      // Extrae los valores de username e imagen de la respuesta
      const infoUsuario = FormUsuario.fromJson(responseJSON)
      const listadoNacionalista = infoUsuario.listadoNacionalista && infoUsuario.listadoNacionalista.length > 0
        ? infoUsuario.listadoNacionalista
        : null
      const jugadorFanatico = infoUsuario.jugadorFanatico
      ? infoUsuario.jugadorFanatico
      : null
      // Crea un nuevo objeto Usuario con los valores actualizados
      const usuarioActualizado = new Usuario(
        infoUsuario.nombre,
        infoUsuario.apellido,
        infoUsuario.fechaDeNacimiento,
        infoUsuario.email,
        infoUsuario.provincia,
        infoUsuario.localidad,
        infoUsuario.calle,
        infoUsuario.altura,
        infoUsuario.posicionX,
        infoUsuario.posicionY,
        infoUsuario.distanciaDeCercania,
        infoUsuario.criterio,
        listadoNacionalista,
        jugadorFanatico,
        this.usuarioLogueado.imagen,
        this.usuarioLogueado.username 
      )

      this.usuarioLogueado = usuarioActualizado

      // Actualiza el sharingObservable con el nuevo objeto de usuario
      this.sharingObservable = this.usuarioLogueado

    } catch (error) {
      throw error
    }
  }


}

/*
@Injectable()
export class StubUsuarioService extends UsuarioService {
  constructor() {
    super()
    this.usuarioLogueado = new Usuario(
      "Bil",
      "B",
      new Date("1990-01-01"),
      "ho@a",
      "Buenos Aires",
      "CABA",
      "a",
      1,
      2,
      3,
      1,
      "criterio1",
      "assets/img/bilardo.jpeg",
      "Bil"
    )
  }
}
*/