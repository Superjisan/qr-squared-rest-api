const instruction = (sequelize, DataTypes) => {
  const Instruction = sequelize.define('instruction', {
    text: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
      }
    },
    textIngredients: {
        type: DataTypes.ARRAY(DataTypes.JSON)
    },
    textTimes: {
        type: DataTypes.ARRAY(DataTypes.JSON)
    },
    category: DataTypes.STRING
  });

  Instruction.associate = models => {
    Instruction.belongsToMany(models.Ingredient, {through: "InstructionIngredient"} );
    Instruction.belongsTo(models.Recipe)
  };

  return Instruction;
};

export default instruction;
