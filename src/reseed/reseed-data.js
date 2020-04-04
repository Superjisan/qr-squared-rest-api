import 'dotenv/config';

import models, { sequelize } from '../models';

sequelize
  .sync({
    force: true,
  })
  .then(async () => {
    createUsers();
  });

const createUsers = async () => {
  await models.User.create({
    username: 'jzaman',
    email: 'jzthegreat@gmail.com',
    password: 'blahblahblah',
    role: 'ADMIN'
  });

  await models.User.create({
    username: 'anortman',
    email: 'anortman87@gmail.com',
    password: 'blahblahblah',
    role: 'ADMIN',
  });
};