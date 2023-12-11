import { Component, ViewEncapsulation, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-filtro-busqueda',
  templateUrl: './filtro-busqueda.component.html',
  styleUrls: ['./filtro-busqueda.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FiltroBusquedaComponent {
  rango: Range = new Range()
  @Output() rangeEmitter: EventEmitter<Range> = new EventEmitter<Range>()
  @Output() promiseCheckedEmitter: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() onFireCheckedEmitter: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() filterUpdateEvent: EventEmitter<boolean> = new EventEmitter<boolean>()

  labels: string[] = ['On Fire', 'Promesa']
  names: string[] = ['OnFire', 'Promise']
  checkbox_classes: string[] = ['onfire', 'promise']
  invalidCombination: string = ''

  private emitIsPromise(value: boolean) { return this.promiseCheckedEmitter.emit(value) }
  private emitIsOnFire(value: boolean) { return this.onFireCheckedEmitter.emit(value) }

  emitRange() { if (!this.rangeIsValid()) { this.exchangeRangeValues() }; this.rangeEmitter.emit(this.rango); this.emitUpdate() }

  identifyAndEmit(key: string, value: boolean) {
    if (key == this.names[0]) { this.emitIsOnFire(value) }
    else if (key == this.names[1]) { this.emitIsPromise(value) }
    this.emitUpdate()
  }

  emitUpdate() { this.filterUpdateEvent.emit(true) }

  private rangeIsValid(): boolean { return this.isNull(this.rango.min) || this.maxIsValid() }
  private maxIsValid(): boolean { return this.rango.max >= this.rango.min || this.isNull(this.rango.max) }
  private isNull(value: unknown): boolean { return value == null }

  private exchangeRangeValues() {
    const minValue = this.rango.min
    this.rango.min = this.rango.max
    this.rango.max = minValue
  }
}

export class Range {
  min!: number
  max!: number
  contains(value: number): boolean { return this.isMin(value) && this.isMax(value) }
  isMin(value: number): boolean { return value >= this.min || this.isNull(this.min) }
  isMax(value: number): boolean { return value <= this.max || this.isNull(this.max) }
  isNull(value: unknown): boolean { return value == null }
}
