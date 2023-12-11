import { TestBed } from '@angular/core/testing'

import { StubFiguritaService } from './figurita.service'

describe('FiguritaService', () => {
  let service: StubFiguritaService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(StubFiguritaService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should get element by ID', () => {
    expect(service.getById(3)).toBeTruthy()
  })
})
