import { BehaviorSubject } from 'rxjs'
import { Component, ViewEncapsulation, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Figurita } from 'domain/figurita'
import { Router } from '@angular/router'

import { FiguritaService } from 'app/services/figurita/figurita.service'
import { Paginable } from 'app/components/paginator/paginator.component'

@Component({
  selector: 'app-profile-faltantes',
  templateUrl: './profile-faltantes.component.html',
  styleUrls: ['./profile-faltantes.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFaltantesComponent extends Paginable<Figurita> implements OnInit {
  override pageSize: number = 3
  figuritas$: BehaviorSubject<Figurita[]> = new BehaviorSubject<Figurita[]>([])
  private sessionId!: number

  constructor(public service: FiguritaService, private router: Router) { super() }

  ngOnInit(): void {
    this.sessionId = JSON.parse(localStorage.getItem('session')!).id
    this.service.obtenerFiguritasFaltantesFromBack(this.sessionId)
    this.obtenerFiguritasFaltantes()
  }

  obtenerFiguritasFaltantes() {
    this.figuritas$ = this.service.figuritasFaltantesUsuario
  }

  override items(): Figurita[] { return this.figuritas$.getValue() }

  navegarAOtraVista() {
    this.router.navigate(['/busqueda-figuritas-faltantes'])
  }

  figuritasExist(): boolean { return this.figuritas$ != undefined }
}
