import userDTO from '../dto/User.dto.js'
import chai from 'chai'

const expect = chai.expect

describe('Testing de User.dto.js', () => {
    // Test 1
    it('debe unificar nombre y apellido', async function () {
        const user = { first_name: 'Coder', last_name: 'House', role: 'academy', email: 'coderhouse@gmail.com' }
        const userDto = userDTO.getUserTokenFrom(user);
        // Esperamos que el resultado devuelva un name formado por first_name y last_name concatenados
        expect(userDto.name).to.be.eql(`${user.first_name} ${user.last_name}`)
    })

    // Test 2
    it('debe filtrar campos sensibles (password)', async function () {
        const user = { first_name: 'Coder', last_name: 'House', role: 'academy', email: 'coderhouse@gmail.com', password: 'abc123' }
        const userDto = userDTO.getUserTokenFrom(user);
        // Esperamos que el objeto retornado no incluya una propiedad password
        expect(userDto).not.to.haveOwnProperty('password')
    })
})