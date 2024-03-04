import { StyleSheet, Text, View } from 'react-native';
import client from './ApolloClient';
import { ApolloProvider } from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigation';
import AnimeDetailsScrreen from './src/screens/AnimeDetailsScrreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          // options={{animation: 'default'}}
        />
        <Stack.Screen
          name="AnimeDetails"
          component={AnimeDetailsScrreen}
          // options={{animation: 'slide_from_right'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
