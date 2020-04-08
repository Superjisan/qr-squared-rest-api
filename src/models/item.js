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

  Item.associate = models => {
    Item.hasMany(models.Ingredient)
  }

  return Item;
};

export default item;
