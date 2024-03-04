import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR, FONTSIZE, SPACING } from '../themes/theme'
import { getPopularAnime, getTrendingAnime, getTrendingMANGA } from '../api/apiCalls'
import { StatusBar } from 'expo-status-bar'
import MovieCard from '../components/MovieCard'
import InputHeader from '../components/InputHeader'
import CategoryHeader from '../components/CategoryHeader'

const { width, height } = Dimensions.get('window')

const HomeScreen = ({ navigation }) => {
  const [anime, setAnime] = useState({})
  const [trendingAnime, setTrendingAnime] = useState({})
  const [trendingManga, setTrendingManga] = useState({})
  useEffect(() => {
    let data = async () => {
      let popularAnime = await getPopularAnime()
      await setAnime(popularAnime)
      // console.log(anime.media[5].title.english ? anime.media[5].title.english : anime.media[5].title.romaji, 'setAnime')

      let trendingAnime = await getTrendingAnime()
      await setTrendingAnime(trendingAnime)
      // console.log(trendingAnime.media[0].title.english, 'setTrendingAnime')

      let trendingManga = await getTrendingMANGA()
      await setTrendingManga(trendingManga)
      // console.log(trendingManga)
    }
    data()
  }, [])

  const searchAnimeFunction = () => {
    navigation.navigate('Search')
  }

  if (!anime && !trendingAnime && !trendingMANGA) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <StatusBar hidden />

        <View style={styles.inputHeaderContainer}>
          <InputHeader searchFunction={searchAnimeFunction} />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLOR.Orange} />
        </View>
      </ScrollView>
    )
  }

  // console.log(nowPlayingMoviesList.poster_path);


  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      contentContainerStyle={styles.scrollViewContainer}
    >
      <StatusBar hidden />

      <View style={styles.inputHeaderContainer}>
        <InputHeader searchFunction={searchAnimeFunction} />
      </View>

      <CategoryHeader title={'Popular Anime'} />
      <FlatList
        horizontal
        bounces={false}
        data={anime.media}
        snapToInterval={width * 0.7 + SPACING.space_36}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.containerGap36}
        decelerationRate={0}
        renderItem={
          ({ item, index }) => {
            return (
              <View key={index}>
              <MovieCard
                shouldMarginatedAtEnd={true}
                cardFunction={() => {
                  navigation.push('AnimeDetails', { id: item.id })
                }}
                cardWidth={width * 0.7}
                isFirst={index == 0 ? true : false}
                isLast={index == 10 - 1 ? true : false}
                title={item.title.english ? item.title.english : item.title.romaji}
                imagePath={item.coverImage.extraLarge}
                genre={item.genres}
                isGenres={true}
                fontSize={FONTSIZE.size_24}
                vote_average={item.averageScore}
                vote_count={item.popularity}
              />
              </View>
            )
          }
        }
      />

      <CategoryHeader title={'Trending Anime'} />
      <FlatList
        horizontal
        bounces={false}
        data={trendingAnime.media}
        snapToInterval={width * 0.7 + SPACING.space_36}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.containerGap36}
        decelerationRate={0}
        renderItem={
          ({ item, index }) => {
            return (
              <View key={index}>
              <MovieCard
                shouldMarginatedAtEnd={true}
                cardFunction={() => {
                  navigation.push('AnimeDetails', { id: item.id })
                }}
                cardWidth={width / 3}
                isFirst={index == 0 ? true : false}
                isLast={index == 10 - 1 ? true : false}
                title={item.title.english ? item.title.english : item.title.romaji}
                imagePath={item.coverImage.medium}
                genre={item.genres}
                isGenres={false}
                fontSize={FONTSIZE.size_18}
                vote_average={item.averageScore}
                vote_count={item.popularity}
              />
              </View>
            )
          }
        }
      />

      <CategoryHeader title={'Trending Manga'} />
      <FlatList
        horizontal
        bounces={false}
        data={trendingManga.media}
        snapToInterval={width * 0.7 + SPACING.space_36}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.containerGap36}
        decelerationRate={0}
        renderItem={
          ({ item, index }) => {
            return (
              <View key={index}>
              <MovieCard
                shouldMarginatedAtEnd={true}
                cardFunction={() => {
                  navigation.push('AnimeDetails', { id: item.id })
                }}
                cardWidth={width / 3}
                isFirst={index == 0 ? true : false}
                isLast={index == 10 - 1 ? true : false}
                title={item.title.english ? item.title.english : item.title.romaji}
                imagePath={item.coverImage.medium}
                genre={item.genres}
                isGenres={false}
                fontSize={FONTSIZE.size_18}
                vote_average={item.averageScore}
                vote_count={item.popularity}
                
              />
              </View>
            )
          }
        }
      />

    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.Black,
    // display: 'flex',
    // flexWrap: 'nowrap'
  },

  scrollViewContainer: {
    flex: 0,
  },

  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28
  },

  containerGap36: {
    gap: SPACING.space_36,
  }
});