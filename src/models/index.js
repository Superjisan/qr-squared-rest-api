import Sequelize from 'sequelize';

let sequelize;
if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD, {
    host: `/cloudsql/${process.CLOUD_SQL_CONNECTION_NAME}`,
    dialect: 'postgres',
  });
} else {
  sequelize = new Sequelize(
    process.env.TEST_DATABASE || process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'postgres'
    },
  );
}

const models = {
  User: sequelize.import('./user'),
  Item: sequelize.import('./item'),
  UOM: sequelize.import('./uom'),
  Ingredient: sequelize.import('./ingredient'),
  Instruction: sequelize.import("./instruction"),
  Recipe: sequelize.import("./recipe")
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
