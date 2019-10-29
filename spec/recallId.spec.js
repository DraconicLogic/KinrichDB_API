const {generateCode, generateUniqueCode} = require('../recall_id_generator.js')
const {fillValidCodes} = require('./util')


describe('Recall ID Generator', () => {
  describe('generateCode()', () => {
    it('Returns 3 digit code', () => {
      expect(generateCode().length).toBe(3)
    }) 
  })
  describe('generateUnqiueCode()', () => {
    it('returns code not currently in array of codes', () => {
      const expected = '123'
      const codes = fillValidCodes(expected)
      expect(generateUniqueCode(codes)).toBe(expected)

    })
  })
})

