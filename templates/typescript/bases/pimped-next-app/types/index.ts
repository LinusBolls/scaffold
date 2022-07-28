interface BaseItem {
  id: number;
  parent: number | null;
  name: string;
}
interface Folder extends BaseItem {
  type: "folder";
  children: number[];
}
interface Trip extends BaseItem {
  type: "trip";
  children: number[];
}
interface Stop extends BaseItem {
  type: "stop";
  eta: Date;
  etd: Date;
}
interface ConnectionStop {
  name: string;
  country: string;
  address: string;
  interrailId: string;
  time: number;
}
interface Connection extends BaseItem {
  type: "connection";
  from: ConnectionStop;
  to: ConnectionStop;
}
type ItemType = Folder | Trip | Stop | Connection;

export type { BaseItem, Folder, Trip, Stop, Connection, ItemType };
