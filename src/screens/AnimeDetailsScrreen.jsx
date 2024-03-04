import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { getAnimeById } from '../api/apiCalls';
import { COLOR, FONTSIZE, SPACING, BORDERRADIUS } from '../themes/theme';
import AppHeader from '../components/AppHeader';
import { LinearGradient } from 'expo-linear-gradient';
import CategoryHeader from '../components/CategoryHeader';
import CastCard from '../components/CastCard';
import Icon from 'react-native-vector-icons/FontAwesome'

const AnimeDetailsScreen = ({ navigation, route }) => {
  const [animeData, setAnimeData] = useState(undefined);

  useEffect(() => {
    let data = async () => {
      let popularAnime = await getAnimeById(route.params.id)
      await setAnimeData(popularAnime)
      // console.log(animeData.studios.edges.length)
    }
    data()
  }, [])
  if (
    animeData == undefined &&
    animeData == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={''}
            action={() => navigation.goBack()}
          />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLOR.Orange} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />

      <View>
        <ImageBackground
          source={{
            uri: animeData.coverImage.extraLarge
          }}
          style={styles.imageBG}>
          <LinearGradient
            colors={[COLOR.BlackRGB10, COLOR.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.imageBG}></View>
        <Image
          source={{ uri: animeData.coverImage.extraLarge }}
          style={styles.cardImage}
        />
      </View>

      <View>
        <Text style={styles.title}>{animeData?.title.english ? animeData?.title.english : animeData?.title.romaji}</Text>
        <View style={styles.genreContainer}>
          {animeData?.genres.map((item) => {
            return (
              <View style={styles.genreBox} key={item.id}>
                <Text style={styles.genreText}>{item}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
          <Icon style={styles.starIcon} name='star' />
          <Text style={styles.runtimeText}>
            {animeData.averageScore} ({animeData.popularity})
          </Text>
        </View>
        <Text style={styles.descriptionText}>{animeData.description.replaceAll('<br>', '')}</Text>

        <View style={[{ flexDirection: 'row' }, { marginTop: 14 }]}>
          <Text style={styles.descriptionText}>Type :</Text>
          <Text style={[styles.descriptionText, { color: COLOR.Orange }]}> {animeData.format}</Text>
        </View>
        {
          animeData.studios.edges.length >= 1 &&
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descriptionText}>Studio :</Text>
            <Text style={[styles.descriptionText, { color: COLOR.Orange }]}> {animeData.studios.edges[0].node.name}</Text>
          </View>
        }
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.descriptionText}>Genres : </Text>
          <Text style={[styles.descriptionText, { color: COLOR.Orange }]}>{animeData.genres.join(', ')}</Text>
        </View>
        {animeData.episodes &&
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descriptionText}>Episodes :</Text>
            <Text style={[styles.descriptionText, { color: COLOR.Orange }]}> {animeData.episodes}</Text>
          </View>}

        {animeData.chapters &&
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descriptionText}>Episodes :</Text>
            <Text style={[styles.descriptionText, { color: COLOR.Orange }]}> {animeData.chapters}</Text>
          </View>}

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.descriptionText}>Average Duration :</Text>
          <Text style={[styles.descriptionText, { color: COLOR.Orange }]}> {animeData.duration} mins</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.descriptionText}>Status :</Text>
          <Text style={[styles.descriptionText, { color: COLOR.Orange }]}> {animeData.status}</Text>
        </View>
        <View style={[styles.runtimeText, { flexDirection: 'row' }]}>
          <Text style={styles.runtimeText}>Released on : </Text>
          <Text style={{ color: COLOR.Orange }}>
            {animeData.startDate.day}/{animeData.startDate.month}/{animeData.startDate.year}
          </Text>
        </View>
      </View>

      <CategoryHeader title="Top Cast" />
      <FlatList
        data={animeData.characters.edges}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.containerGap24}
        renderItem={({ item, index }) => (
          <View key={index}>
          <CastCard
            shouldMarginatedAtEnd={true}
            cardWidth={100}
            isFirst={index == 0 ? true : false}
            isLast={index == animeData.characters.edges.length - 1 ? true : false}
            imagePath={item?.node?.image?.medium}
            title={item?.node?.name?.full}
            subtitle={item.role}
          />
          </View>
        )}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLOR.Black,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    borderRadius: 8
  },
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLOR.WhiteRGBA50,
    marginRight: SPACING.space_8,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_15,
  },
  runtimeText: {
    // fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLOR.White,
  },
  title: {
    // fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLOR.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox: {
    borderColor: COLOR.WhiteRGBA50,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    // fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLOR.WhiteRGBA75,
  },
  infoContainer: {
    marginHorizontal: SPACING.space_24,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    marginVertical: 14
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLOR.Yellow,
  },
  descriptionText: {
    // fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLOR.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  buttonBG: {
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25 * 2,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLOR.Orange,
    // fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLOR.White,
  },
});

export default AnimeDetailsScreen;