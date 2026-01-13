export interface Credits {
  movieId: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  id: number;
  name: string;
  profile_path: string;
}

export interface CrewMember {
  id: number;
  name: string;
  department: string;
  job: string;
  profile_path: string;
}
