import React, { useEffect, useContext, useReducer } from "react";
import { SafeAreaView, StatusBar, FlatList } from "react-native";

import RoomPhotoTile from "./RoomPhotoTile";
import constants from "../../../shared/constants";
import Host from "./Host";
import MemberYou from "./MemberYou";
import Member from "./Member";

import {
  getUserInfo,
  getChatroomInfo,
} from "../../../backend/database/apiCalls";
import { UserDetailsContext } from "../../../shared/Context";
import RoomUserPhoto from "./RoomUserPhoto";

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "append":
      return {
        membersInfo: [
          ...state.membersInfo,
          {
            id: action.id,
            username: action.id,
            profilePhoto: action.profilePhoto,
          },
        ],
      };
    default:
      return state;
  }
}

export default function Room({ route, navigation }) {
  const { room } = route.params;
  const { user } = useContext(UserDetailsContext);
  const [{ membersInfo }, dispatch] = useReducer(reducer, {
    membersInfo: [],
  });
  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // get members info
  useEffect(() => {
    handleFetch(room.host);
    room.members.map((member) => handleFetch(member));
  }, []);

  const handleFetch = (id) => {
    getUserInfo(id).then((data) => {
      dispatch({
        type: "append",
        id: data.id,
        username: data.username,
        profilePhoto: data.profile_photo,
      });
    });
  };

  return (
    <SafeAreaView
      style={{
        height: constants.height,
        width: constants.width,
        backgroundColor: constants.background1,
      }}
    >
      <StatusBar barStyle="default" />
      <FlatList
        data={test}
        columnWrapperStyle={{
          justifyContent: "space-evenly",
          width: constants.width,
          marginVertical: 10,
        }}
        style={{ flex: 1, marginTop: 10 }}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          // if (index === 0) {
          //   return <RoomUserPhoto profilePhoto={item.profilePhoto} />;
          // } else if (item.id === user.id && item.id !== hostID) {
          //   return <MemberYou />;
          // } else if (item.id !== user.id && item.id !== hostID) {
          //   return <Member id={item.id} />;
          // }
          return (
            <RoomUserPhoto
              borderColor="red"
              profilePhoto="https://images.unsplash.com/photo-1596461097642-b697ec879ced?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            />
          );
        }}
      />
    </SafeAreaView>
  );
}
