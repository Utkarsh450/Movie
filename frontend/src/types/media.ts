export type MediaType = "movie" | "tv";

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface MediaSummary {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  overview?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
}

export interface SearchResult extends MediaSummary {
  media_type: MediaType | "person";
}

export interface MediaDetails extends MediaSummary {
  genres?: Genre[];
  runtime?: number;
  number_of_seasons?: number;
}
