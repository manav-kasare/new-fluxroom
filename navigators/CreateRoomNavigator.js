import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CreateRoom from '../screens/app/JoinCreateRoom/CreateRoom';
import ShareRoomLink from '../screens/app/JoinCreateRoom/ShareRoomLink';
import {ThemeContext} from '../shared/Context';

const CreateRoomStack = createStackNavigator();

export default function CreateRoomNavigator() {
  const {constants} = React.useContext(ThemeContext);
  return (
    <CreateRoomStack.Navigator>
      <CreateRoomStack.Screen
        name="CreateRoom"
        component={CreateRoom}
        options={({navigation}) => ({
          title: 'Create Room',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: constants.background2,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{marginRight: 15}}>
              <Ionicons name="md-menu" size={25} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <CreateRoomStack.Screen
        name="ShareRoomLink"
        component={ShareRoomLink}
        options={{
          title: 'Share your Room Link',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: constants.background2,
        }}
      />
    </CreateRoomStack.Navigator>
  );
}
