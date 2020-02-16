const app = require('../app.js')
const  request  = require('supertest')
console.log('PROCESS ENV', process.env)


describe('Nnenna Textiles API',() => {
  describe("GET /stacks", () => {
    it("Returns a list of all the stacks currently saved in the databse",() => {
      request(app)
        .get('/api/stacks')
        .expect(201)
        .then((response) => console.log(response))

        // .expect('Content-Type', /json/)
        // .end((err, res) => {
        //   if (err) throw err
        // })
        
        
        
    })
  })
})