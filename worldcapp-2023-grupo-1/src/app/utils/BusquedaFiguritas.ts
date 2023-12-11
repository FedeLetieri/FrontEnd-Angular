import { OnInit, Injectable, ChangeDetectorRef } from "@angular/core"
import { Paginable } from "app/components/paginator/paginator.component"
import { Figurita } from "domain/figurita"
import { FiguritaService } from "app/services/figurita/figurita.service"
<<<<<<< HEAD
import { FiltroFigurita, FiltroBusqueda, FiltroBool, FiltroFiguritasCompuesto, FiltroRango } from "./FiltroFigurita"
import { AlertasService } from "app/services/alertas/alertas.service"
=======
<<<<<<<< HEAD:src/app/utils/BusquedaFiguritas.ts
import { FiltroFigurita, FiltroBusqueda, FiltroBool, FiltroFiguritasCompuesto, FiltroRango } from "./FiltroFigurita"
========
import { Range } from "app/components/filtro-busqueda/filtro-busqueda.component"
import { FiltroBusqueda, FiltroRango, FiltroBool, FiltroFigurita } from "./FiltroFigurita"
import { AlertasService } from "app/services/alertas/alertas.service"
>>>>>>>> 93c234d0e8cbc11923bc1e213734cae974e916c6:src/assets/typescript/BusquedaFiguritas.ts
>>>>>>> 93c234d0e8cbc11923bc1e213734cae974e916c6

@Injectable({
    providedIn: 'root'
})
export abstract class BusquedaFiguritas extends Paginable<Figurita> implements OnInit {
    currUserID!: number
    figuritas!: Figurita[]
    loadingState: boolean = true

    filtro: FiltroFiguritasCompuesto = new FiltroFiguritasCompuesto("", [
        new FiltroBool("promesa", false),
        new FiltroBool("onFire", false),
        new FiltroBusqueda("search"),
        new FiltroRango()
    ])

    constructor(protected figuritaService: FiguritaService, protected ref: ChangeDetectorRef, protected alertaService: AlertasService) {
        super()
        this.currUserID = JSON.parse(localStorage.getItem('session')!).id

        this.recibirAlerta()
<<<<<<< HEAD
=======

>>>>>>> 93c234d0e8cbc11923bc1e213734cae974e916c6
    }

    async ngOnInit(): Promise<void> { this.figuritas = await this.figuritaServiceCall(); this.ref.detectChanges() }
    override items() { return this.figuritas }
    figuritasExist(): boolean { return this.figuritas == undefined ? false : this.figuritas.length > 0 }
    agregarFiguritaFaltante(idFiguritaFaltante: number, figuritaAAgregar: Figurita) { this.figuritaService.agregarFiguritaFaltante(this.currUserID, idFiguritaFaltante, figuritaAAgregar) }

    async filterFiguritas() {
        this.figuritas = []
        this.updateLoadingState(true)
        this.figuritas = await this.figuritaServiceCall()
        this.updateLoadingState(false)
        this.ref.detectChanges()
    }

<<<<<<< HEAD
    filtrosAplicados(): string { return this.filtro.aplicar() }

    abstract figuritaServiceCall(): Promise<Figurita[]>
    abstract recibirAlerta(): void

=======
<<<<<<<< HEAD:src/app/utils/BusquedaFiguritas.ts
    filtrosAplicados(): string { return this.filtro.aplicar() }

    abstract figuritaServiceCall(): Promise<Figurita[]>
>>>>>>> 93c234d0e8cbc11923bc1e213734cae974e916c6
    updateLoadingState(value: boolean) { this.loadingState = value }

    getFilter(nombre: string): FiltroFigurita<unknown> { return this.filtro.getFilter(nombre) }
    getFiltroRango(): FiltroRango { return this.filtro.getFilter("rango") as FiltroRango }
<<<<<<< HEAD
}
=======
}
========
    filtrosAplicados(): FiltroFigurita<unknown>[] { return Object.values(this.filtros).filter(filtro => filtro.condicionAplicar()) }
    abstract recibirAlerta(): void
    abstract figuritaServiceCall(): Promise<Figurita[]>
    updateLoadingState(value: boolean) { this.loadingState = value }
}

>>>>>>>> 93c234d0e8cbc11923bc1e213734cae974e916c6:src/assets/typescript/BusquedaFiguritas.ts
>>>>>>> 93c234d0e8cbc11923bc1e213734cae974e916c6
