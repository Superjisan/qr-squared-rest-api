const ingredient = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('ingredient', {
    category: DataTypes.STRING,
    qty: {
        type: DataTypes.FLOAT,
        validate: {notEmpty: true}
    }
  });

  Ingredient.associate = models => {
    Ingredient.hasOne(models.Item, {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT',
      foreignKey: {
        allowNull: false,
      },
    });

    Ingredient.hasMany(models.Item, {
        as: "substituteItem",
        foreignKey: "substitute_item_key"
    })

    Ingredient.hasOne(models.UOM, {
        onDelete: 'RESTRICT'
    });

    Ingredient.belongsTo(models.Recipe);
    Ingredient.belongsToMany(models.Instruction, {through: "InstructionIngredient"});

  };

  return Ingredient;
};

export default ingredient;
