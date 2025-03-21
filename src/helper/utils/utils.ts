import { faker } from '@faker-js/faker';

export const generateRandomFirstName = () => {
    return faker.person.firstName();
};

export const generateRandomLastName = () => {
    return faker.person.lastName();
};

export const generateRandomEmail = () => {
    return faker.internet.email();
};

export const generateRandomPhoneNumber = () => {
    return faker.phone.number({ style: 'national' });
};

export const generateRandomZipCode = () => {
    return faker.location.zipCode('#####');
};