import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { StubBarraBusquedaComponent } from './barra-busqueda.component'

describe('BarraBusquedaComponent', () => {
  let component: StubBarraBusquedaComponent
  let fixture: ComponentFixture<StubBarraBusquedaComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [StubBarraBusquedaComponent],
      imports: [FormsModule]
    })
    fixture = TestBed.createComponent(StubBarraBusquedaComponent)
    component = fixture.debugElement.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should update busqueda content', () => {
    const searchInput: HTMLInputElement = searchElement('searchInput')
    const busqueda: string = 'Delantero'
    write(searchInput, busqueda)
    expect(component.busqueda).toBe(busqueda)
  })

  it('emitBusqueda should get executed', () => {
    const searchInput: HTMLInputElement = searchElement('searchInput')
    const busqueda: string = 'Delantero'
    write(searchInput, busqueda)
    expect(component.emitExecuted).toBeTruthy()
  })


  function searchElement(testId: string) {
    const compiled = fixture.debugElement.nativeElement
    return compiled.querySelector(`[data-testid="${testId}"]`)
  }

  function write(element: HTMLInputElement, value: string) {
    element.value = value
    element.dispatchEvent(new Event('input'))
    fixture.detectChanges()
  }
})