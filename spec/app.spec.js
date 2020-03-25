require('custom-env').env('testing')
const app = require('../app.js')
const  request  = require('supertest')
const { seedDB } = require('../seed/seed.js')
const stacksData = require('../seed/testData/stacks.json')



describe('Nnenna Textiles API',() => {

  beforeEach(() => {
    seedDB(stacksData).then((result) => console.log(result))
  })

  afterAll(async () => {
    await new Promise((resolve) => {
      return setTimeout(() => {
        return resolve()
      },500)})
  })

  describe("/stacks Endpoints", () => {

    const stacksUrl = '/api/stacks'

    describe("GET /stacks", () => {
      it("Returns all five entries in the database", async (done) => {
        return request(app)
          .get(stacksUrl)
          .then((response) => {
            console.log(response.body)
            expect(response.status).toEqual(200)
            expect(Object.entries(response.body.docs)).toHaveLength(5)
            done()
          })
      })
      it("Returns Genuine MongoDB entries", async (done) => {
        return request(app)
          .get(stacksUrl)
          .then((response) => {
            expect(response.status).toEqual(200)
            console.log(Object.values(response.body.docs))
            expect(response.body.docs).toHaveProperty("_id")
            done()
          })
      })
    })
    describe("POST /stacks", () => {
      
      const newData = JSON.stringify({
        recallid: '496',
        content: ['ATS', 'ATS', 'ATS', 'LTS', 'LTS', 'LTS', 'LTSH', 'LTSH', 'LTSH', 'AC', 'AC', 'AC'],
        date: '25-2-20'
      })

      it("Add a new stack to the database", async (done) => {
        console.log(newData)
        return request(app)
          .post(stacksUrl)
          .send(newData)
          .then((res) => {
            console.log(res.body) 
            expect(res.status).toEqual(200)
            done()
          })
      })
    })

  })

})