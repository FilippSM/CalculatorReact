import { describe, test, expect } from 'vitest'
import { cleanNumericInput } from '../ui/Density'


describe('cleanNumericInput', () => {
  test('удаляет все буквы', () => {
    expect(cleanNumericInput('abc')).toBe('')
    expect(cleanNumericInput('hello123world')).toBe('123')
    expect(cleanNumericInput('test123test456test')).toBe('123456')
  })

  /* test('разрешает цифры', () => {
    expect(cleanNumericInput('123')).toBe('123')
    expect(cleanNumericInput('123456')).toBe('123456')
    expect(cleanNumericInput('0')).toBe('0')
  })

  test('разрешает точки и запятые', () => {
    expect(cleanNumericInput('123.45')).toBe('123.45')
    expect(cleanNumericInput('123,45')).toBe('123,45')
    expect(cleanNumericInput('12.34,56')).toBe('12.34,56')
  })

  test('разрешает пробелы', () => {
    expect(cleanNumericInput('123 456')).toBe('123 456')
    expect(cleanNumericInput('85 1')).toBe('85 1')
  })

  test('удаляет спецсимволы и другие символы', () => {
    expect(cleanNumericInput('!@#$%^&*()')).toBe('')
    expect(cleanNumericInput('85-1')).toBe('851')
    expect(cleanNumericInput('85+1')).toBe('851')
    expect(cleanNumericInput('85_1')).toBe('851')
  })

  test('комбинированные тесты', () => {
    expect(cleanNumericInput('test85.1abc')).toBe('85.1')
    expect(cleanNumericInput('price: 123,45 USD')).toBe('123,45')
    expect(cleanNumericInput('input: 12 345.67 test')).toBe('12 345.67')
  }) */
})