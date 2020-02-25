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

  describe("GET /stacks", () => {

    const stacksUrl = '/api/stacks'

    it("Returns a list of all the stacks currently saved in the databse", async (done) => {
      return request(app)
        .get(stacksUrl)
        .then((response) => {
          // console.log(response.body.data)
          expect(response.status).toEqual(200)
          expect(Object.entries(response.body.docs).length).toEqual(5)
          done()
        })
    })
  })
})