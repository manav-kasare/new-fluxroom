import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import FindPeople from '../screens/app/People/FindPeople';
import Friends from '../screens/app/People/Friends';
import {ThemeContext} from '../shared/Context';
import ContactsList from '../screens/app/People/ContactsList';
import FriendRequests from '../screens/app/People/FriendRequests';

const config = {
  animation: 'spring',
  config: {
    stiffness: 500,
    damping: 10000,
    mass: 2,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function PeopleNavigator() {
  const {constants, darkTheme} = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    searchBar: {
      height: 50,
      backgroundColor: constants.background3,
      borderBottomColor: constants.lineColor,
      borderBottomWidth: 0.2,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerStyle: {
      backgroundColor: darkTheme ? constants.background3 : constants.primary,
      borderWidth: 0,
      borderColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      height: 50,
    },
    headerContentStyle: {
      position: 'absolute',
      left: 15,
    },
    headerTitleStyle: {
      fontSize: 30,
      fontWeight: '700',
      color: 'white',
    },
  });

  return (
    <>
      <Appbar.Header style={styles.headerStyle}>
        <Appbar.Content
          style={styles.headerContentStyle}
          titleStyle={styles.headerTitleStyle}
          title="People"
        />
      </Appbar.Header>
      <Tab.Navigator
        initialRouteName="Friends"
        tabBarOptions={{
          activeTintColor: constants.text1,
          style: {
            backgroundColor: constants.background3,
          },
        }}>
        <Tab.Screen name="Friends" component={FriendsNavigator} />
        <Tab.Screen
          name="FindPeople"
          component={FindPeopleNavigator}
          options={{title: 'Find People'}}
        />
      </Tab.Navigator>
    </>
  );
}

const FriendsNavigator = () => {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Friends"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: config,
          close: config,
        },
      }}>
      <Stack.Screen
        name="Friends"
        component={Friends}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FriendRequests"
        component={FriendRequests}
        options={{
          headerStatusBarHeight: 0,
          title: 'Friend Requests',
          headerStyle: {
            backgroundColor: constants.background3,
            borderWidth: darkTheme ? 0 : 0.2,
            borderColor: constants.lineColor,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: constants.text1,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const FindPeopleNavigator = () => {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="FindPeople"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: config,
          close: config,
        },
      }}>
      <Stack.Screen
        name="FindPeople"
        component={FindPeople}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ContactsList"
        component={ContactsList}
        options={{
          headerStatusBarHeight: 0,
          title: 'Contacts',
          headerStyle: {
            backgroundColor: constants.background3,
            borderWidth: darkTheme ? 0 : 0.2,
            borderColor: constants.lineColor,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: constants.text1,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
