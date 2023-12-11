import { Component, ViewEncapsulation } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'worldcapp-2023-grupo-1'
  // paises = ['Argentina', 'Brasil', 'Uruguay', 'Chile']

  constructor(private router: Router, private route: ActivatedRoute) {
    // Suscribirse a los eventos de cambio de ruta
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      // Verificar la ruta actual y ocultar el app-navbar cuando estás en la página de login
      this.hideNavbarOnLogin()
    })
  }

  showNavbar = true // Por defecto, se muestra el navbar

  private hideNavbarOnLogin() {
    // Obtén la ruta actual
    const currentRoute = this.route.root.firstChild?.snapshot
    // Verifica si la ruta actual es la página de login (ajusta la condición según tu configuración de ruta)
    const isLoginPage = currentRoute?.routeConfig?.path === 'login'
    // Establece una variable booleana que indique si se debe mostrar o ocultar el app-navbar
    this.showNavbar = !isLoginPage
  }
}