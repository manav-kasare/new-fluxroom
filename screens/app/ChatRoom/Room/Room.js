import React from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {ActivityIndicator} from 'react-native-paper';

import {getChatroomInfo} from '../../../../backend/database/apiCalls';
import {ThemeContext, UserDetailsContext} from '../../../../shared/Context';
import RoomAvatar from './RoomAvatar';
import RoomUserOptions from './RoomUserOptions';
import InviteToRoom from './InviteToRoom';
import RoomBottomView from './RoomBottomView';
import {fcmService} from '../../../../firebase/FCMService';

const Room = ({route, navigation}) => {
  const {id} = route.params;
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const {user} = React.useContext(UserDetailsContext);
  const room = React.useRef({
    _id: id,
    name: null,
    description: null,
    profilePic: undefined,
    listOfUsers: null,
  });
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [someoneRaisingHand, setSomeoneRaisingHand] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [inviteModal, setInviteModal] = React.useState(false);

  React.useEffect(() => {
    getChatroomInfo(id).then((response) => {
      room.current = {...room, ...response};
      setHeader();
      setLoading(false);
    });
  }, []);

  const setHeader = () => {
    navigation.setOptions({
      title: room.current.name,
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 20}}
          onPress={navigateToSettings}>
          <Feather name="menu" size={25} color="white" />
        </TouchableOpacity>
      ),
    });
  };

  const navigateToSettings = () => {
    navigation.navigate('RoomSettings', {
      id: id,
      profilePic: room.current.profilePic,
      description: room.current.description,
    });
  };

  const setData = () => {
    getChatroomInfo(id).then((response) => {
      room.current = {...room, ...response};
      setLoading(false);
      setRefreshing(false);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setData();
  };

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      key={item._id}
      onPress={user._id !== item ? toggleVisible : () => {}}>
      <RoomUserOptions isVisible={isVisible} setIsVisible={setIsVisible} />
      <RoomAvatar id={item} size={constants.width * 0.25} isHost={false} />
    </TouchableOpacity>
  );

  const refreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={constants.background2}
      size={Platform.os === 'ios' ? 'small' : 'default'}
    />
  );

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: darkTheme ? constants.background3 : constants.primary,
    },
    columnWrapperStyle: {
      justifyContent: 'space-evenly',
      width: constants.width,
    },
    flatList: {backgroundColor: constants.background1},
    screenBottomView: {
      width: constants.width,
      height: 40,
      backgroundColor: constants.background1,
    },
    loading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <>
      <SafeAreaView style={styles.screen}>
        <InviteToRoom
          inviteModal={inviteModal}
          setInviteModal={setInviteModal}
          roomName={room.current.name}
          listOfUsers={room.current.listOfUsers}
        />
        <StatusBar
          barStyle="light-content"
          backgroundColor={
            darkTheme ? constants.background3 : constants.primary
          }
        />
        <TouchableOpacity
          onPress={() => {
            fcmService.sendNotification(
              {url: `fluxroom://room/${id}`},
              [
                // 'clUmuSVrR5KBeKENME1vlA:APA91bHHFSuHu1cLUIAh9XECqRaITbKb3SJS1o2UC4cdxaptry-5lwk7V3lEZWXrcVTbItX8nRSFokhr_fvH83SRJRgk6xERxRq2LUM_gF9mhK7wZwsOAv6U0jGDmGPmrPR1EQY-CS0j',
                'eKs98_JQQhuICJizMootps:APA91bF5lOG48OzRp5ofCjJNFWqZmaNRGTOxlbztitfKDe0ZpTa4u2L93Guvupt7I5atO4USG8YOuj2ZAZ2XQ4La5DzBS55ZhP1_UbA7BhWmY1mOT_Oz1jzUG-cSwhd97qZCNErAVNTv',
              ],
              'Test',
              'Notification Test',
            );
          }}>
          <Text style={{fontSize: 25, color: 'white'}}>Send</Text>
        </TouchableOpacity>
        <View style={{backgroundColor: constants.background1, flex: 1}}>
          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator color={constants.primary} animating={true} />
            </View>
          ) : (
            <FlatList
              data={room.current.listOfUsers}
              style={styles.flatList}
              columnWrapperStyle={styles.columnWrapperStyle}
              numColumns={3}
              renderItem={renderItem}
              refreshControl={refreshControl}
            />
          )}
          <RoomBottomView
            isSpeaking={isSpeaking}
            setIsSpeaking={setIsSpeaking}
            someoneRaisingHand={someoneRaisingHand}
            setSomeoneRaisingHand={setSomeoneRaisingHand}
            setInviteModal={setInviteModal}
          />
        </View>
      </SafeAreaView>
      <View style={styles.screenBottomView} />
    </>
  );
};

export default React.memo(Room);
