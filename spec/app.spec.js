/**
* @jest-environment node
*/

require('custom-env').env('testing')
const app = require('../app.js')
const  request  = require('supertest')
const { seedDB } = require('../seed/seed.js')
const stackData = require('../seed/testData/stacks.json')
const containerData = require('../seed/testData/containers.json')
const products = require('../products.json')
const {checkForPlaceholder} = require('./testUtils.js')



describe('Kinrich API',() => {
  let seedResults;

  beforeAll(() => {
    return seedDB({stackData, containerData})
    .then((result) => {
      return seedResults = result
    })
  })

  beforeEach(() => {
    return seedDB({stackData, containerData})
    .then((result) => {
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
      it("Returns same number of entries seeded", async () => {
        const seededStacks = seedResults.createdStacks
        return request(app)
          .get(stacksUrl)
          .then((response) => {
            expect(response.status).toEqual(200)
            expect(response.body.stacks).toHaveLength(seededStacks.length)
            
          })
      })
      it("Returns Genuine DB entries", async () => {
        return request(app)
          .get(stacksUrl)
          .then((response) => {
            expect(response.status).toEqual(200)
            expect(response.body.stacks[0]).toHaveProperty("_id")
          })
      })
      it("Should not return the placeholder stack", async () => {
        return request(app)
        .get(stacksUrl)
        .then((response) => {
          const {status, body} = response
          expect(status).toEqual(200)
          expect(checkForPlaceholder(body.stacks)).toBe(false)
        })
      })
      it("lastEdited should match placeholder", async () => {
        const latestPlaceholder = {
          stackId: '@',
          content: [],
          date: '9999-12-31T00:00:00.000Z'
        }
        return request(app)
        .post(stacksUrl)
        .send({newStack: latestPlaceholder})
        .then((firstResponse) => {
          expect(firstResponse.status).toEqual(201)
          return request(app)
          .get(stacksUrl)
          .then((secondResponse) => {
            const {status, body} = secondResponse        
            expect(status).toEqual(200)
            expect(body).toHaveProperty("lastEdited")
            expect(body.lastEdited).toBe(latestPlaceholder.date)
            expect(checkForPlaceholder(body.stacks)).toBe(false)
          })
        })
      })
    })
    describe("POST /stacks", () => {
      
      const newStack = {
        stackId: '496',
        content: ['ATS', 'ATS', 'ATS', 'LTS', 'LTS', 'LTS', 'LTSH', 'LTSH', 'LTSH', 'AC', 'AC', 'AC'],
        date: new Date().toISOString()
      }

      it("Retrieves newly added stack", async () => {
        return request(app)
          .post(stacksUrl)
          .send({newStack})
          .then((res) => {
            const { createdStack } = res.body
            expect(res.status).toEqual(201)
            expect(createdStack).toHaveProperty('stackId')
            expect(createdStack).toHaveProperty('content')
            expect(createdStack).toHaveProperty('date')
            expect(createdStack.stackId).toEqual(newStack.stackId)
            expect(createdStack.content).toEqual(expect.arrayContaining(newStack.content))          
          })
      })
      it('Checks that number of Items in DB larger by one item', async () => {
        const seededStacks = seedResults.createdStacks
        return request(app)
        .post(stacksUrl)
        .send({newStack})
        .then((firstResponse) => {
          expect(firstResponse.status).toEqual(201)
          return request(app)
          .get(stacksUrl)
          .then((secondResponse) => {
            expect(secondResponse.status).toEqual(200)
            expect(secondResponse.body.stacks.length).toEqual(seededStacks.length + 1)          
          })
        })
      })
    })
    describe('DELETE /stacks', () => {
      it('Checks that number of stack has reduced', async() => {
        const usedCodes = ['789']
        const seededStacks = seedResults.createdStacks
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
            .toEqual(seededStacks.length - 1)
          })
        })
      })
      it('Removes multiple stacks', async () => {
        const usedCodes = ['123', '321']
        const seededStacks = seedResults.createdStacks
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
            .toEqual(seededStacks.length - 2)
          })
        })
      })
    })
  })
  describe("/containers endpoints", () => {
    const containersUrl = '/api/containers/'
    describe('GET /containers', () => {
      it('Return same number of entries seeded', async() => {
        const seededContainers = seedResults.createdContainers
        return request(app)
        .get(containersUrl)
        .then((response) => {
          expect(response.status).toEqual(200)
          expect(response.body.containers).toHaveLength(seededContainers.length)
        })
      })
      it('Returns container by their seal number ', async() => {
        const urlSuffix = 'EU18786766'
        return request(app)
        .get(`${containersUrl}seal-num/${urlSuffix}`)
        .then((response) => {
          expect(response.status).toEqual(200)
          expect(response.body[urlSuffix].sealNumber).toEqual(urlSuffix)
        })

      })
      it('Returns container by their container number', async() => {
        const urlSuffix = "MSCU 5681388"
        return request(app)
        .get(`${containersUrl}box-num/${urlSuffix}`)
        .then((response) => {
          expect(response.status).toEqual(200)
          expect(response.body[urlSuffix].containerNumber).toEqual(urlSuffix)
        })
      })
    })
    describe('POST /containers',() => {
      const newContainer= require('../seed/testData/container_to_add.json')
      it('Checks that number of containers in DB has grown by one item', async () => {
        const seededContainers = seedResults.createdContainers
        return request(app)
        .post(containersUrl)
        .send({newContainer})
        .then((firstResponse) => {
          expect(firstResponse.status).toEqual(201)
          return request(app)
          .get(containersUrl)
          .then((secondResponse) => {
            expect(secondResponse.body.containers).toHaveLength(seededContainers.length + 1)
          })
        })
      })
    })
  })
  describe("/products endpoints", () => {
    const productsUrl = '/api/products'
    describe('GET /products', () => {
      it("Returns Object with all of the products", async () => {
        return request(app)
        .get(productsUrl)
        .then((response) => {
          expect(response.status).toEqual(200)
          expect(response.body.products).toStrictEqual(products)
        })
      })
    })
  })
  describe("Error Handling", () => {
    describe("404 - Not Found", () => {
      const invalidUrl = "/app/shoes"
      it("Responds with 404 and 'Not Found' message", async () => {
        return request(app)
        .get(invalidUrl)
        .then((response) => {        
          expect(response.status).toEqual(404)
          expect(response.notFound).toBe(true)          
        })
      })

    })
  })
})