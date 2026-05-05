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
  pathD?: string;
  stations: Station[];
};

const line1Stations: Station[] = [
  { id: "vaughan-metropolitan-centre", name: "Vaughan Metropolitan Centre", x: 396.61664, y: 287.64154 },
  { id: "highway-407", name: "Highway 407", x: 397.34137, y: 329.35193 },
  { id: "pioneer-village", name: "Pioneer Village", x: 426.77228, y: 359.03961 },
  { id: "york-university", name: "York University", x: 461.77228, y: 394.03961 },
  { id: "downsview-park", name: "Downsview Park", x: 531.77228, y: 464.03961 },
  { id: "sheppard-west", name: "Sheppard West", x: 566.77228, y: 499.03961 },
  { id: "wilson", name: "Wilson", x: 566.77228, y: 569.03961 },
  { id: "yorkdale", name: "Yorkdale", x: 566.77228, y: 639.03961 },
  { id: "lawrence-west", name: "Lawrence West", x: 566.77228, y: 709.03961 },
  { id: "glencairn", name: "Glencairn", x: 566.77228, y: 779.03961 },
  { id: "st-clair-west", name: "St Clair West", x: 646.50806, y: 913.75452 },
  { id: "dupont", name: "Dupont", x: 695.90155, y: 968.85522 },
  { id: "st-george", name: "St George", x: 756.50267, y: 1017.0005 },
  { id: "museum", name: "Museum", x: 756.77228, y: 1079.0396 },
  { id: "queens-park", name: "Queen's Park", x: 756.77228, y: 1129.0396 },
  { id: "st-patrick", name: "St Patrick", x: 756.77228, y: 1179.0396 },
  { id: "osgoode", name: "Osgoode", x: 756.77228, y: 1229.0396 },
  { id: "st-andrew", name: "St Andrew", x: 756.77228, y: 1279.0396 },
  { id: "union", name: "Union", x: 806.77228, y: 1359.0396 },
  { id: "king", name: "King", x: 856.77222, y: 1279.0396 },
  { id: "queen", name: "Queen", x: 856.77222, y: 1229.0396 },
  { id: "dundas", name: "Dundas", x: 856.77222, y: 1179.0396 },
  { id: "college", name: "College", x: 856.77222, y: 1129.0396 },
  { id: "wellesley", name: "Wellesley", x: 856.77222, y: 1079.03961 },
  { id: "bloor-yonge", name: "Bloor-Yonge", x: 856.77222, y: 1029.0396 },
  { id: "rosedale", name: "Rosedale", x: 856.77222, y: 981.03961 },
  { id: "summerhill", name: "Summerhill", x: 856.77222, y: 933.03961 },
  { id: "st-clair", name: "St Clair", x: 856.77222, y: 885.03961 },
  { id: "davisville", name: "Davisville", x: 856.77222, y: 799.03961 },
  { id: "lawrence", name: "Lawrence", x: 856.77222, y: 715.03961 },
  { id: "york-mills", name: "York Mills", x: 856.77222, y: 652.03961 },
  { id: "north-york-centre", name: "North York Centre", x: 856.77222, y: 529.03961 },
  { id: "finch", name: "Finch", x: 856.77222, y: 469.03961 },
];

