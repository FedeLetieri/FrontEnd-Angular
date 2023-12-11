
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ProfileFormComponent } from './profile-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { StubUsuarioService} from 'app/services/usuario/usuario.service'

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent
  let fixture: ComponentFixture<ProfileFormComponent>
  let servicio: StubUsuarioService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFormComponent ],
      imports: [ReactiveFormsModule],
      providers: [StubUsuarioService]
    })
    servicio = TestBed.inject(StubUsuarioService)
    fixture = TestBed.createComponent(ProfileFormComponent)
    component = fixture.componentInstance
    component.usuarioService = servicio
    fixture.detectChanges()
  })

  const camposAVerificar = [
    'nombre',
    'apellido',
    'fechaDeNacimiento',
    'email',
    'provincia',
    'localidad',
    'calle',
    'altura',
    'posicionX',
    'posicionY',
    'distanciaDeCercania',
    'criterio'
  ]
  it('El formulario se inicializa con los valores del usuario', () => {

    for (const campo of camposAVerificar) {
      // Usa 'as' para acceder a las propiedades de usuarioLogueado
      const usuarioValue = component.usuarioService.usuarioLogueado[campo as keyof typeof component.usuarioService.usuarioLogueado]
  
      if (campo === 'fechaDeNacimiento') {
        // Convierte la fecha a cadena para la comparación
        const fechaNacimiento = new Date(usuarioValue.toString()).toISOString().slice(0, 10)
        expect(component.userForm.get(campo)!.value).toEqual(fechaNacimiento)
      } else {
        // Comprueba si el valor es una función y llama a la función en ese caso
        const fieldValue = typeof usuarioValue === 'function' ? usuarioValue(0) : usuarioValue
        expect(component.userForm.get(campo)!.value).toEqual(fieldValue)
      }
    }
  }
)

  it('Se presiona el boton de resetear y todos los campos quedan vacios', () => {
    const botonResetDatos = busquedaDeElemento(fixture, 'reset-button')
    botonResetDatos.click()
    fixture.detectChanges()

    // Verifica que todos los campos estén vacíos después de hacer clic en el botón de reset
    for (const campo of camposAVerificar) {
      expect(component.userForm.get(campo)!.value).toEqual(null)
    }
  }
)

  it('Se presiona el boton de guardar con el formulario validado y usuario cambia su informacion', () => {
    const nuevosValores = {
      nombre: 'Nombre de ejemplo',
      apellido: 'Apellido de ejemplo',
      fechaDeNacimiento: '2023-01-01',
      email: 'ejemplo@example.com',
      provincia: 'Buenos Aires',
      localidad: 'CABA',
      calle: 'Calle de ejemplo',
      altura: 42,
      posicionX: 1,
      posicionY: 2,
      distanciaDeCercania: 10,
      criterio: 'criterio1'
    }
  
    component.userForm.patchValue(nuevosValores)

    const botonGuardarDatos = busquedaDeElemento(fixture, 'save-button')
    botonGuardarDatos.click()
    fixture.detectChanges()

    // Verifica que todos los campos se hayan guardado correctamente
    for (const campo of camposAVerificar) {
      const usuarioValue = component.usuarioService.usuarioLogueado[campo as keyof typeof component.usuarioService.usuarioLogueado]

      if (campo === 'fechaDeNacimiento') {
        const fechaNacimiento = new Date(usuarioValue.toString()).toISOString().slice(0, 10)
        expect(component.userForm.get(campo)!.value).toEqual(fechaNacimiento)
      } else {
        const fieldValue = typeof usuarioValue === 'function' ? usuarioValue(0) : usuarioValue
        expect(component.userForm.get(campo)!.value).toEqual(fieldValue)
      }
    }
  }
  )

  it('Se presiona el boton de reset, luego el boton guardar y se emiten los mensajes de los inputs por no cumplir con las validaciones', () => {
    const compiled = fixture.nativeElement

    const botonResetDatos = busquedaDeElemento(fixture, 'reset-button')
    botonResetDatos.click()
    fixture.detectChanges()
    const botonGuardarDatos = busquedaDeElemento(fixture, 'save-button')
    botonGuardarDatos.click()
    fixture.detectChanges()

    // Verifica si los elementos <p> de error están visibles
    const errorMessages = compiled.querySelectorAll('.form_error')
    // Debería haber elementos <p> con las clases 'form_error' visibles
    expect(errorMessages.length).toBe(14)
  }
  )

}
)

function busquedaDeElemento(fixture: ComponentFixture<ProfileFormComponent>, datatestId: string) {
  return fixture.debugElement.nativeElement.querySelector(`[data-testid="${datatestId}"]`)
}