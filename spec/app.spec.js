const app = require('../app.js')
const  request  = require('supertest')


describe('Nnenna Textiles API',() => {
  describe('Connection to database', () => {
    it('Sends a valid query to valid database', () => {
        
      request(app)
        .get('/test')
        .expect((res) => {
          console.log(res)
          expect(res).toBe()
        })

        // .then((res) => {
        //   console.log(res)
        //   expect(res).toBe('Nnenna_Database_test')
        // })
    })
  })
})