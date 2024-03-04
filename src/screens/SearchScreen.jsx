import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {COLOR, SPACING} from '../themes/theme';
import { getAnimeBySearch } from '../api/apiCalls';
import InputHeader from '../components/InputHeader';
import SubMovieCard from '../components/SubMovieCard';
import Pagination from '../components/Pagination';

const {width, height} = Dimensions.get('screen');

const SearchScreen = ({navigation}) => {
  const [searchList, setSearchList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [ search, setSearch] = useState(undefined)

  const searchAnimeFunction = async (name) => {
    try {
      setIsLoading(true)
      let response = await getAnimeBySearch(name, 1)
      await setSearchList(response)
      await setSearch(name)
      // await console.log(search, 'searchfunction')
      // console.log(typeof searchList.media)
      setIsLoading(false)
    } catch (error) {
      console.error('Something went wrong in searchAnimeFunction ', error);
    }
  };

  const nextPage = async (name, page) => {
    try {
      setIsLoading(true)
      let response = await getAnimeBySearch(name, page)
      await setSearchList(response)
      setIsLoading(false)
    } catch (error) {
      console.error('Something went wrong in paginationFunction ', error);
    }
  };

  const previousPage = async (name, page) => {
    try {
      setIsLoading(true)
      let response = await getAnimeBySearch(name, page)
      await setSearchList(response)
      setIsLoading(false)
    } catch (error) {
      console.error('Something went wrong in paginationFunction ', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View>
        {isLoading ? 
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLOR.Orange} />
        </View>
        :
        <FlatList
          data={searchList?.media}
          keyExtractor={(item) => item.id}
          bounces={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.InputHeaderContainer}>
              <InputHeader searchFunction={searchAnimeFunction} />
            </View>
          }
          ListFooterComponent={
            <View style={styles.InputHeaderContainer}>
              {searchList?.media && 
              <Pagination
                hasNext ={searchList.pageInfo.hasNextPage}
                search ={search}
                currentPage = {searchList.pageInfo.currentPage}
                onPressPrevious={()=>previousPage(search, searchList.pageInfo.currentPage - 1)}
                onPressNext={()=>nextPage(search, searchList.pageInfo.currentPage + 1)}
              />}
            </View>
          }
          contentContainerStyle={styles.centerContainer}
          renderItem={({item, index}) => (
            <View key={index}>
            <SubMovieCard
              shoudlMarginatedAtEnd={false}
              shouldMarginatedAround={true}
              cardFunction={() => {
                navigation.push('AnimeDetails', {id: item.id});
              }}
              cardWidth={width / 2 - SPACING.space_12 * 2}
              title={item.title.english ? item.title.english : item.title.romaji}
              imagePath={item.coverImage.large}
            />
            </View>
          )}
        /> 
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width,
    alignItems: 'center',
    backgroundColor: COLOR.Black,
  },
  InputHeaderContainer: {
    display: 'flex',
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },
  centerContainer: {
    alignItems: 'center',
  },

  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default SearchScreen;