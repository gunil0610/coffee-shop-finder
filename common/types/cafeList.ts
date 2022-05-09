interface categoryType {
  id: number;
  name: string;
  icon: {
    prefix: string;
    suffix: string;
  };
}

interface chainType {
  id: string;
  name: string;
}

interface geocodeType {
  latitude: number;
  longitude: number;
}

interface locationType {
  address: string;
  address_extended?: string;
  census_block: string;
  country: string;
  cross_street?: string;
  dma: string;
  formatted_address: string;
  locality: string;
  neighborhood?: string[];
  postcode: string;
  region: string;
}

interface relatedPlaceType {
  fsq_id: string;
  name: string;
}

export interface CafeData {
  fsq_id: string;
  categories: categoryType[];
  chains: chainType[];
  distance: number;
  geocodes: {
    main: geocodeType;
    roof: geocodeType;
  };
  link: string;
  location: locationType;
  name: string;
  related_places: Record<string, relatedPlaceType[]>;
  timezone: string;
  imgUrl?: string;
}

export interface TransformedCafeData {
  id: string;
  address: string;
  name: string;
  neighborhood: string;
  imgUrl?: string;
}
