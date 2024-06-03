import { IInfo } from "../info";

export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface ILocationList {
  info: IInfo;
  results: ILocation[];
}
