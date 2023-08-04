import { faker } from "@faker-js/faker";

const daysList = {
  MO: "L",
  TU: "M",
  WE: "X",
  TH: "J",
  FR: "V",
  SA: "S",
  SU: "D"
};

const getRandomDays = () => {
  const allDays = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  const numberOfRandomDays = Math.floor(Math.random() * allDays.length) + 1;
  const randomDays = [];

  for (let i = 0; i < numberOfRandomDays; i++) {
    const randomIndex = Math.floor(Math.random() * allDays.length);
    randomDays.push(allDays[randomIndex]);
    allDays.splice(randomIndex, 1);
  }

  return randomDays;
};

const ACTIVE_DAYS = (arrayOfDays) => {
  const activeDaysArray = arrayOfDays.map((day) => daysList[day]);
  return activeDaysArray.sort((a, b) => {
    const order = { L: 1, M: 2, X: 3, J: 4, V: 5, S: 6, D: 7 };
    return order[a] - order[b];
  });
};

// Example usage:

export const CATALOG_DATA = [];

export function createRandomUser() {
  const category = faker.commerce.department();
  return {
    image: faker.image.unsplash.imageUrl(null, null, category, category),
    discount: faker.finance.amount(10, 30, 0),
    date: ACTIVE_DAYS(getRandomDays()),
    category: category,
    endDate: "30/09"
  };
}

Array.from({ length: 10 }).forEach(() => {
  CATALOG_DATA.push(createRandomUser());
});
