import { Component } from '@angular/core'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'app/services/login/auth.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  authenticate() {
    const formData = this.loginForm.value

    if (this.loginForm.invalid) {
      for (const control in this.loginForm.controls) {
        if (this.loginForm.controls[control].invalid) {
          this.loginForm.controls[control].markAsTouched()
        }
      } console.error('Datos inválidos. Asegúrese de completar todos los campos.')
      return
    }

    this.authService.login(formData).subscribe(
      response => {
        localStorage.setItem('session', JSON.stringify({ id: response }))
        this.router.navigate(['/'])
      },
      error => {
        this.showAlert(error.error)
      }
    )
  }

  showAlert(msg: string) {
    const cartel = document.getElementById("alert") as HTMLElement
    cartel.querySelector("p")!.innerHTML = msg
    cartel.style.opacity = "1"
    setTimeout(function () {
      cartel.style.opacity = "0"
    }, 1500)
  }
}
