import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CheckboxComponent } from './checkbox.component'

describe('CheckboxComponent', () => {
  let component: CheckboxComponent
  let fixture: ComponentFixture<CheckboxComponent>

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent]
    })
    fixture = TestBed.createComponent(CheckboxComponent)
    component = fixture.debugElement.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('it is unchecked by default', () =>{
    const checkboxInput: HTMLInputElement = searchElement(fixture, 'checkbox__input')
    expect(checkboxInput.checked).toBeFalsy()
  })

  it('should get checked', () => {
    const checkbox: HTMLElement = searchElement(fixture, 'checkbox')
    const checkboxInput: HTMLInputElement = searchElement(fixture, 'checkbox__input')
    component.inputType = 'checkbox'
    fixture.detectChanges()
    checkbox.click()
    checkboxInput.dispatchEvent(new MouseEvent('click'))
    fixture.detectChanges()
    expect(checkboxInput.checked).toBeTruthy()
  })

  function searchElement(fixture: ComponentFixture<CheckboxComponent> , testId: string){
    const compiled = fixture.debugElement.nativeElement
    return compiled.querySelector(`[data-testid="${testId}"]`)
  }
})
