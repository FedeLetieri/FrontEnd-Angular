import { JugadorDTO } from "./jugador"
import { Seleccion } from "./seleccion"
import { Direccion } from "./sobre"


export type UsuarioJSON = {
  nombre: string,
  apellido: string,
  fechaDeNacimiento: string,
  email: string,
  direccion: Direccion,
  distanciaDeCercania: number,
  tipoDeUsuario: string,
  listadoNacionalista?: Seleccion[],
  jugadorFanatico?: JugadorDTO,
  username: string,
  imagen: string,
}
export class Usuario{

    constructor(public nombre = '', 
    public apellido = '',
    public fechaDeNacimiento:Date,
    public email = '',
    public provincia = '',
    public localidad = '',
    public calle = '',
    public altura: number,
    public posicionX: number,
    public posicionY: number,
    public distanciaDeCercania: number,
    public criterio  = '',
    public listadoNacionalista: Seleccion[] | null,
    public jugadorFanatico: JugadorDTO | null,
    public imagen = '',
    public username = '',
    ){}

    esCercano(distancia:number){
        return this.distanciaDeCercania > distancia
    }

    actualizarPerfilUsuario(username: string, imagen: string) {
        this.username = username
        this.imagen = imagen
      }

    actualizarFormUsuario(username: string, imagen: string) {
    this.username = username
    this.imagen = imagen
    }

    static fromJson(usuarioJSON: UsuarioJSON): Usuario {
      const fechaDeNacimientoString = usuarioJSON.fechaDeNacimiento

      console.log("fechaDeNacimientoString = " + fechaDeNacimientoString)
    
      let fechaDeNacimiento: Date | null = null
    
      if (fechaDeNacimientoString) {
        const fechaArray = fechaDeNacimientoString.split('-')
    
        if (fechaArray.length === 3) {
          const anio = parseInt(fechaArray[0])
          const mes = parseInt(fechaArray[1]) - 1
          const dia = parseInt(fechaArray[2])
            
          if (!isNaN(anio) && !isNaN(mes) && !isNaN(dia)) {
            fechaDeNacimiento = new Date(anio, mes, dia)
          }
          console.log("fechaDeNacimiento = " + fechaDeNacimiento)
        }
      }
    
      return new Usuario(
        usuarioJSON.nombre,
        usuarioJSON.apellido,
        fechaDeNacimiento || new Date(), // Si no se pudo analizar la fecha, crea una fecha por defecto
        usuarioJSON.email,
        usuarioJSON.direccion.provincia,
        usuarioJSON.direccion.localidad,
        usuarioJSON.direccion.calle,
        usuarioJSON.direccion.numero,
        usuarioJSON.direccion.ubicacion.x,
        usuarioJSON.direccion.ubicacion.y,
        usuarioJSON.distanciaDeCercania,
        usuarioJSON.tipoDeUsuario,
        usuarioJSON.listadoNacionalista || null,
        usuarioJSON.jugadorFanatico || null,
        usuarioJSON.imagen,
        usuarioJSON.username
      )
    }
    
}

export class PerfilUsuario{
    constructor(public username: string, public imagen: string) {}

    static fromJson(perfilUsuarioJSON: PerfilUsuarioJSON): PerfilUsuario {
      return new PerfilUsuario(
        perfilUsuarioJSON.imagen,
        perfilUsuarioJSON.username
      )
    }
  }


export type PerfilUsuarioJSON = {
  username: string,
  imagen: string,
}


export type FormUsuarioJSON = {
  nombre: string,
  apellido: string,
  fechaDeNacimiento: string,
  email: string,
  direccion: Direccion,
  distanciaDeCercania: number,
  tipoDeUsuario: string,
  listadoNacionalista: Seleccion[] | null,
  jugadorFanatico: JugadorDTO | null,
}
export class FormUsuario {
  constructor(public nombre = '', 
  public apellido = '',
  public fechaDeNacimiento:Date,
  public email = '',
  public provincia = '',
  public localidad = '',
  public calle = '',
  public altura: number,
  public posicionX: number,
  public posicionY: number,
  public distanciaDeCercania: number,
  public criterio  = '',
  public listadoNacionalista?: Seleccion[] | null,
  public jugadorFanatico?: JugadorDTO | null,
  ){}

  toJson(): FormUsuarioJSON {
    return {
      nombre: this.nombre,
      apellido: this.apellido,
      fechaDeNacimiento: this.fechaDeNacimiento.toISOString().slice(0, 10),
      email: this.email,
      direccion: {
        provincia: this.provincia,
        localidad: this.localidad,
        calle: this.calle,
        numero: this.altura,
        ubicacion: {
          x: this.posicionX,
          y: this.posicionY
        }
      },
      distanciaDeCercania: this.distanciaDeCercania,
      tipoDeUsuario: this.criterio,
      listadoNacionalista: this.listadoNacionalista || null,
      jugadorFanatico: this.jugadorFanatico || null
    }
  }


static fromJson(formUsuarioJSON: FormUsuarioJSON): FormUsuario {
  const fechaDeNacimientoString = formUsuarioJSON.fechaDeNacimiento

  console.log("fechaDeNacimientoString = " + fechaDeNacimientoString)

  let fechaDeNacimiento: Date | null = null

  if (fechaDeNacimientoString) {
    const fechaArray = fechaDeNacimientoString.split('-')

    if (fechaArray.length === 3) {
      const anio = parseInt(fechaArray[0])
      const mes = parseInt(fechaArray[1]) - 1
      const dia = parseInt(fechaArray[2])
        
      if (!isNaN(anio) && !isNaN(mes) && !isNaN(dia)) {
        fechaDeNacimiento = new Date(anio, mes, dia)
      }
      console.log("fechaDeNacimiento = " + fechaDeNacimiento)
    }
  }

  return new FormUsuario(
    formUsuarioJSON.nombre,
    formUsuarioJSON.apellido,
    fechaDeNacimiento || new Date(), 
    formUsuarioJSON.email,
    formUsuarioJSON.direccion.provincia,
    formUsuarioJSON.direccion.localidad,
    formUsuarioJSON.direccion.calle,
    formUsuarioJSON.direccion.numero,
    formUsuarioJSON.direccion.ubicacion.x,
    formUsuarioJSON.direccion.ubicacion.y,
    formUsuarioJSON.distanciaDeCercania,
    formUsuarioJSON.tipoDeUsuario,
    formUsuarioJSON.listadoNacionalista,
    formUsuarioJSON.jugadorFanatico
  )
}
}