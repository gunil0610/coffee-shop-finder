// initialize unsplash

import { createApi } from "unsplash-js";

// @ts-ingnore
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY ?? "",
});

import { CafeData, TransformedCafeData } from "common/types/cafeList";

const getUrlForCoffeeStores = (
  latLong: string,
  query: string,
  limit: number
) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&v=20220506&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
  });
  const unsplashResults = photos.response?.results;
  return unsplashResults?.map((result) => result.urls["small"]);
};

const PARIS_LAT_LONG = "48.837752030448904,2.355177591459498";

export const fetchCoffeeStores = async (
  latLong = PARIS_LAT_LONG,
  limit = 6
) => {
  if (!process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY) return [];

  const photos = await getListOfCoffeeStorePhotos();
  const response = await fetch(getUrlForCoffeeStores(latLong, "cafe", limit), {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  });

  const data = await response.json();

  const transformedData: TransformedCafeData[] =
    data?.results?.map((venue: CafeData, idx: number) => {
      return {
        id: venue.fsq_id,
        address: venue.location.address || "",
        name: venue.name,
        neighborhood:
          venue.location.neighborhood || venue.location.cross_street || "",
        imgUrl: photos?.[idx],
      };
    }) || [];

  return transformedData;
};
