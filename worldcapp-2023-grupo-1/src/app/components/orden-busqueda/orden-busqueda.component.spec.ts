import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OrdenBusquedaComponent } from './orden-busqueda.component'

describe('OrdenBusquedaComponent', () => {
  let component: OrdenBusquedaComponent
  let fixture: ComponentFixture<OrdenBusquedaComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdenBusquedaComponent]
    })
    fixture = TestBed.createComponent(OrdenBusquedaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
