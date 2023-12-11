import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {

  @Input() id!: string
  @Input() title!: string
  @Input() options!: string[]

  constructor() { }

  ngOnInit() {
  }

}
