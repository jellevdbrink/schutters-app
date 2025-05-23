import { Team } from './team';

export type Poule = {
  field: number; // moet nog + 1!!!!!!

  ranking: RankingEntry[];
};

export type RankingEntry = {
  team: Team;
  team_number: number;

  wins: number;
  draws: number;
  loses: number;
  goals: number;
  points: number;
};
