import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StubPageNumberComponent } from './page-number.component'

describe('PageNumberComponent', () => {
  let component: StubPageNumberComponent
  let fixture: ComponentFixture<StubPageNumberComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [StubPageNumberComponent]
    })
    fixture = TestBed.createComponent(StubPageNumberComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should be deactivated', () => {
    expect(component.state).toBe('')
  })

  it('should emit page change event', () => {
    const page: HTMLElement = searchElement('pageNumber')
    page.click()
    fixture.detectChanges()
    expect(component.pageChangeEmitted).toBeTruthy()
  })

  it('should activate the page number', () => {
    component.currentPageNumber.next(component.page)
    fixture.detectChanges()
    expect(component.state).toBe('active-page')
  })

  function searchElement(testId: string) {
    const compiled = fixture.debugElement.nativeElement
    return compiled.querySelector(`[data-testid="${testId}"]`)
  }
})
