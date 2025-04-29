import { Player } from './player';

export type Team = {
  id: number;
  team_number: number;
  tournament_id: number;

  player_1: Player;
  player_2: Player;

  // present: boolean;
  debt: number;

  isFavorite: boolean;
  name: string; //Virtual name for team label
};

export function getTeamLabel(team: Team): string {
  return `${team.team_number} - ${team.player_1.name} & ${team.player_2.name}`;
}
