// Importamos los módulos necesarios, incluyendo chai
import mongoose from 'mongoose'
import Users from '../dao/Users.dao.js'
import chai from 'chai'

// Nuestro expect será manejado con sintaxis de chai
const expect = chai.expect
const connection = mongoose.connect('mongodb://localhost:27017/coder51220')
const testUser = { first_name: 'Coder', last_name: 'House', email: 'coder51220@gmail.com', password: 'abc123'}

describe('Testing de Users.dao.js', () => {
    // before se ejecuta ANTES DEL PRIMER TEST de la lista
    before(function () {
        this.user = new Users()
    })

    // beforeEach se ejecuta ANTES DE CADA TEST
    beforeEach(function () {
        // Limpiamos los registros en la colección, para que cada test inicie desde cero
        mongoose.connection.collections.users_adoptmes.drop()
        this.timeout(5000)
    })

    // Test 1
    it('debe obtener los usuarios como array', async function () {
        const result = await this.user.get()
        // Es habitual que podamos expresar un test de distintas maneras
        // expect(result).deep.equals([])
        // expect(result).to.be.a('array')
        expect(Array.isArray(result)).equals(true)
    })

    // Test 2
    it('debe cargar un nuevo usuario', async function () {
        const result = await this.user.save(testUser)
        // Podemos ver que la expresión con sintaxis chai es más intuitiva
        expect(result._id).to.be.a('object')
    })

    // Test 3
    it('debe agregar un array vacío de mascotas al usuario', async function () {
        const result = await this.user.save(testUser)
        // Podemos ver que la expresión con sintaxis chai es más intuitiva
        expect(result.pets).to.be.a('array')
    })

    // Test 4
    it('debe obtener un usuario indicando su email', async function () {
        const result = await this.user.save(testUser)
        const user = await this.user.getBy({ email: result.email })
        // Podemos ver que la expresión con sintaxis chai es más intuitiva
        expect(user).to.be.a('object')
    })

    // Test 5
    it('debe borrar un usuario indicando su id', async function () {
        const result = await this.user.save(testUser)
        const deletedUser = await this.user.delete(result._id)
        // Podemos ver que la expresión con sintaxis chai es más intuitiva
        expect(deletedUser).to.be.a('object')
    })
})