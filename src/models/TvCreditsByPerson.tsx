import type { CastTvCredits } from "./CastTvCredits";
import type { CrewTvCredits } from "./CrewTvCredits";

export interface TvCreditsByPerson {
  id: number;
  cast: CastTvCredits[]; // tv details and roll for the cast member
  crew: CrewTvCredits[]; // tv details and roll for the crew member
}
