import { Component, ViewEncapsulation } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FiguritaService } from 'app/services/figurita/figurita.service'
import { Figurita, FiguritaJSON } from 'domain/figurita'
import { Location } from '@angular/common'
import { AlertasService } from 'app/services/alertas/alertas.service'


@Component({
  selector: 'app-detalle-figurita',
  templateUrl: './detalle-figurita.component.html',
  styleUrls: ['./detalle-figurita.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetalleFiguritaComponent {
  format: string = 'es-AR'
  figurita!: Figurita
  imgPelota = "../../assets/img/pelota.png"
  origen!: string
  id!: number
  private sessionId!: number

  constructor(
    private route: ActivatedRoute,
    private figuritaService: FiguritaService,
    private location: Location,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    this.sessionId = JSON.parse(localStorage.getItem('session')!).id

    this.route.params.subscribe(params => {
      this.id = parseInt(params['id'])
      this.origen = this.route.snapshot.queryParamMap.get('origen') as string

      this.figuritaService.getById(this.id).subscribe((figuritaJSON: FiguritaJSON) => {
        console.log(figuritaJSON)

        this.figurita = Figurita.fromJSON(figuritaJSON)

      })
    })
  }

  get mainItems() {
    return [
      { label: 'Nacimiento', value: this.formattedNacimiento() },
      { label: 'Posición', value: this.figurita.posicion },
      { label: 'Peso', value: this.figurita.peso },
      { label: 'Altura', value: this.figurita.altura },
      { label: 'Casaca', value: this.figurita.casaca },
      { label: 'Selección', value: this.figurita.seleccion },
      { label: 'Año debut', value: this.figurita.agnoDebut },
      { label: 'Confederación', value: this.figurita.confederacion },
    ]
  }

  get footerItems() {
    return [
      { label: 'Nivel impresión', value: this.figurita.nivelImpresion },
      { label: 'Valoración base', value: this.figurita.valorBase },
      { label: 'Valoración total', value: this.figurita.valorTotal },
    ]
  }

  formattedNacimiento() {
    return this.figurita.nacimiento.toLocaleString(this.format, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  isSeleccion(value: string) { return value == "Selección" }

  isConf(value: string) { return value == "Confederación" }

  unidades: { [key: string]: string } = {
    Peso: "kg",
    Altura: "metros"
  }

  unidad(value: string) { return this.unidades[value] }

  tieneUnidad(value: string) { return value == "Peso" || value == "Altura" }

  volverAtras(): void {
    this.location.back()
  }

  vieneDeFaltantes(): boolean { return this.origen == 'faltantes' }

  vieneDeRepetidas(): boolean { return this.origen == 'repetidas' }

  agregarFigurita() {
    if (this.vieneDeFaltantes())
      try {
        this.figuritaService.agregarFiguritaFaltante(this.sessionId, this.id, this.figurita)
        this.alertasService.mostrarFiguritaFaltanteAgregada("Figurita Agregada correctamente")
      }
      catch (error) {
        console.log(error)
      }

    if (this.vieneDeRepetidas())
      this.figuritaService.agregarFiguritaRepetida(this.sessionId, this.id, this.figurita)
    this.volverAtras()
  }

  loading(): boolean {
    return this.figurita == undefined
  }
}