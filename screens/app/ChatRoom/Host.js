import React, { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import constants from "../../../shared/constants";
import RoomUserPhoto from "./RoomUserPhoto";
import {
  getUserInfo,
  getChatroomInfo,
} from "../../../backend/database/apiCalls";

const Host = React.memo(({ roomID }) => {
  const [host, setHost] = useState({
    id: null,
    username: null,
    description: null,
    profilePhoto: undefined,
  });

  useEffect(() => {
    getChatroomInfo(roomID, "host").then((hostID) => {
      getUserInfo(hostID).then((data) => {
        setHost({
          username: data.username,
          description: data.description,
          profilePhoto: data.profile_photo,
        });
      });
    });
  }, []);

  return (
    <TouchableOpacity>
      <View
        style={{
          width: constants.width,
          height: constants.height * 0.1,
          alignItems: "center",
          backgroundColor: constants.background1,
          opacity: 1,
          paddingHorizontal: 10,
          flexDirection: "row",
          borderBottomColor: constants.lineColor,
          borderBottomWidth: 0.2,
        }}
      >
        <TouchableOpacity>
          <RoomUserPhoto profilePhoto={host.profilePhoto} />
        </TouchableOpacity>
        <View
          style={{
            paddingRight: 15,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                color: constants.text1,
                marginLeft: 10,
                fontSize: 20,
                fontWeight: "300",
              }}
            >
              {host.username}
            </Text>
            <Text
              style={{
                color: "grey",
                marginLeft: 10,
                fontSize: 15,
                fontWeight: "300",
              }}
            >
              {host.description}
            </Text>
          </View>
          <Text style={{ fontSize: 20, color: "grey", fontWeight: "300" }}>
            Host
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default Host;
