import { Team } from './team';

export type Game = {
  id: number;
  round_index: number;
  poule_id: number;

  team1: Team;
  team2: Team;
  start_date: Date;

  score_1: number | null;
  score_2: number | null;

  field: string;
};

export type KOGame = Game & {
  team1: Team | null;
  team2: Team | null;

  round_id: number;
  next_game_winner_id: number | null;
  next_game_loser_id: number | null;
};
