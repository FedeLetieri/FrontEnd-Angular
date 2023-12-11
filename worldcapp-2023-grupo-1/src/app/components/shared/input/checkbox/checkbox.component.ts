import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent {
  @Input() inputType:string = 'checkbox'
  @Input() inputName:string = ''
  @Output() checkedEmitter: EventEmitter<{key:string, value: boolean}> = new EventEmitter<{key:string, value: boolean}>()

  emitCheckedState(value: boolean): void {
    this.checkedEmitter.emit({key: this.inputName, value: value}) }
}
