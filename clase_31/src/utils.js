/**
 * https://github.com/faker-js/faker
 * Faker es un módulo muy práctico que nos permite generar datos mock (simulados) para pruebas.
 * En este ejemplo retornamos un objeto de usuario con 14 campos, todos generados por Faker,
 * incluyendo un array de productos
 * 
 * Para una lista completa de objetos disponibles, visitar:
 * https://fakerjs.dev/api/
 */

import { Faker, en } from '@faker-js/faker';

const faker = new Faker({ locale: [en] })

export const generateUser = () => {
    let products = [];
    const productsQty = parseInt(faker.number.int(20));
    for (let i = 0; i < productsQty; i++) { products.push(generateProduct()); }

    const role = parseInt(faker.number.int(1)) === 1 ? 'client': 'seller';

    return {
        id: faker.database.mongodbObjectId(),
        code: faker.string.alphanumeric(8),
        name: faker.person.firstName(),
        last_name: faker.person.lastName,
        sex: faker.person.sex(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        image: faker.image.avatar(),
        email: faker.internet.email(),
        role: role,
        premium: faker.datatype.boolean(),
        current_job: faker.person.jobType(),
        zodiac_sign: faker.person.zodiacSign(),
        products: products
    }
}

export const generateProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        stock: faker.number.int(50),
        image: faker.image.urlLoremFlickr(),
        description: faker.commerce.productDescription()
    }
}