const line2Stations: Station[] = [
  { id: "kipling", name: "Kipling", x: 116.77228, y: 1029.0396 },
  { id: "islington", name: "Islington", x: 156.77228, y: 1029.0396 },
  { id: "royal-york", name: "Royal York", x: 196.77228, y: 1029.0396 },
  { id: "old-mill", name: "Old Mill", x: 236.77228, y: 1029.0396 },
  { id: "jane", name: "Jane", x: 276.77228, y: 1029.0396 },
  { id: "runnymede", name: "Runnymede", x: 316.77228, y: 1029.0396 },
  { id: "high-park", name: "High Park", x: 356.77228, y: 1029.0396 },
  { id: "keele", name: "Keele", x: 396.77228, y: 1029.0396 },
  { id: "dundas-west", name: "Dundas West", x: 436.77228, y: 1029.0396 },
  { id: "lansdowne", name: "Lansdowne", x: 476.77228, y: 1029.0396 },
  { id: "dufferin", name: "Dufferin", x: 516.77228, y: 1029.0396 },
  { id: "ossington", name: "Ossington", x: 556.77228, y: 1029.0396 },
  { id: "christie", name: "Christie", x: 596.77228, y: 1029.0396 },
  { id: "bathurst", name: "Bathurst", x: 636.77228, y: 1029.0396 },
  { id: "st-george", name: "St George", x: 756.50267, y: 1017.0005 },
  { id: "bay", name: "Bay", x: 806.77228, y: 1029.0396 },
  { id: "bloor-yonge", name: "Bloor-Yonge", x: 856.77222, y: 1029.0396 },
  { id: "sherbourne", name: "Sherbourne", x: 906.77222, y: 1029.0396 },
  { id: "castle-frank", name: "Castle Frank", x: 956.77222, y: 1029.0396 },
  { id: "broadview", name: "Broadview", x: 1006.7722, y: 1029.0396 },
  { id: "chester", name: "Chester", x: 1056.7722, y: 1029.0396 },
  { id: "pape", name: "Pape", x: 1106.7722, y: 1029.0396 },
  { id: "donlands", name: "Donlands", x: 1156.7722, y: 1029.0396 },
  { id: "greenwood", name: "Greenwood", x: 1202.7722, y: 1029.0396 },
  { id: "coxwell", name: "Coxwell", x: 1246.7722, y: 1029.0396 },
  { id: "woodbine", name: "Woodbine", x: 1286.7722, y: 1029.0396 },
  { id: "main-street", name: "Main Street", x: 1326.7722, y: 1029.0396 },
  { id: "victoria-park", name: "Victoria Park", x: 1389.7722, y: 966.03961 },
  { id: "warden", name: "Warden", x: 1452.7722, y: 903.03961 },
  { id: "kennedy", name: "Kennedy", x: 1516.7723, y: 839.0396 },
];

const line4Stations: Station[] = [
  { id: "sheppard-yonge", name: "Sheppard-Yonge", x: 856.7723, y: 589.0396 },
  { id: "bayview", name: "Bayview", x: 946.77222, y: 589.03961 },
  { id: "bessarion", name: "Bessarion", x: 1036.7722, y: 589.03961 },
  { id: "leslie", name: "Leslie", x: 1126.7722, y: 589.03961 },
  { id: "don-mills", name: "Don Mills", x: 1216.7722, y: 589.03961 },
];

const line5Stations: Station[] = [
  { id: "mount-dennis", name: "Mount Dennis", x: 266.77228, y: 839.03961 },
  { id: "keelesdale", name: "Keelesdale", x: 316.77228, y: 839.03961 },
  { id: "caledonia", name: "Caledonia", x: 366.77228, y: 839.03961 },
  { id: "fairbank", name: "Fairbank", x: 416.77228, y: 839.03961 },
  { id: "oakwood", name: "Oakwood", x: 466.77228, y: 839.03961 },
  { id: "cedarvale", name: "Cedarvale", x: 566.77228, y: 839.03961 },
  { id: "forest-hill", name: "Forest Hill", x: 638.77228, y: 839.03961 },
  { id: "chaplin", name: "Chaplin", x: 710.77228, y: 839.03961 },
  { id: "avenue", name: "Avenue", x: 782.77228, y: 839.03961 },
  { id: "eglinton", name: "Eglinton", x: 856.77222, y: 839.03961 },
  { id: "mount-pleasant", name: "Mount Pleasant", x: 906.77222, y: 839.03961 },
  { id: "leaside", name: "Leaside", x: 951.77222, y: 839.03961 },
  { id: "laird", name: "Laird", x: 996.77222, y: 839.03961 },
  { id: "sunnybrook-park", name: "Sunnybrook Park", x: 1041.7722, y: 839.03961 },
  { id: "don-valley", name: "Don Valley", x: 1086.7722, y: 839.03961 },
  { id: "aga-khan-park", name: "Aga Khan Park", x: 1131.7722, y: 839.03961 },
  { id: "wynford", name: "Wynford", x: 1176.7722, y: 839.03961 },
  { id: "sloane", name: "Sloane", x: 1221.7722, y: 839.03961 },
  { id: "oconnor", name: "O'Connor", x: 1266.7722, y: 839.03961 },
  { id: "pharmacy", name: "Pharmacy", x: 1311.7722, y: 839.03961 },
  { id: "hakimi-lebovic", name: "Hakimi Lebovic", x: 1356.7722, y: 839.03961 },
  { id: "golden-mile", name: "Golden Mile", x: 1401.7722, y: 839.03961 },
  { id: "birchmount", name: "Birchmount", x: 1446.7722, y: 839.03961 },
  { id: "ionview", name: "Ionview", x: 1481.7722, y: 839.03961 },
  { id: "kennedy", name: "Kennedy", x: 1516.7723, y: 839.0396 },
];

