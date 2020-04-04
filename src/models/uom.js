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

  return UOM;
};

export default uom;
