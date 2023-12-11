import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BusquedaSobresComponent } from './pages/busqueda-sobres/busqueda-sobres.component'
import { BusquedaFiguritasComponent } from './pages/busqueda-figuritas/busqueda-figuritas.component'
import { LoginComponent } from './pages/login/login.component'
import { DetalleFiguritaComponent } from './pages/detalle-figurita/detalle-figurita.component'
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component'
// import { BusquedaFiguritasFaltantesComponent } from './pages/busqueda-figuritas-faltantes/busqueda-figuritas-faltantes.component'
// import { BusquedaFiguritasRepetidasComponent } from './pages/busqueda-figuritas-repetidas/busqueda-figuritas-repetidas.component'
import { ProfileFormComponent } from './components/profile/profile-form/profile-form.component'
import { ProfileRepetidasComponent } from './components/profile/profile-repetidas/profile-repetidas.component'
import { ProfileFaltantesComponent } from './components/profile/profile-faltantes/profile-faltantes.component'
import { BusquedaFiguritasFaltantesComponent } from './pages/busqueda-figuritas-faltantes/busqueda-figuritas-faltantes.component'
import { BusquedaFiguritasRepetidasComponent } from './pages/busqueda-figuritas-repetidas/busqueda-figuritas-repetidas.component'
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'busqueda-sobres', component: BusquedaSobresComponent, canActivate: [AuthGuard] },
  { path: '', component: BusquedaFiguritasComponent, canActivate: [AuthGuard] },
  { path: 'detalle-figurita/:id', component: DetalleFiguritaComponent, canActivate: [AuthGuard] },
  {
    path: 'perfil',
    component: PerfilUsuarioComponent,
    children: [
      { path: '', redirectTo: 'informacion', pathMatch: 'full' },
      { path: 'informacion', component: ProfileFormComponent, canActivate: [AuthGuard] },
      { path: 'repetidas', component: ProfileRepetidasComponent, canActivate: [AuthGuard] },
      { path: 'faltantes', component: ProfileFaltantesComponent, canActivate: [AuthGuard] },
    ],
    canActivate: [AuthGuard]
  },
  { path: 'busqueda-figuritas-faltantes', component: BusquedaFiguritasFaltantesComponent, canActivate: [AuthGuard] },
  { path: 'busqueda-figuritas-repetidas', component: BusquedaFiguritasRepetidasComponent, canActivate: [AuthGuard] },
  // { path: 'busqueda-figuritas-repetidas', component: BusquedaFiguritasRepetidasComponent },
  // { path: 'busqueda-figuritas-faltantes', component: BusquedaFiguritasFaltantesComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
