import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IEpisode, IEpisodeList } from "../../types/episode/episodeDTO";

export const episodeApi = createApi({
  reducerPath: "episodeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.APP_BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getEpisode: builder.query<IEpisode, number>({
      query: (id) => `episode/${id}`,
    }),
    getFilteredEpisodeList: builder.query<IEpisodeList, string>({
      query: (query) => `episode${query}`,
    }),
    getEpisodesById: builder.query<IEpisode[], string[]>({
      query: (...ids) => `episode/${ids.join()},`,
    }),
  }),
});

export const {
  useGetEpisodeQuery,
  useGetFilteredEpisodeListQuery,
  useLazyGetFilteredEpisodeListQuery,
  useGetEpisodesByIdQuery,
} = episodeApi;
