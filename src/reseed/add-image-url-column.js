import 'dotenv/config';

import { DataTypes } from 'sequelize';
import { sequelize } from '../models';

const queryInterface = sequelize.getQueryInterface();

queryInterface.addColumn('recipes', 'imageUrl', {
  type: DataTypes.STRING
});
