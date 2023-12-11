import { NgModule } from '@angular/core'
import localeAR from '@angular/common/locales/es-AR'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SobreComponent } from './components/sobre/sobre.component'
import { BarraBusquedaComponent } from './components/barra-busqueda/barra-busqueda.component'
import { OrdenBusquedaComponent } from './components/orden-busqueda/orden-busqueda.component'
import { FiltroBusquedaComponent } from './components/filtro-busqueda/filtro-busqueda.component'
import { NavbarComponent } from './components/shared/navbar/navbar.component'
import { FooterComponent } from './components/shared/footer/footer.component'
import { FiguritaComponent } from './components/figurita/figurita.component'
import { InputComponent } from './components/shared/input/input/input.component'
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component'
import { BusquedaFiguritasComponent } from './pages/busqueda-figuritas/busqueda-figuritas.component'
import { CheckboxComponent } from './components/shared/input/checkbox/checkbox.component'
import { SelectorComponent } from './components/shared/input/selector/selector.component'
import { AsideProfileComponent } from './components/profile/aside-profile/aside-profile.component'
import { BusquedaSobresComponent } from './pages/busqueda-sobres/busqueda-sobres.component'
import { LoginComponent } from './pages/login/login.component'
import { ProfileFormComponent } from './components/profile/profile-form/profile-form.component'
import { ProfileNavComponent } from './components/profile/profile-nav/profile-nav.component'
import { DetalleFiguritaComponent } from './pages/detalle-figurita/detalle-figurita.component'
import { BusquedaFiguritasFaltantesComponent } from './pages/busqueda-figuritas-faltantes/busqueda-figuritas-faltantes.component'
import { BusquedaFiguritasRepetidasComponent } from './pages/busqueda-figuritas-repetidas/busqueda-figuritas-repetidas.component'
import { ProfileRepetidasComponent } from './components/profile/profile-repetidas/profile-repetidas.component'
import { ProfileFaltantesComponent } from './components/profile/profile-faltantes/profile-faltantes.component'
import { ProfileMainComponent } from './components/profile/profile-main/profile-main.component'
import { PaginatorComponent } from './components/paginator/paginator.component'
import { registerLocaleData } from '@angular/common'
import { PageNumberComponent } from './components/shared/page-number/page-number.component'
import { CalculateAgePipe } from './pipes/calculate-age/calculate-age.pipe'
import { LoginFormComponent } from './components/login-form/login-form.component'
import { LoadingComponent } from './components/shared/loading/loading.component'

registerLocaleData(localeAR)

@NgModule({
  declarations: [
    AppComponent,
    SobreComponent,
    BarraBusquedaComponent,
    OrdenBusquedaComponent,
    FiltroBusquedaComponent,
    NavbarComponent,
    FooterComponent,
    FiguritaComponent,
    BusquedaFiguritasComponent,
    CheckboxComponent,
    InputComponent,
    PerfilUsuarioComponent,
    SelectorComponent,
    AsideProfileComponent,
    BusquedaSobresComponent,
    LoginComponent,
    ProfileFormComponent,
    ProfileNavComponent,
    DetalleFiguritaComponent,
    BusquedaFiguritasFaltantesComponent,
    BusquedaFiguritasRepetidasComponent,
    ProfileRepetidasComponent,
    ProfileFaltantesComponent,
    ProfileMainComponent,
    PaginatorComponent,
    PageNumberComponent,
    CalculateAgePipe,
    LoginFormComponent,
    LoadingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
