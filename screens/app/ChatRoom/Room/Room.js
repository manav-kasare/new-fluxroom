import React, {useContext, useReducer} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

import RaisingHand from './RaisingHand';
import ToggleMic from './ToggleMic';

import {getChatroomInfo} from '../../../../backend/database/apiCalls';
import {UserDetailsContext, ThemeContext} from '../../../../shared/Context';
import RoomAvatar from './RoomAvatar';
import RoomHeader from './RoomHeader';
import RoomUserOptions from './RoomUserOptions';
import RoomAvatarLoading from './RoomAvatarLoading';
import InviteToRoom from './InviteToRoom';

const Room = ({route, navigation}) => {
  const {room} = route.params;
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const {user} = useContext(UserDetailsContext);
  const [members, setMembers] = React.useState(null);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [someoneRaisingHand, setSomeoneRaisingHand] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [inviteModal, setInviteModal] = React.useState(false);

  React.useEffect(() => {
    setData();
  }, []);

  const setData = () => {
    getChatroomInfo(room._id).then((response) => {
      setMembers(response.listOfUsers);
      setLoading(false);
      setRefreshing(false);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setData();
  };

  const anon = () => {};

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const handleInvite = () => {
    setInviteModal(true);
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: darkTheme
            ? constants.background3
            : constants.primary,
        }}>
        <InviteToRoom
          inviteModal={inviteModal}
          setInviteModal={setInviteModal}
          roomName={room.name}
        />
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
              renderItem={({item}) => (
                <TouchableOpacity onPress={toggleVisible}>
                  <RoomUserOptions
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                  />
                  <RoomAvatar
                    uri={item.profilePic}
                    size={constants.width * 0.25}
                    name={item.username}
                  />
                </TouchableOpacity>
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={constants.background2}
                />
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
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: constants.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 10,
                }}
                onPress={handleInvite}>
                <Entypo size={30} color="white" name="plus" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: '#ba0000',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={anon}>
              <FontAwesome5 name="phone-slash" color="white" siz e={20} />
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
