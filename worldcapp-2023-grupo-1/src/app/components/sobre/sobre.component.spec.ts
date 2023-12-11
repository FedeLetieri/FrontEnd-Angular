import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { StubSobreComponent } from './sobre.component'
import { Tipo } from 'domain/sobre'

describe('SobreComponent', () => {
  let component: StubSobreComponent
  let fixture: ComponentFixture<StubSobreComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StubSobreComponent],
      imports: [FormsModule]
    })
    fixture = TestBed.createComponent(StubSobreComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })


  it("Icono sobre tiene que ser el correcto", () => {
    const icono = fixture.debugElement.nativeElement.querySelector(`[data-testid="iconoSobre"]`)

    expect(icono.getAttribute('class')).toContain('fa-basket-shopping')

    component.sobre.tipo = Tipo.KIOSCO
    fixture.detectChanges()

    expect(icono.getAttribute('class')).toContain('fa-store')

    component.sobre.tipo = Tipo.LIBRERIA
    fixture.detectChanges()

    expect(icono.getAttribute('class')).toContain('fa-pen-ruler')
  })
})
