import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { StubBusquedaFiguritasComponent, busquedaFiguritasTestDeclarations } from './busqueda-figuritas-faltantes.component'

describe('BusquedaFiguritasComponent', () => {
  let component: StubBusquedaFiguritasComponent
  let fixture: ComponentFixture<StubBusquedaFiguritasComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StubBusquedaFiguritasComponent, busquedaFiguritasTestDeclarations],
      imports: [FormsModule]
    })
    fixture = TestBed.createComponent(StubBusquedaFiguritasComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should filter <Figuritas> that meet the <Promise> condition', () => {
    component.filterPromesa()
    fixture.detectChanges()
    console.log(component.figuritas)
    expect(component.figuritas.length).toBe(3)
  })

  it('should filter <Figuritas> that meet the <On Fire> condition', () => {
    component.filterOnFire()
    fixture.detectChanges()
    console.log(component.figuritas)
    expect(component.figuritas.length).toBe(2)
  })

  it('should filter <Figuritas> that meet the <On Fire> and <Promise> conditions', () => {
    component.filterOnFire()
    component.filterPromesa()
    fixture.detectChanges()
    console.log(component.figuritas)
    expect(component.figuritas.length).toBe(2)
  })

  it('should filter <Figuritas> within a certain range', () => {
    component.rango.min = 180
    component.rango.max = 200
    component.filterRango()
    fixture.detectChanges()
    expect(component.figuritas.length).toBe(1)
  })

  it('should filter <Figuritas> that meet the <On Fire> and <Promise> conditions, within a certain range', () => {
    component.rango.min = 170
    component.rango.max = 200
    component.filterRango()
    component.filterOnFire()
    component.filterPromesa()
    fixture.detectChanges()
    console.log(component.figuritas)
    expect(component.figuritas.length).toBe(2)
  })
})