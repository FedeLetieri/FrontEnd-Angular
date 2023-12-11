import { Component, ViewEncapsulation, Injectable, Input, Output, ChangeDetectionStrategy, EventEmitter, AfterViewChecked } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PaginatorComponent implements AfterViewChecked {
  currentPage: number = 0
  currentPageNumber: BehaviorSubject<number> = new BehaviorSubject(this.currentPage)
  @Input() pageSize!: number
  @Input() amountItems!: number
  @Input() amountSidePageButtons: number = 3
  @Output() indexesChangeEvent: EventEmitter<number[]> = new EventEmitter<number[]>

  ngAfterViewChecked(): void { this.emitNewPage() }

  goTo(pageNumber: number): void {
    if (this.isValid(pageNumber)) {
      this.currentPage = pageNumber
      this.currentPageNumber.next(this.currentPage)
      this.emitNewPage()
    }
  }

  totalPagesPreview(): number[] {
    const pageNumbers: number[] = []
    for (let pageNumber = this.currentPage - this.amountSidePageButtons; pageNumber <= this.currentPage + this.amountSidePageButtons; pageNumber++) {
      pageNumbers.push(pageNumber)
    }
    return pageNumbers.filter(pageNumber => this.isValid(pageNumber))
  }

  pageStart(): number { return this.currentPage * this.pageSize }
  pageEnd(): number { return Math.min(this.amountItems, this.pageStart() + this.pageSize) }

  isValid(pageNumber: number): boolean { return pageNumber >= 0 && pageNumber <= this.finalPage() }

  isFirstPage() { return this.currentPage == 0 }
  isLastPage() { return this.currentPage == this.finalPage() || this.amountItems == 0 }

  emitNewPage(): void { this.indexesChangeEvent.emit([this.pageStart(), this.pageEnd()]) }

  finalPage(): number { return Math.ceil(this.amountItems / this.pageSize) - 1 }
}

export class StubPaginatorComponent extends PaginatorComponent {
  override pageSize: number = 5
  override amountItems: number = 100
  pageEmitted: boolean = false
  override emitNewPage(): void { this.pageEmitted = true }
}

@Injectable()
export abstract class Paginable<T>{
  abstract pageSize: number
  protected startPage: number = 0
  protected endPage: number = -1

  updatePage(indexes: number[]): void { this.startPage = indexes[0]; this.endPage = indexes[1] }
  abstract items(): T[]
  pagedItems(): T[] {
    const items = this.items()
    return this.endPage != -1 ? items.slice(this.startPage, this.endPage) : items.slice(this.startPage, this.pageSize)
  }

  amountItems(): number {
    const items = this.items()
    return items.length
  }
}