const line6Stations: Station[] = [
  { id: "humber-college", name: "Humber College", x: 38.19751, y: 449.12622 },
  { id: "westmore", name: "Westmore", x: 38.936783, y: 428.62228 },
  { id: "albion", name: "Albion Grove", x: 64.158997, y: 428.70782 },
  { id: "rowntree-mills", name: "Rowntree Mills", x: 215.49234, y: 428.85635 },
  { id: "pearldale", name: "Pearldale", x: 240.71457, y: 428.85635 },
  { id: "duncanwoods", name: "Duncanwoods", x: 265.93677, y: 428.85635 },
  { id: "milvan-rumike", name: "Milvan Rumike", x: 291.159, y: 428.85635 },
  { id: "emery", name: "Emery", x: 316.38123, y: 428.85635 },
  { id: "signet-arrow", name: "Signet Arrow", x: 341.60345, y: 428.85635 },
  { id: "norfinch-oakdale", name: "Norfinch Oakdale", x: 366.82568, y: 428.85635 },
  { id: "jane-and-finch", name: "Jane and Finch", x: 392.04791, y: 428.85635 },
  { id: "driftwood", name: "Driftwood", x: 417.27008, y: 428.85635 },
  { id: "tobermory", name: "Tobermory", x: 442.49231, y: 428.85635 },
  { id: "sentinel", name: "Sentinel", x: 467.71454, y: 428.85635 },
  { id: "finch-west", name: "Finch West", x: 493.77108, y: 428.75909 },
];

const streetcarBase: Station[] = [
  { id: "long-branch", name: "Long Branch Loop", x: 95, y: 1262 },
  { id: "humber-loop", name: "Humber Loop", x: 315, y: 1140 },
  { id: "dufferin-loop", name: "Dufferin Gate Loop", x: 520, y: 1138 },
  { id: "queen", name: "Queen", x: 885, y: 1086 },
  { id: "broadview", name: "Broadview", x: 980, y: 1086 },
  { id: "neville", name: "Neville Park Loop", x: 1380, y: 1090 },
];

export const railMapRoutes: RouteDefinition[] = [
  { id: "1", name: "Yonge-University Line", mode: "subway", color: "#ffcb0a", pathD: "m 396.61662,287.64155 0.17268,41.76459 169.98297,169.63346 v 340 l 128.96254,120.85725 0.42445,56.65605 60.34341,0.4476 0.2696,12.0391 v 280 c 0,27.6143 22.38576,50 50.00003,50 27.6142,0 50,-22.3857 50,-50 v -840", stations: line1Stations },
  { id: "2", name: "Bloor-Danforth Line", mode: "subway", color: "#00923f", pathD: "M 120.67266,1029.1392 H 1327.0857 l 189.4367,-190.10993", stations: line2Stations },
  { id: "4", name: "Sheppard Line", mode: "subway", color: "#b90a7a", pathD: "m 856.7723,589.0396 h 360", stations: line4Stations },
  { id: "5", name: "Eglinton Line", mode: "light-rail", color: "#f35a05", pathD: "M 266.77227,839.0396 H 1516.7723", stations: line5Stations },
  { id: "6", name: "Finch West Line", mode: "light-rail", color: "#a2a8a4", pathD: "m 38.20737,448.54422 0.37179,-19.89272 455.19192,0.10759", stations: line6Stations },
];

export const streetcarRoutes: RouteDefinition[] = [
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

export const menuRoutes = [...streetcarRoutes, ...busRoutes];
export const allRoutes = [...railMapRoutes, ...menuRoutes];

function stationList(prefix: string, names: string[]): Station[] {
  return names.map((name, index) => ({
    id: `${prefix}-${name}`.toLowerCase().replace(/\s+/g, "-"),
    name,
    x: 100 + index * 100,
    y: 100 + index * 30,
  }));
}
