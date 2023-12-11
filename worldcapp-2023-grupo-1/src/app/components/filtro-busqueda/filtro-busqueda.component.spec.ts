import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormsModule } from '@angular/forms'
import { FiltroBusquedaComponent } from './filtro-busqueda.component'
import { CheckboxComponent } from '../shared/input/checkbox/checkbox.component'
describe('FiltroBusquedaComponent', () => {
  let component: FiltroBusquedaComponent
  let fixture: ComponentFixture<FiltroBusquedaComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [FiltroBusquedaComponent, CheckboxComponent],
      imports: [FormsModule]
    })
    TestBed.compileComponents()
    fixture = TestBed.createComponent(FiltroBusquedaComponent)
    component = fixture.debugElement.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('range min value should be undefined', () => {
    expect(component.rango.min).toBeUndefined()
  })

  it('range max value should be undefined', () => {
    expect(component.rango.max).toBeUndefined()
  })

  it('should update the min and max range value correctly', () => {
    const minValueInput: HTMLInputElement = searchElement('minValoracion')
    const maxValueInput: HTMLInputElement = searchElement('maxValoracion')

    const valueMin = 123
    const valueMax = valueMin + 1

    write(minValueInput, valueMin.toString())
    expect(component.rango.min).toBe(valueMin)

    write(maxValueInput, valueMax.toString())
    expect(component.rango.max).toBe(valueMax)
  })

  it('should NOT be valid as the max value is lower than the min one', () => {
    const maxValueInput: HTMLInputElement = searchElement('maxValoracion')
    const valueMin = 123
    const valueMax = valueMin - 1

    write(maxValueInput, valueMax.toString())
    expect(component.rango.max).toBe(valueMax)
    expect(component.maxIsValid()).toBeFalsy()
  })

  it('should NOT update the min and max range value correctly as the max value is negative', () => {
    const maxValueInput: HTMLInputElement = searchElement('maxValoracion')
    const valueMin = 123
    const valueMax = valueMin * - 1

    write(maxValueInput, valueMax.toString())
    expect(component.rango.max).toBe(valueMax)
    expect(component.maxIsValid()).toBeFalsy()
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
