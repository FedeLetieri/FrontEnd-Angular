import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'calculateAge'
})
export class CalculateAgePipe implements PipeTransform {
  transform(fechaNacimiento?: Date | null): number | null {
    if (!fechaNacimiento) {
      return null
    }

    const fechaActual = new Date()
    const añoActual = fechaActual.getFullYear()
    const mesActual = fechaActual.getMonth()
    const diaActual = fechaActual.getDate()

    const añoNacimiento = fechaNacimiento.getFullYear()
    const mesNacimiento = fechaNacimiento.getMonth()
    const diaNacimiento = fechaNacimiento.getDate()

    let edad = añoActual - añoNacimiento

    // Comprobar si el cumpleaños ya ocurrió este año
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
      edad--
    }

    return edad
  }
}





