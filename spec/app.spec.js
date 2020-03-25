/**
* @jest-environment node
*/

require('custom-env').env('testing')
const app = require('../app.js')
const  request  = require('supertest')
const { seedDB } = require('../seed/seed.js')
const stacksData = require('../seed/testData/stacks.json')



describe('Nnenna Textiles API',() => {
  let seedResults;

  beforeEach(() => {
    return seedDB(stacksData).then((result) => {
      return seedResults = result
    })
    
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
      it("Returns same number of entries seeded", async (done) => {
        return request(app)
          .get(stacksUrl)
          .then((response) => {
            expect(response.status).toEqual(200)
            expect(response.body.stacks).toHaveLength(seedResults.length)
            done()
          })
      })
      it.skip("Returns Genuine DB entries", async (done) => {
        return request(app)
          .get(stacksUrl)
          .then((response) => {
            expect(response.status).toEqual(200)
            console.log(Object.values(response.body.stacks))
            expect(response.body.stacks).toHaveProperty("_id")
            done()
          })
      })
    })
    describe("POST /stacks", () => {
      
      const newData = {
        stackId: '496',
        content: ['ATS', 'ATS', 'ATS', 'LTS', 'LTS', 'LTS', 'LTSH', 'LTSH', 'LTSH', 'AC', 'AC', 'AC'],
        date: '25-2-20'
      }

      it("Add a new stack to the database", async (done) => {
        return request(app)
          .post(stacksUrl)
          .send(newData)
          .then((res) => {
            expect(res.status).toEqual(201)
            expect(res.body.addedStack.stackId).toEqual(newData.stackId)
            done()
          })
      })
    })

  })

})