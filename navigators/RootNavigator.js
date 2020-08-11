import React, { useState, useEffect, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  UserDetailsContext,
  IsSignedInContext,
  ThemeProvider,
} from "../shared/Context";
import LogIn from "../screens/root/LogIn";
import SignUp from "../screens/root/SignUp";
import Onboard from "../screens/root/Onboard";
import SetUpProfile from "../screens/root/SetUpProfile";
import EmailVerification from "../screens/root/EmailVerification";
import ForgotPassword from "../screens/root/ForgotPassword";
import SplashScreen from "../screens/root/SplashScreen";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

export default function RootNavigator() {
  const [splashScreen, setSplashScreen] = useState(true);
  const { isSignedIn } = React.useContext(IsSignedInContext);
  const [user, setUser] = useState(null);

  const userDetailsValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    setTimeout(() => {
      setSplashScreen(false);
    }, 1000);
  }, []);

  if (splashScreen) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider>
      <UserDetailsContext.Provider value={userDetailsValue}>
        <NavigationContainer>
          {!isSignedIn ? (
            <AuthStackNavigator />
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="DrawerNavigator"
                component={DrawerNavigator}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </UserDetailsContext.Provider>
    </ThemeProvider>
  );
}

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboard"
        component={Onboard}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SetUpProfile"
        component={SetUpProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
