import React from "react";
import { View, Image } from "react-native";

import constants from "../../../shared/constants";
import CachedImage from "../../../shared/CachedImage";

export default function RoomUserPhoto({ profilePhoto, borderColor }) {
  const outerRadius = constants.width * 0.35;
  const innerRadius = constants.width * 0.33;
  return (
    <View
      style={{
        width: outerRadius,
        height: outerRadius,
        borderRadius: outerRadius / 2,
        borderColor: borderColor,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
      }}
    >
      {profilePhoto === undefined ? (
        <View
          style={{
            width: innerRadius,
            height: innerRadius,
            borderRadius: innerRadius / 2,
            backgroundColor: constants.background1,
          }}
        />
      ) : (
        <CachedImage
          style={{
            width: innerRadius,
            height: innerRadius,
            borderRadius: innerRadius / 2,
          }}
          uri={profilePhoto}
        />
      )}
    </View>
  );
}
