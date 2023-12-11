import { CalculateAgePipe } from './calculate-age.pipe'

describe('CalculateAgePipe', () => {
  let pipe: CalculateAgePipe

  beforeEach(() => {
    pipe = new CalculateAgePipe()
  })

  it('should create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should calculate age correctly', () => {
    const fechaNacimiento = new Date('1996-05-21')
    const edad = pipe.transform(fechaNacimiento)
    expect(edad).toEqual(27)
  })
})