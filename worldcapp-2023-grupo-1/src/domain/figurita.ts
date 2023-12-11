export type FiguritaJSON = {
    id: number,
    numero: number,
    onFire: boolean,
    nivelImpresion: string,
    jugador: {
        nroCamiseta: number,
        nombre: string,
        nacimiento: Date,
        seleccion: {
            pais: string,
            copasMundiales: number,
            confederacion: string,
            copasConf: number
        }
        posicion: string,
        estrellas: number,
        peso: number,
        altura: number,
        precio: number,
        promesa: boolean,
        agnoDebut: number,
        lider: boolean,

    }
    valorTotal: number,
    valorBase: number,
    duegno: string
}

export class Figurita {
    constructor(
        public id: number,
        public nombre: string,
        public casaca: number,
        public nacimiento: Date,
        public seleccion: string,
        public copasMundiales: number,
        public posicion: string,
        public numero: number,
        public estrellas: number,
        public peso: number,
        public altura: number,
        public precio: number,
        public promesa: boolean,
        public onFire: boolean,
        public agnoDebut: number,
        public confederacion: string,
        public copasConf: number,
        public lider: boolean,
        public nivelImpresion: string,
        public valorBase: number,
        public valorTotal: number,
        public duegno: string = ''
    ) { }

    get imgBandera() {
        return "../../assets/img/paises/" + this.seleccion + ".png"
    }

    get imgJugador() {
        return "../../assets/img/jugadores/" + this.toCamelCase(this.nombre) + ".png"
    }

    static fromJSON(figuritaJSON: FiguritaJSON): Figurita {
        return Object.assign(new Figurita(
            figuritaJSON.id,
            figuritaJSON.jugador.nombre,
            figuritaJSON.jugador.nroCamiseta,
            figuritaJSON.jugador.nacimiento,
            figuritaJSON.jugador.seleccion.pais,
            figuritaJSON.jugador.seleccion.copasMundiales,
            figuritaJSON.jugador.posicion,
            figuritaJSON.numero,
            figuritaJSON.jugador.estrellas,
            figuritaJSON.jugador.peso,
            figuritaJSON.jugador.altura,
            figuritaJSON.jugador.precio,
            figuritaJSON.jugador.promesa,
            figuritaJSON.onFire,
            figuritaJSON.jugador.agnoDebut,
            figuritaJSON.jugador.seleccion.confederacion,
            figuritaJSON.jugador.seleccion.copasConf,
            figuritaJSON.jugador.lider,
            figuritaJSON.nivelImpresion,
            figuritaJSON.valorBase,
            figuritaJSON.valorTotal,
            figuritaJSON.duegno

        ), figuritaJSON, {
        })
    }

    toCamelCase(input: string): string {
        const removeAccents = (str: string) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        }
        const words = removeAccents(input).split(/[\s_\-]+/)
        if (words.length === 0) {
            return ''
        }
        const camelCasedWords = words.map((word, index) => {
            if (index === 0) {
                return word.toLowerCase()
            } else {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            }
        })
        const camelCaseString = camelCasedWords.join('')
        return camelCaseString
    }
}