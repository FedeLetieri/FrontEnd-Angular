export class Seleccion {
    constructor(
        public pais: string,
        public confederacion: Confederacion,
        public cantidadCopasMundo: number,
        public cantidadCopasConfederacion: number
      ) {}
}

export enum Confederacion {
    AFC = "AFC",
    CAF = "CAF",
    CONCACAF = "CONCACAF",
    CONMEBOL = "CONMEBOL",
    OFC = "OFC",
    UEFA = "UEFA",
  }