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
      it("Returns Genuine DB entries", async (done) => {
        return request(app)
          .get(stacksUrl)
          .then((response) => {
            expect(response.status).toEqual(200)
            expect(response.body.stacks[0]).toHaveProperty("_id")
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

      it("Retrieves newly added stack", async (done) => {
        return request(app)
          .post(stacksUrl)
          .send(newData)
          .then((res) => {
            expect(res.status).toEqual(201)
            expect(res.body.addedStack.stackId).toEqual(newData.stackId)
            done()
          })
      })
      it.skip('Checks that number of Items in DB larger by one item', () => {})
    })
    describe('DELETE /stacks', () => {
      it('Checks that number of stack has reduced', async(done) => {
        const usedCodes = ['789']

        return request(app)
        .delete(stacksUrl)
        .send({usedCodes})
        .then((firstResponse) => {
          expect(firstResponse.status).toEqual(200)
          return request(app)
          .get(stacksUrl)
          .then((secondResponse) => {
            expect(secondResponse.status).toEqual(200)
            expect(secondResponse.body.stacks.length)
            .toEqual(seedResults.length - 1)
            done()

          })
        })
      })
      it('Removes multiple stacks', async (done) => {
        const usedCodes = ['123', '321']
        return request(app)
        .delete(stacksUrl)
        .send({usedCodes})
        .then((firstResponse) => {
          expect(firstResponse.status).toEqual(200)
          return request(app)
          .get(stacksUrl)
          .then((secondResponse) => {
            expect(secondResponse.status).toEqual(200)
            expect(secondResponse.body.stacks.length)
            .toEqual(seedResults.length - 2)
            done()
            
          })
        })
      })
    })
  })

})