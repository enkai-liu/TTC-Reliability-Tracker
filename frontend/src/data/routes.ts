export type TransitMode = "subway" | "light-rail" | "streetcar" | "bus";

export type Station = {
  id: string;
  name: string;
  x: number;
  y: number;
};

export type RouteDefinition = {
  id: string;
  name: string;
  mode: TransitMode;
  color: string;
  stations: Station[];
};

const line1Stations: Station[] = [
  { id: "vaughan", name: "Vaughan Metropolitan Centre", x: 356, y: 318 },
  { id: "highway-407", name: "Highway 407", x: 356, y: 392 },
  { id: "pioneer-village", name: "Pioneer Village", x: 406, y: 431 },
  { id: "york", name: "York University", x: 459, y: 474 },
  { id: "finch-west", name: "Finch West", x: 592, y: 594 },
  { id: "eglinton-west", name: "Cedarvale", x: 592, y: 753 },
  { id: "st-clair-west", name: "St Clair West", x: 637, y: 848 },
  { id: "st-george", name: "St George", x: 670, y: 918 },
  { id: "st-andrew", name: "St Andrew", x: 737, y: 1182 },
  { id: "union", name: "Union", x: 799, y: 1245 },
  { id: "king", name: "King", x: 853, y: 1180 },
  { id: "queen", name: "Queen", x: 885, y: 1086 },
  { id: "bloor-yonge", name: "Bloor-Yonge", x: 885, y: 918 },
  { id: "eglinton", name: "Eglinton", x: 885, y: 753 },
  { id: "sheppard-yonge", name: "Sheppard-Yonge", x: 885, y: 594 },
  { id: "finch", name: "Finch", x: 885, y: 516 },
];

const line2Stations: Station[] = [
  { id: "kipling", name: "Kipling", x: 200, y: 918 },
  { id: "islington", name: "Islington", x: 258, y: 918 },
  { id: "dundas-west", name: "Dundas West", x: 514, y: 918 },
  { id: "st-george", name: "St George", x: 670, y: 918 },
  { id: "bloor-yonge", name: "Bloor-Yonge", x: 885, y: 918 },
  { id: "pape", name: "Pape", x: 1050, y: 918 },
  { id: "main-street", name: "Main Street", x: 1210, y: 918 },
  { id: "warden", name: "Warden", x: 1320, y: 806 },
  { id: "kennedy", name: "Kennedy", x: 1390, y: 752 },
];

const line4Stations: Station[] = [
  { id: "sheppard-yonge", name: "Sheppard-Yonge", x: 885, y: 594 },
  { id: "bayview", name: "Bayview", x: 950, y: 594 },
  { id: "bessarion", name: "Bessarion", x: 1008, y: 594 },
  { id: "leslie", name: "Leslie", x: 1085, y: 594 },
  { id: "don-mills", name: "Don Mills", x: 1203, y: 594 },
];

const line5Stations: Station[] = [
  { id: "mount-dennis", name: "Mount Dennis", x: 270, y: 753 },
  { id: "keelesdale", name: "Keelesdale", x: 420, y: 753 },
  { id: "cedarvale", name: "Cedarvale", x: 592, y: 753 },
  { id: "eglinton", name: "Eglinton", x: 885, y: 753 },
  { id: "science-centre", name: "Science Centre", x: 1130, y: 753 },
  { id: "kennedy", name: "Kennedy", x: 1390, y: 753 },
];

const line6Stations: Station[] = [
  { id: "humber-college", name: "Humber College", x: 96, y: 516 },
  { id: "westmore", name: "Westmore", x: 120, y: 516 },
  { id: "albion", name: "Albion Grove", x: 170, y: 516 },
  { id: "finch-west", name: "Finch West", x: 592, y: 516 },
];

const streetcarBase: Station[] = [
  { id: "long-branch", name: "Long Branch Loop", x: 95, y: 1262 },
  { id: "humber-loop", name: "Humber Loop", x: 315, y: 1140 },
  { id: "dufferin-loop", name: "Dufferin Gate Loop", x: 520, y: 1138 },
  { id: "queen", name: "Queen", x: 885, y: 1086 },
  { id: "broadview", name: "Broadview", x: 980, y: 1086 },
  { id: "neville", name: "Neville Park Loop", x: 1380, y: 1090 },
];

export const routes: RouteDefinition[] = [
  { id: "1", name: "Yonge-University Line", mode: "subway", color: "#ffd200", stations: line1Stations },
  { id: "2", name: "Bloor-Danforth Line", mode: "subway", color: "#00a95c", stations: line2Stations },
  { id: "4", name: "Sheppard Line", mode: "subway", color: "#b00080", stations: line4Stations },
  { id: "5", name: "Eglinton Line", mode: "light-rail", color: "#f58220", stations: line5Stations },
  { id: "6", name: "Finch West Line", mode: "light-rail", color: "#8d9093", stations: line6Stations },
  { id: "501", name: "Queen", mode: "streetcar", color: "#e31b23", stations: streetcarBase },
  { id: "504", name: "King", mode: "streetcar", color: "#e31b23", stations: streetcarBase.slice(1, 5) },
  { id: "505", name: "Dundas", mode: "streetcar", color: "#e31b23", stations: streetcarBase.slice(1, 4) },
  { id: "506", name: "Carlton", mode: "streetcar", color: "#e31b23", stations: streetcarBase.slice(1, 4) },
  { id: "512", name: "St Clair", mode: "streetcar", color: "#e31b23", stations: [
    { id: "gunns-loop", name: "Gunns Loop", x: 410, y: 815 },
    { id: "st-clair-west", name: "St Clair West", x: 637, y: 815 },
    { id: "st-clair", name: "St Clair", x: 885, y: 815 },
  ] },
];

export const busRoutes: RouteDefinition[] = [
  { id: "7", name: "Bathurst", mode: "bus", color: "#4b5563", stations: stationList("Bathurst", ["Steeles", "Finch", "Eglinton", "Bloor", "Exhibition"]) },
  { id: "29", name: "Dufferin", mode: "bus", color: "#4b5563", stations: stationList("Dufferin", ["Wilson", "Eglinton", "Bloor", "Queen", "Exhibition"]) },
  { id: "32", name: "Eglinton West", mode: "bus", color: "#4b5563", stations: stationList("Eglinton West", ["Renforth", "Jane", "Cedarvale", "Eglinton"]) },
  { id: "39", name: "Finch East", mode: "bus", color: "#4b5563", stations: stationList("Finch East", ["Finch", "Leslie", "Don Mills", "Neilson"]) },
  { id: "52", name: "Lawrence West", mode: "bus", color: "#4b5563", stations: stationList("Lawrence West", ["Pearson Airport", "Lawrence West", "Lawrence", "Sunnybrook"]) },
  { id: "85", name: "Sheppard East", mode: "bus", color: "#4b5563", stations: stationList("Sheppard East", ["Sheppard-Yonge", "Don Mills", "Agincourt", "Rouge Hill"]) },
  { id: "900", name: "Airport Express", mode: "bus", color: "#4b5563", stations: stationList("Airport Express", ["Kipling", "Pearson Airport"]) },
];

export const allRoutes = [...routes, ...busRoutes];

function stationList(prefix: string, names: string[]): Station[] {
  return names.map((name, index) => ({
    id: `${prefix}-${name}`.toLowerCase().replace(/\s+/g, "-"),
    name,
    x: 100 + index * 100,
    y: 100 + index * 30,
  }));
}
