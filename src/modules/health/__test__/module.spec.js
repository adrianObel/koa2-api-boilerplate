import app from 'server'
import supertest from 'supertest'
import pkg from 'pkg'

const request = supertest.agent(app.listen())

describe('(Module) health', () => {
  describe('GET /health', () => {
    it('should return 200 response and version', async () => {
      const res = await request
        .get('/health')
        .set('Accept', 'application/json')
        .expect(200)

      const { version } = res.body

      expect(version).toBe(pkg.version)
    })
  })
})
