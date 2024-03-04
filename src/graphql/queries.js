import { gql } from "@apollo/client";

export const LOAD_ANIMES = gql`
  query loadAnime($sort: [MediaSort] $perPage: Int $page: Int) {
    Page(page: $page perPage: $perPage){
      media(type: ANIME sort: $sort) {
        id
        averageScore
        title {
          english
          romaji
        }
        genres
        averageScore
        trending
        popularity
        coverImage {
          extraLarge
          large
          medium
          color
        }
      }
      pageInfo {
        perPage
        currentPage
        lastPage
        hasNextPage
        total
      }
    }
  }
`

export const SEARCH_ANIMES = gql`
  query searchAnime($title: String! $perPage: Int $page: Int $isAdult: Boolean) {
    Page(page: $page perPage: $perPage){
      media(sort: POPULARITY_DESC search: $title isAdult: $isAdult) {
        id
        averageScore
        title {
          english
          romaji
        }
        coverImage {
          large
          medium
          color
        }
      }
      pageInfo {
        perPage
        currentPage
        lastPage
        hasNextPage
        total
      }
    }
  }
`

export const GET_ANIME_BY_ID = gql`
  query GetAnime($id: Int!) {
    Media(id: $id) {
      id
      title {
          romaji
          english
      }
      siteUrl
      coverImage {
          extraLarge
          large
      }
      popularity
      favourites
      bannerImage
      description(asHtml: false)
      status
      episodes
      season
      seasonYear
      format
      startDate {
          year
          month
          day
      }
      duration
      source
      type
      genres
      averageScore
      nextAiringEpisode {
          timeUntilAiring
          episode
          airingAt
      }
      isAdult
      trailer {
          id
      }
      studios {
          edges {
              node {
                  name
              }
          }
      }
      characters {
          edges {
              node
              {
                  id
                  name {
                      full
                      native
                  }
                  image {
                      large
                      medium
                  }
                  age
                  favourites
              }
              role
              voiceActors {
                  name {
                      full
                  }
                  languageV2
                  image {
                      large
                  }
              }
          }
      }
    }
  }
`

export const LOAD_MANGA = gql`
  query loadAnime($sort: [MediaSort] $perPage: Int $page: Int) {
    Page(page: $page perPage: $perPage){
      media(type: MANGA sort: $sort) {
        id
        averageScore
        title {
          english
          romaji
        }
        genres
        averageScore
        trending
        popularity
        coverImage {
          extraLarge
          large
          medium
          color
        }
      }
      pageInfo {
        perPage
        currentPage
        lastPage
        hasNextPage
        total
      }
    }
  }
`

export const SEARCH_MANGA = gql`
  query searchAnime($title: String!) {
    Page{
      media(sort: POPULARITY_DESC search: $title) {
        id
        averageScore
        title {
          english
          romaji
        }
        coverImage {
          large
          medium
          color
        }
      }
    }
  }
`
