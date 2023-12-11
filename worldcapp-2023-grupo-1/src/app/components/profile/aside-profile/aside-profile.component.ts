import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms'
import { UsuarioService } from 'app/services/usuario/usuario.service'
import { PerfilUsuario, Usuario } from 'domain/usuario'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-aside-profile',
  templateUrl: './aside-profile.component.html',
  styleUrls: ['./aside-profile.component.css']
})
export class AsideProfileComponent implements OnInit {

  //Info del usuario
  data$: Observable<Usuario>
  private sessionId!: number
  imageUrl: string = "assets/img/bilardo.jpeg"

  //Para ver chequear si se estan cambiando los datos
  modify: boolean = false

  //Creo el FormGroup con el cual se van a poder checkear cada uno de los Inputs del formulario
  //Gracias a este puedo agregarle las validaciones y posteriormente checkear quienes las cumplen y quienes no
  asideForm = new FormGroup({
    username: new FormControl('', [Validators.required, this.textoSuperaMaxumoPalabrasValidator]),
    image: new FormControl('', Validators.required),
  })

  constructor(public usuarioService: UsuarioService) {
    this.data$ = usuarioService.sharingObservable
   }

   ngOnInit() {
    //Obtengo el ID del usuario logeado
    this.sessionId = JSON.parse(localStorage.getItem('session')!).id
    //Me suscribo al observable del service para que cuando haya alguna actualizacion, este pueda actualizar la informacion
    //cargada en el formulario
    this.data$.subscribe((usuario) => {
      this.imageUrl = usuario.imagen
      this.asideForm.patchValue({
        username: usuario.username,
        image: usuario.imagen
      })
    })
  }

  //Get para ver chequear si se estan cambiando los datos
  isUserModifyingInformation(): boolean {
    return this.modify
  }

  //Set para ver chequear si se estan cambiando los datos 
  modifyUserInformation() {
    this.modify = !this.modify
  }

  //Cargo la imagen
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement
    const file = inputElement.files?.[0]
    if (file) {
      // Crea una URL para el archivo seleccionado
      this.imageUrl = URL.createObjectURL(file)
    }
  }

  //Cancelo modificaciones
  cancelModifications() {
    this.data$.subscribe((usuario) => {
      this.asideForm.patchValue({
        username: usuario.username,
        image: usuario.imagen
      })
    })
    //Vuelvo a la vista anterior, donde no se muestran las opciones para modificar los datos
    this.modifyUserInformation()
  }

  //Guardo modificaciones del perfil
  saveModifications() {
    //Checkeo que todos los campos cumplan las validaciones y guardo
    if (this.asideForm.valid) {
      const usernameValue = this.asideForm.get('username')?.value
    
      const perfil = new PerfilUsuario(usernameValue!, this.imageUrl)
      this.usuarioService.putPerfilUsuario(this.sessionId, perfil)

      this.modifyUserInformation()
    }

  }

  //Validaciones para el FormGroup
  textoSuperaMaxumoPalabrasValidator(control: AbstractControl): ValidationErrors | null {
    const valor = control.value
    const maxValue = 12

    if (valor.length > maxValue) {
      return { textoInvalido: true }
    }

    return null
  }

}