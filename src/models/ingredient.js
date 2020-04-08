const ingredient = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('ingredient', {
    category: DataTypes.STRING,
    qty: {
        type: DataTypes.FLOAT,
        validate: {notEmpty: true}
    }
  });

  Ingredient.associate = models => {
    Ingredient.belongsTo(models.Item);
    

    Ingredient.hasMany(models.Item, {
        as: "substituteItem",
        foreignKey: "substitute_item_key",
        constraints: false
    })

    Ingredient.belongsTo(models.UOM);

    Ingredient.belongsTo(models.Recipe);
    Ingredient.belongsToMany(models.Instruction, {through: "InstructionIngredient"});

  };

  return Ingredient;
};

export default ingredient;
