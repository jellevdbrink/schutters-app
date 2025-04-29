import { Team } from './team';

export type RankingEntry = {
  field: number;

  ranking: Ranking[];
};

export type Ranking = {
  team: Team;
  team_number: number;

  wins: number;
  draws: number;
  loses: number;
  goals: number;
  points: number;
};
