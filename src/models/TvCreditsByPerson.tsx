import type { CastTvCredits } from "./CastTvCredits";
import type { CrewTvCredits } from "./CrewTvCredits";

export interface TvCreditsByPerson {
  id: number;
  cast: CastTvCredits[]; // movie details and roll for the cast member
  crew: CrewTvCredits[]; // movie details and roll for the crew member
}
