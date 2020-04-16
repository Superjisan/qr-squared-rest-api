import 'dotenv/config';

import models, { sequelize } from '../models';

// sequelize
//   .sync({
//     force: true,
//   })
//   .then(async () => {
//     const users = await createUsers();
    
//     const recipe1 = await models.Recipe.create({
//         authorId: users.user1.id,
//         name: "Chicken Curry Instant Pot",
//         cookingTime: "35 min",
//         category: "Instant Pot",
//         instructions: [
//           {text: "Marinate the Chicken"}
//         ]
//       }, {
//         include: [models.Instruction, {model: models.User, as: "author"}],
//       })
    
//     await models.Ingredient.create({
//       recipeId: recipe1.id,
//       item: {
//         name: "chicken"
//       },
//       uom: {
//         name: "pound",
//         alias: "lb"
//       },
//       qty: 2
//     }, {include: [models.Item, models.UOM]})
    
//   });

// sequelize.sync().then(createIngredient)

const createIngredient = async () => {
  const ingredient1 = models.Ingredient.create({
    recipeId: 2,
    item: {id: 1},
    uomId: 1,
    qty: 4
  }, {include: [models.Item]})
}

const createUsers = async () => {
  const user1 = await models.User.create({
    username: 'jzaman',
    email: 'jzthegreat@gmail.com',
    password: 'blahblahblah',
    role: 'ADMIN',
  });

  const user2 = await models.User.create({
    username: 'anortman',
    email: 'anortman87@gmail.com',
    password: 'blahblahblah',
    role: 'ADMIN',
  });

  return {user1, user2}
};