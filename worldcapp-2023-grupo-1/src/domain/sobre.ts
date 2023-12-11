
export type SobreJSON = {
    nombre: string,
    direccion: Direccion,
    distancia: number,
    stock: number,
    precio:number,
    tipo: string,
}

export class Sobre{
    nombre: string
    ubicacion: Ubicacion
    direccion: Direccion
    distancia: number
    stock: number
    tipo: string
    precio:number

    public constructor(
        nombre: string,
        ubicacion: Ubicacion,
        direccion: Direccion,
        distancia: number,
        stock: number,
        tipo: string,
        precio:number,
        
        ){
            this.nombre = nombre
            this.ubicacion = ubicacion
            this.direccion = direccion
            this.distancia = distancia
            this.stock = stock
            this.precio = precio,
            this.tipo = tipo
    }


    esSupermercado(){
        return this.tipo == "Supermercado"}

    esKiosko(){
            return this.tipo == "Kiosco"}

    esLibreria(){
                return this.tipo == "Libreria"}
            
    
    static fromJSON(sobreJson:SobreJSON):Sobre{
        return Object.assign(new Sobre(sobreJson.nombre,sobreJson.direccion.ubicacion,sobreJson.direccion,
            sobreJson.distancia,sobreJson.stock,sobreJson.tipo,sobreJson.precio ), sobreJson, {        
          })
          
    }

}

export class Ubicacion{
    y: number
    x: number

    public constructor(latitud: number, longitud: number){
        this.y = latitud
        this.x = longitud
    }
}

export class Direccion{
    provincia:string
    localidad:string
    calle:string
    numero:number
    ubicacion:Ubicacion

    constructor(provincia:string,
        localidad:string,
        calle:string,
        numero:number,
        ubicacion:Ubicacion
    ){
        this.provincia = provincia
        this.localidad = localidad
        this.calle = calle
        this.numero = numero
        this.ubicacion = ubicacion

    }
}

