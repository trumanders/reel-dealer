import type { CastMovieCredits } from "./CastMovieCredits";
import type { CrewMovieCredits } from "./CrewMovieCredits";

export interface MovieCreditsByPerson {
  id: number;
  cast: CastMovieCredits[]; // movie details and roll for the cast member
  crew: CrewMovieCredits[]; // movie details and roll for the crew member
}
