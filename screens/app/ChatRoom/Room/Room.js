import React from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {ActivityIndicator} from 'react-native-paper';

import {getChatroomInfo} from '../../../../backend/database/apiCalls';
import {ThemeContext} from '../../../../shared/Context';
import RoomAvatar from './RoomAvatar';
import RoomUserOptions from './RoomUserOptions';
import InviteToRoom from './InviteToRoom';
import RoomBottomView from './RoomBottomView';

const Room = ({route, navigation}) => {
  const {id, name, profilePic, description} = route.params;
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [listOfUsers, setListOfUsers] = React.useState([]);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [someoneRaisingHand, setSomeoneRaisingHand] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [inviteModal, setInviteModal] = React.useState(false);

  React.useEffect(() => {
    getChatroomInfo(id).then((response) => {
      setListOfUsers(response.listOfUsers);
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      title: name,
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 20}}
          onPress={navigateToSettings}>
          <Feather name="menu" size={25} color="white" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const navigateToSettings = () => {
    navigation.navigate('RoomSettings', {
      id: id,
      profilePic: profilePic,
      description: description,
    });
  };

  const setData = () => {
    getChatroomInfo(id).then((response) => {
      setListOfUsers(response.listOfUsers);
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
    <TouchableOpacity key={item._id} onPress={toggleVisible}>
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
          roomName={name}
          listOfUsers={listOfUsers}
        />
        <StatusBar
          barStyle="light-content"
          backgroundColor={
            darkTheme ? constants.background3 : constants.primary
          }
        />
        <View style={{backgroundColor: constants.background1, flex: 1}}>
          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator color={constants.primary} animating={true} />
            </View>
          ) : (
            <FlatList
              data={listOfUsers}
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
