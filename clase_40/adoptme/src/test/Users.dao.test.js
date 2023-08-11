// Importamos los módulos necesarios, incluyendo assert
import mongoose from 'mongoose'
import Users from '../dao/Users.dao.js'
import Assert from 'assert'

// Utilizamos la base estricta de assert para elaborar los enunciados en los tests
const assert = Assert.strict
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
        // Esperamos que el resultado sea estrictamente un array
        assert.strictEqual(Array.isArray(result), true)
    })

    // Test 2
    it('debe cargar un nuevo usuario', async function () {
        const result = await this.user.save(testUser)
        // Esperamos que el resultado incluya un _id, lo cual indica que se creó un nuevo usuario
        assert.ok(result._id)
    })

    // Test 3
    it('debe agregar un array vacío de mascotas al usuario', async function () {
        const result = await this.user.save(testUser)
        // Revisamos internamente el objeto, esperando que su elemento pets sea un array
        assert.deepStrictEqual(result.pets, [])
    })

    // Test 4
    it('debe obtener un usuario indicando su email', async function () {
        const result = await this.user.save(testUser)
        const user = await this.user.getBy({ email: result.email })
        // Esperamos que el user devuelto sea un objeto, esto indica que la solicitud filtrando por mail ha funcionado
        assert.strictEqual(typeof user, 'object')
    })
})