import { Activity } from "./activity";

export interface List {
  id: string;
  title: string;
  activities: Activity[];
}

export interface ListName {
  id: string;
  title: string;
}
