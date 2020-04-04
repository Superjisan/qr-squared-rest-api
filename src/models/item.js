const item = (sequelize, DataTypes) => {
  const item = sequelize.define('item', {
    name: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    },
    type: {
      type: DataTypes.STRING,
    }
  });

  return item;
};

export default item;
