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



describe('Nnenna Textiles API',() => {
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
      it("Returns same number of entries seeded", async (done) => {
        const seededStacks = seedResults.createdStacks
        return request(app)
          .get(stacksUrl)
          .then((response) => {
            expect(response.status).toEqual(200)
            expect(response.body.stacks).toHaveLength(seededStacks.length)
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
      
      const newStack = {
        stackId: '496',
        content: ['ATS', 'ATS', 'ATS', 'LTS', 'LTS', 'LTS', 'LTSH', 'LTSH', 'LTSH', 'AC', 'AC', 'AC'],
        date: new Date()
      }

      it("Retrieves newly added stack", async (done) => {
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
            
            done()
          })
      })
      it('Checks that number of Items in DB larger by one item', async (done) => {
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
            done()
          })
        })
      })
    })
    describe('DELETE /stacks', () => {
      it('Checks that number of stack has reduced', async(done) => {
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
            done()

          })
        })
      })
      it('Removes multiple stacks', async (done) => {
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
            done()
            
          })
        })
      })
    })
  })
  describe("/containers endpoints", () => {
    const containersUrl = '/api/containers/'
    describe('GET /containers', () => {
      it('Return same number of entries seeded', async(done) => {
        const seededContainers = seedResults.createdContainers
        return request(app)
        .get(containersUrl)
        .then((response) => {
          expect(response.status).toEqual(200)
          expect(response.body.containers).toHaveLength(seededContainers.length)
          done()
        })
      })
      it('Returns container by their seal number ', async(done) => {
        const urlSuffix = 'EU18786766'
        return request(app)
        .get(`${containersUrl}seal-num/${urlSuffix}`)
        .then((response) => {
          expect(response.status).toEqual(200)
          expect(response.body[urlSuffix].sealNumber).toEqual(urlSuffix)
          done()
        })

      })
      it('Returns container by their container number', async(done) => {
        const urlSuffix = "MSCU 5681388"
        return request(app)
        .get(`${containersUrl}box-num/${urlSuffix}`)
        .then((response) => {
          expect(response.status).toEqual(200)
          expect(response.body[urlSuffix].containerNumber).toEqual(urlSuffix)
          done()
        })
      })
    })
    describe('POST /containers',() => {
      const newContainer= require('../seed/testData/container_to_add.json')
      it('Checks that number of containers in DB has grown by one item', async (done) => {
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
            done()
          })
        })
      })
    })
  })
  describe("/products endpoints", () => {
    const productsUrl = '/api/products'
    describe('GET /products', () => {
      it("Returns Object with all of the products", async (done) => {
        return request(app)
        .get(productsUrl)
        .then((response) => {
          expect(response.status).toEqual(200)
          expect(response.body.products).toStrictEqual(products)
          done()
        })
      })
    })
  })
})