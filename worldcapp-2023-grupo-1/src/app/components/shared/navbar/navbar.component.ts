import { Component } from '@angular/core'
import { Router, NavigationStart } from '@angular/router'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logoURL = "../../assets/img/logo.png"
  rootURL!: string

  constructor(private router: Router, private http: HttpClient) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.rootURL = this.getRootUrl(event.url)
      }
    })
  }

  private getRootUrl(url: string): string {
    const parts = url.split('/')
    return parts[1]
  }

  isCurrentRoot(current: string) { return current == this.rootURL }

  rootClass(current: string) {
    if (this.isCurrentRoot(current)) {
      return "mainnav_link-current"
    } else {
      return "mainnav_link"
    }
  }

  get items() {
    return [
      { label: 'Figuritas', value: "" },
      { label: 'Sobres', value: "busqueda-sobres" },
      { label: 'Perfil', value: "perfil" },
    ]
  }

  logout() {
    this.http.post('http://localhost:9000/logout', "").subscribe(
      response => {
        console.log('Respuesta al cierre de sesión:', response)
        localStorage.removeItem('session')
        this.router.navigate(['/login'])
      },
      error => {
        console.error('Error al cerrar sesión:', error)
      }
    )
  }
}
