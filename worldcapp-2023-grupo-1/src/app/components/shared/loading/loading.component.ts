import { Component, ViewEncapsulation, Input } from '@angular/core'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoadingComponent {
  @Input() state: boolean = true
  @Input() msg: string = "No se encontraron elementos"
}
