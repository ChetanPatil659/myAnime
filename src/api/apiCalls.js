import client from "../../ApolloClient"
import { GET_ANIME_BY_ID, LOAD_ANIMES, LOAD_MANGA, SEARCH_ANIMES, query } from '../graphql/queries';


export const getTrendingAnime = async () => {
  await client.query(
    {
      query: LOAD_ANIMES,
      variables: {
        sort: "TRENDING",
        page: 1,
        perPage: 10
      }
    }
  ).then((result) => data = result.data.Page)
  return data
}

export const getTrendingMANGA = async () => {
  await client.query(
    {
      query: LOAD_MANGA,
      variables: {
        sort: "TRENDING",
        page: 1,
        perPage: 10
      }
    }
  ).then((result) => data = result.data.Page)
  return data
}

export const getPopularAnime = async () => {
  let data
  await client.query(
    {
      query: LOAD_ANIMES,
      variables: {
        sort: "FAVOURITES",
        page: 1,
        perPage: 10
      }
    }
  ).then((result) => data = result.data.Page)
  return data
}

export const getAnimeBySearch = async (search, page) => {
  let data
  await client.query(
    {
      query: SEARCH_ANIMES,
      variables: {
        title: search,
        page: page,
        perPage: 20,
        isAdult: false
      }
    }
  ).then((result) => data = result.data.Page).catch((err) => console.log(err))
  // console.log(data, 'apicall')
  return data
}

export const getAnimeById = async (id) => {
  let data 
  await client.query(
    {
      query: GET_ANIME_BY_ID,
      variables: {
        id: id
      }
    }
  ).then((result) => data = result.data.Media).catch((err) => console.log(err))
  // console.log(data, id)
  return data
}