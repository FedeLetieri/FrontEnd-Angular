import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core'
import { BehaviorSubject, Subject, Subscription } from 'rxjs'

@Component({
  selector: 'app-page-number',
  templateUrl: './page-number.component.html',
  styleUrls: ['./page-number.component.css']
})
export class PageNumberComponent implements OnInit, OnDestroy {
  @Input() currentPageNumber!: Subject<number>
  @Input() page!: number
  @Output() pageChangeEvent: EventEmitter<number> = new EventEmitter<number>
  state: string = ''
  private subsPageNumber!: Subscription

  ngOnInit(): void { this.subsPageNumber = this.currentPageNumber.subscribe(pageNumber => { if (this.page == pageNumber) { this.activate() } else { this.deactivate() } }) }
  ngOnDestroy(): void { if (this.subsPageNumber) { this.subsPageNumber.unsubscribe() } }

  activate(): void { this.state = 'active-page' }
  deactivate(): void { this.state = '' }

  emitPageChange(): void { this.pageChangeEvent.emit(this.page) }
}

export class StubPageNumberComponent extends PageNumberComponent {
  override page: number = 3
  currentPage: number = 0
  override currentPageNumber: Subject<number> = new BehaviorSubject(this.currentPage)
  pageChangeEmitted: boolean = false
  override emitPageChange(): void { this.pageChangeEmitted = true }
}
