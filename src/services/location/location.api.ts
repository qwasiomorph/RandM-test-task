import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ILocation, ILocationList } from "../../types/location/locationDTO";

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.APP_BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getLocation: builder.query<ILocation, number>({
      query: (id) => `location/${id}`,
    }),
    getLocationList: builder.query<ILocationList, string>({
      query: (query) => `location${query}`,
    }),
    getLocationsById: builder.query<ILocation[], string[]>({
      query: (...ids) => `location/${ids.join()},`,
    }),
  }),
});

export const {
  useGetLocationQuery,
  useLazyGetLocationListQuery,
  useGetLocationsByIdQuery,
  useGetLocationListQuery,
} = locationApi;
