import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule } from '@angular/forms'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppRoutingModule } from 'app/app-routing.module'
import { BusquedaSobresComponent, busquedaSobresTestDeclarations } from './busqueda-sobres.component'
import { SobresService } from 'app/services/sobres/sobres.service'
import { StubSobresService } from 'app/services/sobres/sobres.service'


describe('BusquedaSobresComponent', () => {
  let component: BusquedaSobresComponent
  let fixture: ComponentFixture<BusquedaSobresComponent>
  let servicio: SobresService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [busquedaSobresTestDeclarations],
      imports: [AppRoutingModule, FormsModule, RouterTestingModule],
      providers: [StubSobresService]

    }).compileComponents()

    servicio = TestBed.inject(StubSobresService)
    fixture = TestBed.createComponent(BusquedaSobresComponent)
    component = fixture.componentInstance
    component.servicioSobres = servicio
    fixture.detectChanges()
  })


  it('el boton de más barato es presionado, ordena bien', () => {
    const botonMasBarato = busquedaDeBoton(fixture, 'masBarato')

    botonMasBarato.click()

    fixture.detectChanges()
    const sobres = obtenerSobres(fixture)

    //Chequeamos que la lista contenga los sobres
    expect(sobres.length).toBe(4)

    expect(sobres[0].textContent).toContain('Precio por $150')

    expect(sobres[1].textContent).toContain('Precio por $240')

    expect(sobres[2].textContent).toContain('Precio por $250')

    expect(sobres[3].textContent).toContain('Precio por $300')

  })


  it('el boton menorDistancia es presionado, ordena bien', () => {
    const botonMasBarato = busquedaDeBoton(fixture, 'masSobres')

    botonMasBarato.click()

    fixture.detectChanges()
    const sobres = obtenerSobres(fixture)

    //Chequeamos que la lista contenga los sobres
    expect(sobres.length).toBe(4)

    expect(sobres[0].textContent).toContain('Stock de Sobres: 200')

    expect(sobres[1].textContent).toContain('Stock de Sobres: 150')

    expect(sobres[2].textContent).toContain('Stock de Sobres: 100')

    expect(sobres[3].textContent).toContain('Stock de Sobres: 10')
  })


  it('el boton de más sobres es presionado, ordena bien', () => {
    const botonMasBarato = busquedaDeBoton(fixture, 'masCercano')

    botonMasBarato.click()

    fixture.detectChanges()
    const sobres = obtenerSobres(fixture)

    //Chequeamos que la lista contenga los sobres
    expect(sobres.length).toBe(4)

    expect(sobres[0].textContent).toContain('Distancia: 5')

    expect(sobres[1].textContent).toContain('Distancia: 13')

    expect(sobres[2].textContent).toContain('Distancia: 32')

    expect(sobres[3].textContent).toContain('Distancia: 100')

  })


  it('el boton de solo más cercanos es presionado, ordena bien', () => {
    /*     const botonMasBarato = fixture.debugElement.nativeElement.querySelector('[data-testid="masBarato"]')
        botonMasBarato.click()
        fixture.detectChanges()
        expect(component.criterioSeleccionado).toBe('precio') */

  })


})

function obtenerSobres(fixture: ComponentFixture<BusquedaSobresComponent>) {
  return fixture.nativeElement.querySelectorAll('app-sobre')
}

function busquedaDeBoton(fixture: ComponentFixture<BusquedaSobresComponent>, datatestId: string) {
  return fixture.debugElement.nativeElement.querySelector(`[data-testid="${datatestId}"]`)
}

