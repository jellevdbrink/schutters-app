import { Team } from "./team";

export type Game = {
  id: number;
  round_index: number;
  poule_id: number;

  team1: Team;
  team2: Team;
  start_date: Date;

  score_1: number;
  score_2: number;

  field: string;
}

export type KOGame = Game & {
  round_id: number;
  next_game_winner_id: number;
  next_game_loser_id: number;
}
