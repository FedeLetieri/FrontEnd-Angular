import { Component, OnInit } from '@angular/core'
import { UsuarioService } from 'app/services/usuario/usuario.service'
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(public usuarioService: UsuarioService) {}

  private sessionId!: number

  ngOnInit(): void { 
    this.sessionId = JSON.parse(localStorage.getItem('session')!).id
    this.obtenerInformacionUsuarioFromService(this.sessionId)
  }

  obtenerInformacionUsuarioFromService(id:number){
    this.usuarioService.getInfoUsuario(id)
  }
}