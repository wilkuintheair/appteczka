export type AidKitContent = {
  id: string;
  name: string;
  quantity: number;
  fullQuantity: number;
};

export type AidKitMarker = {
  latitude: number;
  longitude: number;
};

export type AidKit = {
  id: string;
  name: string;
  description?: string;
  shortDescription?: string;
  image?: string;
  marker: AidKitMarker;
  content: AidKitContent[];
};

export const getAidKit = (id: string): AidKit => {
  const aidKit = AIDS_LIST.find((aid) => aid.id === id);
  if (!aidKit) {
    throw new Error(`Aid with id ${id} not found`);
  }
  return aidKit;
};

const commonData = {
  description: "Appteczka w bardzo dostępnym miejscu. Znajduje się na polanie.",
  shortDescription: "Na polanie",
  image: "https://apteczkanaszlaku.pl/phoocmal/2023/07/mal-400x250.png",
  content: [
    {
      id: "0",
      name: "Plaster",
      quantity: 10,
      fullQuantity: 10,
    },
    {
      id: "1",
      name: "Opaska",
      quantity: 5,
      fullQuantity: 10,
    },
    {
      id: "2",
      name: "Płyn dezynfekcyjny",
      quantity: 2,
      fullQuantity: 10,
    },
    {
      id: "3",
      name: "Rękawiczki",
      quantity: 5,
      fullQuantity: 10,
    },
    {
      id: "4",
      name: "Nożyczki",
      quantity: 1,
      fullQuantity: 10,
    },
    {
      id: "5",
      name: "Chusteczki",
      quantity: 10,
      fullQuantity: 10,
    },
    {
      id: "6",
      name: "Gazik",
      quantity: 5,
      fullQuantity: 10,
    },
  ],
};

export const AIDS_LIST: AidKit[] = [
  {
    ...commonData,
    id: "0",
    name: "Klimczok",
    marker: { latitude: 49.74001, longitude: 18.995952 },
  },
  {
    ...commonData,
    id: "1",
    name: "Appteczka 1",
    marker: { latitude: 49.865678, longitude: 19.021004 },
  },
  {
    ...commonData,
    id: "2",
    name: "Appteczka 2",
    marker: { latitude: 49.965678, longitude: 19.021004 },
  },
  {
    ...commonData,
    id: "3",
    name: "Appteczka 3",
    marker: { latitude: 49.694678, longitude: 19.122004 },
  },
  {
    ...commonData,
    id: "4",
    name: "Appteczka 4",
    marker: { latitude: 49.865678, longitude: 19.221004 },
  },
  {
    ...commonData,
    id: "5",
    name: "Appteczka 5",
    marker: { latitude: 49.965678, longitude: 19.321004 },
  },
  {
    ...commonData,
    id: "6",
    name: "Appteczka 6",
    marker: { latitude: 49.765678, longitude: 19.421004 },
  },
  {
    ...commonData,
    id: "7",
    name: "Appteczka 7",
    marker: { latitude: 49.865678, longitude: 19.521004 },
  },
  {
    ...commonData,
    id: "8",
    name: "Appteczka 8",
    marker: { latitude: 49.965678, longitude: 19.621004 },
  },
  {
    ...commonData,
    id: "9",
    name: "Appteczka 9",
    marker: { latitude: 49.765678, longitude: 19.721004 },
  },
  {
    ...commonData,
    id: "10",
    name: "Appteczka 10",
    marker: { latitude: 49.865678, longitude: 19.821004 },
  },
  {
    ...commonData,
    id: "11",
    name: "Appteczka 11",
    marker: { latitude: 49.965678, longitude: 19.921004 },
  },
];
