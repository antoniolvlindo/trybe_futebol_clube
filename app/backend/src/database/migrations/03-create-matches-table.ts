import { Model, QueryInterface, DataTypes } from 'sequelize';
import { IMatches } from '../../Interfaces/matches/IMatches';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatches>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        field: 'home_team_id',
        allowNull: false,
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        field: 'home_team_goals',
        allowNull: false,
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        field: 'away_team_id',
        allowNull: false,
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        field: 'away_team_goals',
        allowNull: false,
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        field: 'in_progress',
        allowNull: false,
      },
    },);
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
}