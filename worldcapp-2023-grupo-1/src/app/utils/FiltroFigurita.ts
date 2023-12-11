import { Range } from "app/components/filtro-busqueda/filtro-busqueda.component"

export abstract class FiltroFigurita<T>{
    constructor(public nombre: string, public contenido?: T) { }
    abstract condicionAplicar(): boolean
    pathParameter(): string { return `${this.nombre}=${this.contenido}` }
    aplicar(): string { return (this.condicionAplicar()) ? this.pathParameter() : "" }
}

export class FiltroBool extends FiltroFigurita<boolean>{ override condicionAplicar(): boolean { return this.contenido! } }

export class FiltroBusqueda extends FiltroFigurita<string>{ override condicionAplicar(): boolean { return this.contenido != undefined && this.contenido != "" } }

export class FiltroNumber extends FiltroFigurita<number>{ override condicionAplicar(): boolean { return this.contenido != null } }

export class FiltroFiguritasCompuesto extends FiltroFigurita<void>{
    constructor(nombre: string = "", public filtros: FiltroFigurita<unknown>[]) { super(nombre) }
    override condicionAplicar(): boolean { return true }
    override pathParameter(): string { console.log("parametros: ", this.concatenarPathParameters()); return this.concatenarPathParameters() }
    private concatenarPathParameters() {
        return this.filtros
            .map(filtro => filtro.aplicar())
            .filter(filtro => filtro != "").join('&')
    }
    getFilter(nombre: string): FiltroFigurita<unknown> { return this.filtros.find(filtro => filtro.nombre == nombre)! }
}

export class FiltroRango extends FiltroFiguritasCompuesto {
    constructor() {
        super("rango", [
            new FiltroNumber("min_valoracion"),
            new FiltroNumber("max_valoracion")
        ])
    }

    setRange(rango: Range) {
        this.getFilter("min_valoracion").contenido = rango.min
        this.getFilter("max_valoracion").contenido = rango.max
    }
}