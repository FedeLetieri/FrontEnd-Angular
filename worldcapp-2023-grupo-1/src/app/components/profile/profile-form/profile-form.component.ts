import { Component, OnInit} from '@angular/core'
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms'
import { UsuarioService } from 'app/services/usuario/usuario.service'
import { JugadorDTO } from 'domain/jugador'
import { Seleccion } from 'domain/seleccion'
import { FormUsuario, Usuario } from 'domain/usuario'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
})
export class ProfileFormComponent implements OnInit {

  //Info del usuario
  data$: Observable<Usuario>
  private sessionId!: number

  //Variables para almacenar items del formulario
  criterios= ['Par','Nacionalista', 'Conservador','Fanatico', 'Desprendido','Apostador', 'Interesado','Cambiante']
  provinciasArgentinas: string[] = []
  localidadesArgentinas: string[] = []
  nacionalistaOptions!: Seleccion[]
  fanaticoOptions!: JugadorDTO[]

  //Opciones de seleccion seleccionadas, la actual y el listado
  selectedOptions: Seleccion[] = []

  //Variable para detectar si se guardo el formulario
  isSavedSuccessfully = false

  constructor(public usuarioService: UsuarioService) {
    this.data$ = usuarioService.sharingObservable
   }


  //Creo el FormGroup con el cual se van a poder checkear cada uno de los Inputs del formulario
  //Gracias a este puedo agregarle las validaciones y posteriormente checkear quienes las cumplen y quienes no
  userForm= new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    fechaDeNacimiento: new FormControl(new Date().toISOString().slice(0, 10), [Validators.required, this.fechaNacimientoValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    provincia: new FormControl('', Validators.required),
    localidad: new FormControl('', Validators.required),
    calle: new FormControl('', Validators.required),
    altura: new FormControl(0, [Validators.required, this.numeroMayorQueCeroValidator]),
    posicionX: new FormControl(0, Validators.required),
    posicionY: new FormControl(0, Validators.required),
    distanciaDeCercania: new FormControl(0, [Validators.required, this.numeroMayorQueCeroValidator]),
    criterio: new FormControl('', Validators.required),
    inputNacionalista: new FormControl(''),
    inputFanatico: new FormControl(''),
  })
  
  
  ngOnInit() {
    //Obtengo el ID del usuario logeado
    this.sessionId = JSON.parse(localStorage.getItem('session')!).id
    //Busco Informacion para armar el formulario
    this.obtenerProvinciasDisponiblesFromService()
    this.usuarioService.getAllJugadores().then((jugadores: JugadorDTO[]) => {
      this.fanaticoOptions = jugadores
    })
    this.usuarioService.getAllSelecciones().then((selecciones: Seleccion[]) => {
      this.nacionalistaOptions = selecciones
    })
    //Me suscribo al observable del service para que cuando haya alguna actualizacion, este pueda actualizar la informacion
    //cargada en el formulario
    this.data$.subscribe((usuario) => {
      const selectedJugador = usuario.jugadorFanatico
      this.userForm.patchValue({
        nombre: usuario.nombre || '', 
        apellido: usuario.apellido || '', 
        fechaDeNacimiento: usuario.fechaDeNacimiento.toISOString().slice(0, 10) || new Date().toISOString().slice(0, 10),
        email: usuario.email || null, 
        provincia: usuario.provincia || '', 
        localidad: usuario.localidad || '', 
        calle: usuario.calle || '', 
        altura: usuario.altura || 0 , 
        posicionX: usuario.posicionX || 0 , 
        posicionY: usuario.posicionY || 0 , 
        distanciaDeCercania: usuario.distanciaDeCercania || 0,
        criterio: usuario.criterio || '', 
        inputNacionalista: usuario.listadoNacionalista !== null ? usuario.listadoNacionalista.at(0)?.pais : '',
        inputFanatico: selectedJugador ? `${selectedJugador.nombre} ${selectedJugador.apellido}` : ''
      })
      if (usuario.listadoNacionalista !== null && usuario.listadoNacionalista !== undefined) {
        this.selectedOptions = usuario.listadoNacionalista
      } else {
        this.selectedOptions = []
      }
    })    
    //Al recibir un cambio en el valor de criterio seteo todos los valores para que envien los datos correspondientes del criterio
    this.userForm.get('criterio')?.valueChanges.subscribe((criterio) => {
      const inputNacionalista = this.userForm.get('inputNacionalista')
      const inputFanatico = this.userForm.get('inputFanatico')
    
      if (criterio === 'Nacionalista') {
        inputNacionalista?.setValidators(Validators.required)
        inputFanatico?.clearValidators()
        inputFanatico?.setValue('')
      } else if (criterio === 'Fanatico') {
        inputNacionalista?.clearValidators()
        inputNacionalista?.setValue('')
        inputFanatico?.setValidators(Validators.required)
        this.selectedOptions = []
      } else {
        inputNacionalista?.clearValidators()
        inputFanatico?.clearValidators()
        inputNacionalista?.setValue('')
        inputFanatico?.setValue('')
        this.selectedOptions = []
      }
    })
  }

