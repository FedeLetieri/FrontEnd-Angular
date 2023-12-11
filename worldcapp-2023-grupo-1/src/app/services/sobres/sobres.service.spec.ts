/* tslint:disable:no-unused-variable */

import { TestBed,  inject } from '@angular/core/testing'
import { SobresService } from './sobres.service'

describe('Service: Sobres', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SobresService]
    })
  })

  it('should ...', inject([SobresService], (service: SobresService) => {
    expect(service).toBeTruthy()
  }))
})
