import React, {useContext, useReducer} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Platform,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Host from './Host';
import MemberYou from './MemberYou';
import Member from './Member';
import RaisingHand from './RaisingHand';
import ToggleMic from './ToggleMic';

import {
  getUserInfo,
  getChatroomInfo,
} from '../../../../backend/database/apiCalls';
import {UserDetailsContext, ThemeContext} from '../../../../shared/Context';
import RoomAvatar from './RoomAvatar';
import RoomHeader from './RoomHeader';
import RoomUserOptions from './RoomUserOptions';
import RoomAvatarLoading from './RoomAvatarLoading';

const Room = ({route, navigation}) => {
  const {room} = route.params;
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const {user} = useContext(UserDetailsContext);
  const [members, setMembers] = React.useState(null);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [someoneRaisingHand, setSomeoneRaisingHand] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getChatroomInfo(room._id).then((response) => {
      setMembers(response.listOfUsers);
      setLoading(false);
    });
  }, []);

  const anon = () => {};

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: darkTheme
            ? constants.background1
            : constants.primary,
        }}>
        <StatusBar
          backgroundColor={
            darkTheme ? constants.background1 : constants.primary
          }
        />
        <View style={{backgroundColor: constants.background1, flex: 1}}>
          <RoomHeader room={room} navigation={navigation} />
          {loading ? (
            <RoomAvatarLoading />
          ) : (
            <FlatList
              data={members}
              style={{backgroundColor: constants.background1}}
              columnWrapperStyle={{
                justifyContent: 'space-evenly',
                width: constants.width,
              }}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
              renderItem={
                ({item}) => (
                  <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                    <RoomUserOptions
                      isVisible={isVisible}
                      setIsVisible={setIsVisible}
                    />
                    <RoomAvatar
                      uri={item.user.profilePic}
                      size={100}
                      isHost={true}
                      name={item.user.username}
                    />
                  </TouchableOpacity>
                )
                // else if (item.id === user.id && item.id !== hostID) {
                //   return <MemberYou />;
                // } else if (item.id !== user.id && item.id !== hostID) {
                //   return <Member id={item.id} />;
                // }
              }
            />
          )}
          <View
            style={{
              width: constants.width,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
              paddingHorizontal: 25,
              backgroundColor: 'transparent',
            }}>
            <View style={{flexDirection: 'row'}}>
              <ToggleMic
                isSpeaking={isSpeaking}
                setIsSpeaking={setIsSpeaking}
              />
              <RaisingHand
                someoneRaisingHand={someoneRaisingHand}
                setSomeoneRaisingHand={setSomeoneRaisingHand}
              />
            </View>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: 'crimson',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={anon}>
              <FontAwesome5 name="phone-slash" color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <View
        style={{
          width: constants.width,
          height: 40,
          backgroundColor: constants.background1,
        }}
      />
    </>
  );
};

export default React.memo(Room);
