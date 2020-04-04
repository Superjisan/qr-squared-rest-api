const item = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
    name: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    },
    type: {
      type: DataTypes.STRING,
    }
  });

  return Item;
};

export default item;
