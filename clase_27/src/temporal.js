class Person {
    static #k1 = 0.15;

    constructor(name, salary, gender) {
        this.name = name;
        this.base_salary = salary;
        this.gender = gender;
    }

    getSalary() {
        return this.base_salary * (1 + Person.#k1);
    }
}


const person1 = new Person('Carlos Perren', 100000, 'M');
const person2 = new Person('Juan Perez', 200000, 'M');

console.log(person1, person1.getSalary());
console.log(person2, person2.getSalary());