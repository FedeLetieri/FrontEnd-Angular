import './app.module'
import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { NavbarComponent } from './components/shared/navbar/navbar.component'
import { FooterComponent } from './components/shared/footer/footer.component'
import { BusquedaFiguritasComponent, busquedaFiguritasTestDeclarations } from './pages/busqueda-figuritas/busqueda-figuritas.component'

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [
      AppComponent,
      NavbarComponent,
      FooterComponent,
      BusquedaFiguritasComponent,
      busquedaFiguritasTestDeclarations
    ]
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'worldcapp'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('worldcapp-2023-grupo-1')
  })


})
