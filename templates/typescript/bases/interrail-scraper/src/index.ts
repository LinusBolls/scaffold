import env from "./env";

import axios from "axios";

import { parse } from "querystring";

interface StationData {
  cityName: string;
  cityId: string;

  countryName: string;
  countryId: string;

  popular: boolean;

  coordinates: { lat: number; lng: number };
}

async function getStationData(station: string) {
  const url = `https://www.interrail.eu/bin/geolocation.autosuggest.json?keyword=${station}&pagePath=%2Fcontent%2Finterrail%2Fen`;

  const res = await axios.get(url);

  return res.data[0] as StationData;
}

function getInterrailTrip() {
  // ol | ov
  // dl | dv
  // t
  // rt

  // nth trip

  `https://www.interrail.eu/en/plan-your-trip/interrail-timetable?ol=COMPIEGNE+%28FRANCE%29&ov=008727669&dl=HAMBURG+%28GERMANY%29&dv=008002710&vl=&vv=&t=1656004374828&ar=false&rt=noReservation%2C&tt=&mc=&mct=0`;
}

/* <slot:3rd-class-imports/> */

/* <slot:2nd-class-imports/> */

/* <slot:1st-class-imports/> */

/* <slot:util/> */

interface TripParams {
  ol: string; // name of city
  ov: string; // id of city
  dl: string; // name of city
  dv: string; // id of city
  t: string; // timestamp
  rt: string; // "noReservation"
}

async function fetchTrips({ ol, ov, dl, dv, t, rt }: TripParams) {
  // const iso = new Date(t / 1000).toISOString();
  // actual: 1970-01-20T04:00:04.374Z
  // expected: 2022-06-23T19:12:54.828Z

  const iso = new Date().toISOString();

  const url = `https://api.timetable.eurail.com/v2/timetable?origin=${ov}&destination=${dv}&via=&timestamp=${iso}&tripsNumber=5&arrival=false&currency=EUR&reservationType=${rt}`;

  const res = await axios.get(url);

  return res.data;
}

async function main() {
  const testUrl = `https://www.interrail.eu/en/plan-your-trip/interrail-timetable?ol=COMPIEGNE+%28FRANCE%29&ov=008727669&dl=HAMBURG+%28GERMANY%29&dv=008002710&vl=&vv=&t=1656004374828&ar=false&rt=noReservation%2C&tt=&mc=&mct=0`;

  const tripParams: TripParams = parse(testUrl);

  const trips = await fetchTrips(tripParams);

  const legs = trips[0].legs;

  const trip = toItemTrip(legs);

  console.log(trip);
}
main();

const toTitleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

function toItemConnectionStop(ding: any) {
  const { country, station, dateTimeInISO, id } = ding;

  const name = toTitleCase(station);
  const time = new Date(dateTimeInISO).getTime();

  return {
    country,
    name,
    time,
    interrailId: id,
    address: station,
  };
}

function toItemTrip(interrailTrip: any[]) {
  return interrailTrip.map((i) => ({
    from: toItemConnectionStop(i.start),
    to: toItemConnectionStop(i.end),
    type: "connection",
    name: "step",
  }));
}

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
interface Connection extends BaseItem {
  type: "connection";
}
type ItemType = Folder | Trip | Stop | Connection;

export type { BaseItem, Folder, Trip, Stop, Connection, ItemType };
