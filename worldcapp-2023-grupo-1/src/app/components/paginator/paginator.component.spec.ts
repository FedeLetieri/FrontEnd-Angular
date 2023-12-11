import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StubPaginatorComponent } from './paginator.component'
import { PageNumberComponent } from '../shared/page-number/page-number.component'

describe('PaginatorComponent', () => {
  let component: StubPaginatorComponent
  let fixture: ComponentFixture<StubPaginatorComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StubPaginatorComponent, PageNumberComponent]
    })
    fixture = TestBed.createComponent(StubPaginatorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should go to last page, then first page', () => {
    const lastPage: HTMLElement = searchElement('lastPage')
    lastPage.click()
    fixture.detectChanges()

    expect(component.currentPage).toBe(component.finalPage())

    const firstPage: HTMLElement = searchElement('firstPage')
    firstPage.click()
    fixture.detectChanges()

    expect(component.currentPage).toBe(0)
  })

  it('should go to next page, then previous page', () => {
    const nextPage: HTMLElement = searchElement('nextPage')
    nextPage.click()
    fixture.detectChanges()

    expect(component.currentPage).toBe(1)

    const pastPage: HTMLElement = searchElement('pastPage')
    pastPage.click()
    fixture.detectChanges()

    expect(component.currentPage).toBe(0)
  })

  it('should update observable pageNumber', () => {
    component.goTo(1)
    expect(component.pageEmitted).toBeTruthy()
  })

  function searchElement(testId: string) {
    const compiled = fixture.debugElement.nativeElement
    return compiled.querySelector(`[data-testid="${testId}"]`)
  }
})