  //Reseteo todos los valores del formulario
  onResetForm(){
    this.userForm.reset()
  }

  
  //Guardo el formulario
  saveForm() {
    this.checkAndSetValidations()
    if (this.userForm.valid) {
      // Obtener los valores del formulario
      const usuarioFormValues = this.userForm.value
      
      // Crear una nueva instancia de FormUsuario pasando los valores por el constructor
      const formUsuario = new FormUsuario(
        usuarioFormValues.nombre!,
        usuarioFormValues.apellido!,
        new Date(usuarioFormValues.fechaDeNacimiento!),
        usuarioFormValues.email!,
        usuarioFormValues.provincia!,
        usuarioFormValues.localidad!,
        usuarioFormValues.calle!,
        usuarioFormValues.altura!,
        usuarioFormValues.posicionX!,
        usuarioFormValues.posicionY!,
        usuarioFormValues.distanciaDeCercania!,
        usuarioFormValues.criterio!,
        this.selectedOptions.length > 0 ? this.selectedOptions : null,
      ).toJson()
  
      if (usuarioFormValues.inputFanatico) {
    
        const [nombre, apellido] = usuarioFormValues.inputFanatico.split(' ')
        const jugadorSeleccionado = this.fanaticoOptions.find(jugador => jugador.nombre === nombre && jugador.apellido === apellido)
        
        formUsuario.jugadorFanatico = jugadorSeleccionado!
      }

      // Llamo al endpoint para guardar el formulario en el backend
      this.usuarioService.putFormUsuario(this.sessionId, formUsuario)

      // Configura el mensaje de éxito
      this.isSavedSuccessfully = true
      
      // Temporizador para ocultar el mensaje de éxito
      setTimeout(() => {
        this.isSavedSuccessfully = false
      }, 1500) 
          
    }
    
  }

  //Busco en el backend todas las provincias disponibles y las guardo para mostrar en el formulario como opciones disponibles
  obtenerProvinciasDisponiblesFromService(): void {
    this.usuarioService.getAllProvincias().then((provincias: string[]) => {
      this.provinciasArgentinas = provincias
    })
  }

  //Agrego Seleccion para los usuarios con criterio Nacionalista
  addSelectedOption(event: Event) {
    const option = (event.target as HTMLSelectElement).value
    // Busca la selección completa basada en el nombre
    const exists = this.selectedOptions.some((seleccion) => seleccion.pais === option)

    // Si no existe, agregarlo
    if (!exists) {
      const seleccionCompleta = this.nacionalistaOptions.find((seleccion) => seleccion.pais === option)
      if (seleccionCompleta) {
        this.selectedOptions.push(seleccionCompleta)
      }
    }
  }

  //Elimino Seleccion para los usuarios con criterio Nacionalista
  removeSelectedOption(option: Seleccion) {
    const index = this.selectedOptions.findIndex((seleccion) => seleccion === option)
    if (index !== -1) {
      this.selectedOptions.splice(index, 1)
    }
  }

  //Busco localidad en base a la provincia seleccionada
  onProvinceChange(provincia: string) {
    if (provincia) {
      this.obtenerLocalidadesDisponiblesFromService(provincia)
    }
  }

  obtenerLocalidadesDisponiblesFromService(provincia: string): void {
    this.usuarioService.getLocalidades(provincia).then((localidades: string[]) => {
      this.localidadesArgentinas = localidades
    })
  }

  //Checkeo si todos los Validators pasan
  checkAndSetValidations(){
    for (const controlName in this.userForm.controls) {
      if (this.userForm.controls.hasOwnProperty(controlName)) {
        const control = this.userForm.get(controlName)
        if (control) {
          control.markAsTouched()
        }
      }
    }
  }

  //Muestra error en el campo
  showErrorForField(fieldName: string, errorType: string): boolean {
    const control = this.userForm.get(fieldName)

    if (control) {
      return control.hasError(errorType) && control.touched
    }

    return false
  }

  //Validaciones para el FormGroup
  fechaNacimientoValidator(control: AbstractControl): ValidationErrors | null {
    const fechaNacimiento = new Date(control.value)
    const fechaActual = new Date()
  
    if (control.value === null || control.value === '') {
      return { required: true }
    }
  
    if (fechaNacimiento > fechaActual) {
      return { fechaInvalida: true }
    }
  
    return null
  }

  numeroMayorQueCeroValidator(control: AbstractControl): ValidationErrors | null {
    const valor = control.value
  
    if (valor <= 0) {
      return { numeroInvalido: true }
    }
  
    return null
  }

}
