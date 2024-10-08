// import { NewEntity } from '../index';
import { ITeam } from './ITeam';

export interface ITeamModel {
  // create(data: Partial<ITeam>): Promise<NewEntity<ITeam>>,
  findAll(): Promise<ITeam[]>,
  // update(id: ITeam['id'], data: Partial<NewEntity<ITeam>>): Promise<ITeam | null>,
  findById(id: ITeam['id']): Promise<ITeam | null>,
  // delete(id: ITeam['id']): Promise<number>,
}
