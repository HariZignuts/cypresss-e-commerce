import { faker } from "@faker-js/faker";

export class TestUtils {
  static generateRandomUserData() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };
  }
}
