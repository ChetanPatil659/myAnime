import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import {COLOR, FONTSIZE, SPACING} from '../themes/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLOR.Black,
          borderTopWidth: 0,
          height: SPACING.space_10 * 7,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? {backgroundColor: COLOR.Orange} : {},
                ]}>
                <FontAwesome
                  name="video-camera"
                  color={COLOR.White}
                  size={FONTSIZE.size_20}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? {backgroundColor: COLOR.Orange} : {},
                ]}>
                <FontAwesome
                  name="search"
                  color={COLOR.White}
                  size={FONTSIZE.size_24}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeTabBackground: {
    backgroundColor: COLOR.Black,
    padding: SPACING.space_15,
    borderRadius: SPACING.space_18 * 10,
  },
});

export default TabNavigator;