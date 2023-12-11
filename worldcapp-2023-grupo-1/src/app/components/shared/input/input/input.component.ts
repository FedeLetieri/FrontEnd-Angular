import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() id!: string
  @Input() title!: string
  @Input() type!: string
  @Input() labelId: string = ''
  
  @Input() inputText: string = ''
  constructor(){}

  ngOnInit() {
  }

}
