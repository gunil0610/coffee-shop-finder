import { CafeData } from "common/types/cafeList";

const getUrlForCoffeeStores = (
  latLong: string,
  query: string,
  limit: number
) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&v=20220506&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  if (!process.env.FOURSQUARE_API_KEY) return [];

  const response = await fetch(
    getUrlForCoffeeStores("48.837752030448904,2.355177591459498", "cafe", 6),
    {
      headers: {
        Authorization: process.env.FOURSQUARE_API_KEY,
      },
    }
  );

  const data = await response.json();

  const transformedData: CafeData[] =
    data?.results?.map((venue: any) => {
      return {
        id: venue.fsq_id,
        ...venue,
      };
    }) || [];

  return transformedData;
};
