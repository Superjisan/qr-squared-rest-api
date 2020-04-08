const uom = (sequelize, DataTypes) => {
  const UOM = sequelize.define('uom', {
    name: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    },
    alias: {
      type: DataTypes.STRING,
    },
  });

  UOM.associate = models => {
    UOM.hasMany(models.Ingredient, {
      constraints: false
    })
  }

  return UOM;
};

export default uom;
