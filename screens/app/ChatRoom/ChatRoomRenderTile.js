import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  useCode,
  cond,
  eq,
  set,
  interpolate,
  not,
} from 'react-native-reanimated';

console.disableYellowBox = true;

import {ThemeContext} from '../../../shared/Context';
import CircleAvatar from '../../../shared/CircleAvatar';
import {
  useValue,
  useTransition,
  mix,
  onGestureEvent,
} from 'react-native-redash';
import {TapGestureHandler, State} from 'react-native-gesture-handler';

const ChatRoomRenderTile = ({item, navigation}) => {
  const {constants} = React.useContext(ThemeContext);
  const [room, setRoom] = React.useState(item);
  const [onPressIn, setOnPressIn] = React.useState(false);

  const opacityVal = useValue(0);
  const opacity = useTransition(opacityVal);
  useCode(() => cond(eq(opacityVal, 0), set(opacityVal, 1)), [opacityVal]);

  const scaleTransition = useTransition(onPressIn);
  const scale = mix(scaleTransition, 1, 0.9);

  const showRoomDetails = useValue(0);
  const state = useValue(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({state});
  const transition = useTransition(showRoomDetails);
  const height = mix(transition, 0, room.listOfUsers.length * 30);
  const rotateZ = mix(transition, 0, Math.PI);

  useCode(
    () =>
      cond(eq(state, State.END), set(showRoomDetails, not(showRoomDetails))),
    [showRoomDetails, state],
  );

  const translateY = interpolate(opacity, {
    inputRange: [0, 0.25, 1],
    outputRange: [50, 5, 0],
  });

  const handleOnPressTile = () => {
    navigation.push('Room', {
      id: item._id,
      name: item.name,
      profilePic: item.profilePic,
      description: item.description,
    });
  };

  const styles = StyleSheet.create({
    tile: {
      width: constants.width * 0.9,
      shadowOpacity: 0.1,
      shadowColor: 'black',
      shadowOffset: {width: 0.1, height: 0.1},
      borderRadius: 8,
      backgroundColor: constants.background3,
      alignSelf: 'center',
      marginVertical: 10,
      elevation: 1,
      padding: 15,
    },
    tileSmall: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    heading: {
      color: constants.text1,
      marginLeft: 15,
      fontSize: 20,
      fontWeight: '600',
    },
    description: {
      color: 'grey',
      marginLeft: 15,
      fontSize: 14,
      fontWeight: '400',
    },
    listOfUsers: {
      marginTop: 10,
      marginLeft: 5,
    },
  });

  return (
    <TouchableWithoutFeedback
      onPress={handleOnPressTile}
      onPressIn={() => setOnPressIn(true)}
      onPressOut={() => setOnPressIn(false)}>
      <Animated.View
        style={[styles.tile, {opacity, transform: [{translateY, scale}]}]}>
        <View style={styles.tileSmall}>
          <CircleAvatar
            uri={item.profilePic === undefined ? undefined : item.profilePic}
            size={75}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.heading}>{item.name}</Text>
            <View style={{width: constants.width * 0.4}}>
              {item.description.length <= 30 ? (
                <Text style={styles.description}>{item.description}</Text>
              ) : showRoomDetails ? (
                <Text style={styles.description}>{item.description}</Text>
              ) : (
                <Text style={styles.description}>
                  {item.description.substr(0, 30)}....
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'green', marginRight: 15}}>x</Text>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TapGestureHandler {...gestureHandler}>
                <Animated.View style={{transform: [{rotateZ}]}}>
                  <Ionicons
                    name="chevron-down"
                    size={24}
                    color={constants.background2}
                  />
                </Animated.View>
              </TapGestureHandler>
            </TouchableOpacity>
          </View>
        </View>
        <Animated.View style={{height}}>
          <FlatList
            style={styles.listOfUsers}
            ListHeaderComponent={() => (
              <Text style={{color: constants.text1, fontWeight: '500'}}>
                x Speaking of {item.listOfUsers.length}
              </Text>
            )}
            scrollEnabled={false}
            data={item.listOfUsers}
            keyExtractor={(key, index) => index.toString()}
            renderItem={({item}) => (
              <Text style={{color: 'grey', fontSize: 16, fontWeight: '400'}}>
                {item.username}
              </Text>
            )}
          />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(ChatRoomRenderTile);
