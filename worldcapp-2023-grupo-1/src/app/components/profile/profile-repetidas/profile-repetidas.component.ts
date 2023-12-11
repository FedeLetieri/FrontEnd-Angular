import { Component, ViewEncapsulation, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { FiguritaService } from 'app/services/figurita/figurita.service'
import { Figurita } from 'domain/figurita'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { Paginable } from 'app/components/paginator/paginator.component'
@Component({
  selector: 'app-profile-repetidas',
  templateUrl: './profile-repetidas.component.html',
  styleUrls: ['./profile-repetidas.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileRepetidasComponent extends Paginable<Figurita> implements OnInit {
  override pageSize: number = 3
  figuritas$: BehaviorSubject<Figurita[]> = new BehaviorSubject<Figurita[]>([])
  private sessionId!: number

  constructor(public service: FiguritaService, private router: Router) { super() }

  ngOnInit(): void {
    this.sessionId = JSON.parse(localStorage.getItem('session')!).id
    this.service.obtenerFiguritasRepetidasFromBack(this.sessionId)
    this.figuritas$ = this.service.figuritasRepetidasUsuario
  }

  override items(): Figurita[] { return this.figuritas$.getValue() }

  navegarAOtraVista() { this.router.navigate(['/busqueda-figuritas-repetidas']) }

  figuritasExist(): boolean { return this.figuritas$ != undefined }
}
