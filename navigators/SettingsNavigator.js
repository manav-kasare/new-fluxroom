import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Settings from "../screens/app/UserProfile/Settings/Settings";
import ChangePassword from "../screens/app/UserProfile/Settings/ChangePassword";

const Stack = new createStackNavigator();

export default function SettingsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
