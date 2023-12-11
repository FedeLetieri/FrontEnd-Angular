import {ComponentFixture, TestBed} from '@angular/core/testing'
import {AsideProfileComponent } from './aside-profile.component'
import { ReactiveFormsModule } from '@angular/forms'
import { StubUsuarioService} from 'app/services/usuario/usuario.service'
import { CalculateAgePipe } from 'app/pipes/calculate-age/calculate-age.pipe'

describe('AsideProfileComponent', () => {
  let component: AsideProfileComponent
  let fixture: ComponentFixture<AsideProfileComponent>
  let servicio: StubUsuarioService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsideProfileComponent, CalculateAgePipe],
      imports: [ReactiveFormsModule],
      providers: [StubUsuarioService]
    }).compileComponents()

    servicio = TestBed.inject(StubUsuarioService)
    fixture = TestBed.createComponent(AsideProfileComponent)
    component = fixture.componentInstance
    component.usuarioService = servicio
    fixture.detectChanges()
  })

  function comenzarEditar(){
    const botonEditDatos = busquedaDeElemento(fixture, 'icon-edit')
    botonEditDatos.click()
    fixture.detectChanges()
  }

   it('el boton para editar los datos es presionado', () => {
    comenzarEditar()

    // Accede al componente y verifica el valor de modify
    const modify = component.isUserModifyingInformation()

    expect(modify).toBe(true)
  }) 

  it('Al escribir en el input no se encuentran mensajes de error', () => {
    comenzarEditar()
    const compiled = fixture.nativeElement

    //Se obtiene el valor del campo 'username' del formulario
    const usernameControl = fixture.componentInstance.asideForm.get('username')!

    // Se establece un valor en el campo 'username'
    usernameControl.setValue('Ejemplo')
    fixture.detectChanges()
    expect(usernameControl.value).toBe('Ejemplo')
    // Verifica si los elementos <p> de error están visibles
    const noErrorMessages = compiled.querySelectorAll('.form_error')
    // Debería haber elementos <p> con las clases 'form_error' visibles
    expect(noErrorMessages.length).toBe(0)
  
  }) 

  it('Al dejar el input vacio emitira un mensaje de error', () => {
    comenzarEditar()
    const compiled = fixture.nativeElement

    //Se obtiene el valor del campo 'username' del formulario
    const usernameControl = fixture.componentInstance.asideForm.get('username')!

    // Se establece el campo 'username' en blanco
    usernameControl.setValue('')
    expect(usernameControl.value).toBe('')
    fixture.detectChanges()
    // Verifica si los elementos <p> de error están visibles
    const errorMessages = compiled.querySelectorAll('.form_error')
    // Debería haber elementos <p> con las clases 'form_error' visibles
    expect(errorMessages.length).toBe(1)
    
  }) 

  it('Al superar el maximo de palabras el input emitira un mensaje de error', () => {
    comenzarEditar()
    const compiled = fixture.nativeElement

    const usernameControl = fixture.componentInstance.asideForm.get('username')!

    // Se establece el campo 'username' para que su lenght supere el maximo de palabras
    usernameControl.setValue('bilarditooooh')
    expect(usernameControl.value).toBe('bilarditooooh')
    fixture.detectChanges()
    // Verifica si los elementos <p> de error están visibles
    const errorMessages = compiled.querySelectorAll('.form_error')
    // Debería haber elementos <p> con las clases 'form_error' visibles
    expect(errorMessages.length).toBe(1)
    
  }) 

  it('Al modificar el formulario y clickear cancelar, los datos ingresados no se guardan', () => {
    comenzarEditar()

    const botonCancelarFormulario = busquedaDeElemento(fixture, 'cancel-button')

    // Se almacenan los datos actuales del usuario
    const usuarioAntes = { ...component.usuarioService.usuarioLogueado }

    //Se obtiene el valor del campo 'username' del formulario
    const usernameControl = fixture.componentInstance.asideForm.get('username')!
    const imageControl = fixture.componentInstance.asideForm.get('image')!
    

    // Se establece el campo 'username'
    usernameControl.setValue('bilarditooooh')
    expect(usernameControl.value).toBe('bilarditooooh')
    
    // Se establece el campo 'image'
    imageControl.setValue('assets/img/pelota.jpeg')
    expect(imageControl.value).toBe('assets/img/pelota.jpeg')

    botonCancelarFormulario.click()
    fixture.detectChanges()

    // Se verifica si los datos del servicio han cambiado
    expect(component.usuarioService.usuarioLogueado.username).toEqual(usuarioAntes.username)
    expect(component.usuarioService.usuarioLogueado.imagen).toEqual(usuarioAntes.imagen)
        
  })

  it('Al modificar el formulario y clickear guardar, los datos ingresados se guardan', () => {
    comenzarEditar()

    const botonGuardarFormulario = busquedaDeElemento(fixture, 'save-button')

    //Se obtiene el valor del campo 'username' del formulario
    const usernameControl = fixture.componentInstance.asideForm.get('username')!
    const imageControl = fixture.componentInstance.asideForm.get('image')!
    
    // Se establece el campo 'username'
    usernameControl.setValue('bilardo')
    expect(usernameControl.value).toBe('bilardo')
    
    // Se establece el campo 'image'
    imageControl.setValue('assets/img/pelota.jpeg')
    fixture.componentInstance.imageUrl = 'assets/img/pelota.jpeg'
    expect(imageControl.value).toBe('assets/img/pelota.jpeg')

    fixture.detectChanges()
    botonGuardarFormulario.click()
    fixture.detectChanges()

    // Se verifica si los datos del servicio han cambiado
    expect(component.usuarioService.usuarioLogueado.username).toEqual('bilardo')
    expect(component.usuarioService.usuarioLogueado.imagen).toEqual('assets/img/pelota.jpeg')
        
  })

  it('Al no cumplir con las validaciones el formulario no se guarda', () => {
    comenzarEditar()

    const botonGuardarFormulario = busquedaDeElemento(fixture, 'save-button')

    //Se obtiene el valor del campo 'username' del formulario
    const usernameControl = fixture.componentInstance.asideForm.get('username')!
    const imageControl = fixture.componentInstance.asideForm.get('image')!

    // Se establece el campo 'username' como vacio, lo cual hara que el formulario sea invalido
    usernameControl.setValue('')
    expect(usernameControl.value).toBe('')
    
    // Se establece el campo 'image'
    imageControl.setValue('assets/img/pelota.jpeg')
    fixture.componentInstance.imageUrl = 'assets/img/pelota.jpeg'
    expect(imageControl.value).toBe('assets/img/pelota.jpeg')

    fixture.detectChanges()
    botonGuardarFormulario.click()
    fixture.detectChanges()

    // Se verifica si los datos del servicio no han cambiado
    expect(component.usuarioService.usuarioLogueado.username).toEqual('Bil')
    expect(component.usuarioService.usuarioLogueado.imagen).toEqual('assets/img/bilardo.jpeg')
        
  })
  
})

function busquedaDeElemento(fixture: ComponentFixture<AsideProfileComponent>, datatestId: string) {
  return fixture.debugElement.nativeElement.querySelector(`[data-testid="${datatestId}"]`)
}