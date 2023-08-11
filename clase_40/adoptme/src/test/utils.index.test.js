import { createHash, passwordValidation } from '../utils/index.js'
import chai from 'chai'

const expect = chai.expect

describe('Testing de utils.index.js', () => {
    before(function () {
        this.pass = 'abc123'
    })

    // Test 1
    it('debe hashear la clave original correctamente', async function () {
        const hashed = await createHash(this.pass)
        const valid_format = /^\$2[aby]\$10\$.{53}$/
        // Match nos permite evaluar expresiones regulares en el test
        // Esperamos que hashed tenga un formato válido
        expect(hashed).to.match(valid_format)
    })

    // Test 2
    it('debe comparar a true si la clave es correcta', async function () {
        const hashed = await createHash(this.pass)
        const compared = await passwordValidation({ password: hashed }, this.pass)
        expect(compared).to.be.true
    })

    // Test 3
    it('debe comparar a false si la clave se altera', async function () {
        const hashed = await createHash(this.pass)
        const compared = await passwordValidation({ password: hashed }, 'otra_clave')
        expect(compared).to.be.false
    })
})