import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import constants from "../../../shared/constants";
import RoomPhotoTile from "./RoomPhotoTile";
import { getChatroomInfo } from "../../../backend/database/apiCalls";

export default function RoomTile({ id, navigation }) {
  const [room, setRoom] = useState({
    name: null,
    description: null,
    profilePhoto: "",
    members: [],
    host: null,
  });

  useEffect(() => {
    getChatroomInfo(id, "room").then((data) => {
      setRoom({
        name: data.name,
        description: data.description,
        profilePhoto: data.profile_photo,
        host: JSON.parse(data.members).host,
        members: JSON.parse(data.members).members,
      });
    });
  }, []);

  return (
    <TouchableOpacity
      style={{
        width: constants.width,
        height: constants.height * 0.1,
        justifyContent: "center",
        marginHorizontal: 10,
        flexDirection: "row",
      }}
      onPress={() =>
        navigation.navigate("ChatRoomNavigator", {
          screen: "Room",
          params: {
            room: room,
          },
        })
      }
    >
      <View
        style={{
          width: constants.width,
          height: constants.height * 0.1,
          marginLeft: 25,
          alignItems: "center",
          flexDirection: "row",
          borderBottomColor: constants.lineColor,
          borderBottomWidth: 0.2,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("RoomFullPhoto")}
        ></View>

        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              color: constants.text1,
              marginLeft: 10,
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            {room.name}
          </Text>
          <Text
            style={{
              color: "grey",
              marginLeft: 10,
              fontSize: 14,
              fontWeight: "400",
            }}
          >
            {room.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
