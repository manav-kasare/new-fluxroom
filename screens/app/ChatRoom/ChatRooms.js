import React, { useEffect, useContext, useState, useCallback } from "react";
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  RefreshControl,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import constants from "../../../shared/constants";
import RoomTile from "./RoomTile";
import RequestIcon from "./RequestIcon";
import { getUserChatRooms } from "../../../backend/database/apiCalls";
import { UserDetailsContext } from "../../../shared/Context";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function ChatRooms({ navigation }) {
  const { user } = useContext(UserDetailsContext);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [onFocusRefresh, setOnFocusRefresh] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handleOnFocusRefresh = () => {
    setTimeout(() => {
      setOnFocusRefresh(false);
    }, 500);
  };

  useEffect(() => {
    handleOnFocusRefresh();
    getUserChatRooms(user.id).then((roomList) => {
      setChatRoomList(roomList);
    });
  }, [refreshing]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: constants.width,
        backgroundColor: constants.background1,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <StatusBar barStyle="dark-content" />
      {onFocusRefresh ? (
        <View
          style={{
            flex: 1,
            backgroundColor: constants.background1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="small" color={constants.background2} />
        </View>
      ) : (
        <FlatList
          style={{ width: constants.width }}
          data={chatRoomList}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Text style={{ color: "grey", fontSize: 20, fontWeight: "300" }}>
                You're not a part of any room as of yet :(
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <RoomTile id={item} navigation={navigation} />
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
    </SafeAreaView>
  );
}
