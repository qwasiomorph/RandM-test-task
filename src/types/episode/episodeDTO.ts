import { IInfo } from "../info";

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface IEpisodeList {
  info: IInfo;
  results: IEpisode[];
}
