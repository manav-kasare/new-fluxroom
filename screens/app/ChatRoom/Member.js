import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import constants from "../../../shared/constants";
import RoomUserPhoto from "./RoomUserPhoto";
import { getUserInfo } from "../../../backend/database/apiCalls";

export default function Member({ id }) {
  const [memberInfo, setMemberInfo] = useState({
    username: null,
    description: null,
    profilePhoto: undefined,
  });

  useEffect(() => {
    getUserInfo(id).then((data) => {
      setMemberInfo({
        username: data.username,
        description: data.description,
        profilePhoto: data.profile_photo,
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
        }}
      >
        <TouchableOpacity>
          <RoomUserPhoto profilePhoto={memberInfo.profilePhoto} />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              color: constants.text1,
              marginLeft: 10,
              fontSize: 20,
              fontWeight: "300",
            }}
          >
            {memberInfo.username}
          </Text>
          <Text
            style={{
              color: "grey",
              marginLeft: 10,
              fontSize: 15,
              fontWeight: "300",
            }}
          >
            {memberInfo.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
