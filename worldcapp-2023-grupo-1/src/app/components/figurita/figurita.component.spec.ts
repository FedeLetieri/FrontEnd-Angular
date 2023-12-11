import { StubFiguritaComponent } from 'app/components/figurita/figurita.component'
import { ComponentFixture, TestBed } from '@angular/core/testing'

describe('FiguritaComponent', () => {
  let component: StubFiguritaComponent
  let fixture: ComponentFixture<StubFiguritaComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [StubFiguritaComponent]
    })
    fixture = TestBed.createComponent(StubFiguritaComponent)
    component = fixture.debugElement.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render field <numero> correctly', () => {
    const numero = searchElement('numeroFigurita').textContent.trim()
    const numeroComponent = component.figurita.numero

    expect(numero).toBe(numeroComponent.toString())
  })

  it('should render field <estrellas> correctly', () => {
    const estrellas = searchElement('estrellasFigurita').textContent.trim()
    const estrellasComponent = component.figurita.estrellas

    expect(estrellas).toBe(estrellasComponent.toString())
  })

  it('should render field <peso> correctly', () => {
    const peso = searchElement('pesoFigurita').textContent.trim()
    const pesoParagraph = searchElement('pesoFiguritaP').textContent.trim()
    const pesoComponent = component.figurita.peso

    expect(peso).toBe(pesoComponent.toString() + 'KG')
    expect(pesoParagraph).toBe(pesoComponent.toString() + ' kilos')
  })

  it('should render field <altura> correctly', () => {
    const altura = searchElement('alturaFigurita').textContent.trim()
    const alturaComponent = component.figurita.altura

    expect(altura).toBe(alturaComponent.toString() + ' metros')
  })

  it('should render field <peso> correctly', () => {
    const peso = searchElement('pesoFigurita').textContent.trim()
    const pesoComponent = component.figurita.peso

    expect(peso).toBe(pesoComponent.toString() + 'KG')
  })

  it('should render field <nombre> correctly', () => {
    const nombre = searchElement('nombreFigurita').textContent.trim()
    const nombreComponent = component.figurita.nombre

    expect(nombre).toBe(nombreComponent)
  })

  it('should render field <duegno> correctly', () => {
    const duegno = searchElement('duegnoFigurita').textContent.trim()
    const duegnoComponent = component.figurita.duegno

    expect(duegno).toBe('Cedida por ' + duegnoComponent)
  })

  it('should render field <casaca> correctly', () => {
    const casaca = searchElement('casacaFigurita').textContent.trim()
    const casacaComponent = component.figurita.casaca

    expect(casaca).toBe(casacaComponent.toString())
  })

  it('should render field <nacimiento> correctly', () => {
    const nacimiento = searchElement('nacimientoFigurita').textContent.trim()
    const nacimientoComponent = '24/6/1987'

    expect(nacimiento).toBe(nacimientoComponent)
  })

  it('should render field <seleccion> correctly', () => {
    const seleccion = searchElement('seleccionFigurita').textContent.trim()
    const seleccionComponent = component.figurita.seleccion

    expect(seleccion).toBe(seleccionComponent)
  })

  it('should render field <posicion> correctly', () => {
    const posicion = searchElement('posicionFigurita').textContent.trim()
    const posicionComponent = component.figurita.posicion

    expect(posicion).toBe(posicionComponent)
  })

  function searchElement(testId: string) {
    const compiled = fixture.debugElement.nativeElement
    return compiled.querySelector(`[data-testid="${testId}"]`)
  }
})
