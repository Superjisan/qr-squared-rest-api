const recipe = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('recipe', {
    name: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
      },
    },
    cookingTime: DataTypes.STRING,
    category: DataTypes.STRING,
    notes: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
    originUrl: DataTypes.STRING,
    originText: DataTypes.TEXT,
  });

  Recipe.associate = models => {
    Recipe.belongsTo(models.User, {
      as: 'author'
    });
    Recipe.hasMany(models.Ingredient);
    Recipe.hasMany(models.Instruction);
  };

  return Recipe;
};

export default recipe;
