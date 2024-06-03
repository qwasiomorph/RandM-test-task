import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ICharacter, ICharacterList } from "../../types/character/characterDTO";

export const characterApi = createApi({
  reducerPath: "characterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.APP_BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getCharacter: builder.query<ICharacter, number>({
      query: (id) => `character/${id}`,
    }),
    getCharacterList: builder.query<ICharacterList, string>({
      query: (query) => `character${query}`,
    }),
    getCharactersById: builder.query<ICharacter[], string[]>({
      query: (...ids) => `character/${ids.join()},`,
    }),
  }),
});

export const {
  useGetCharacterQuery,
  useLazyGetCharacterListQuery,
  useGetCharacterListQuery,
  useGetCharactersByIdQuery,
} = characterApi;
