import React, { useContext, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "../../screens/Signin";
import Signup from "../../screens/Signup";
import Home from "../../screens/Home";
import { AuthContext } from "../../context/auth";
import HeaderTabs from "./HeaderTabs";
import Account from "../../screens/Account";
// import Post from "../../screens/Post";
import Links from "../../screens/Links";
import ForgotPassword from "../../screens/ForgotPassword";
import PostLink from "../../screens/PostLink";
import LinkView from "../../screens/LinkView";
import Profile from "../../screens/Profile";
import TrendingLinks from "../../screens/TrendingLinks";

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
  const [state, setState] = useContext(AuthContext);
  const authenticated = state && state.token !== "" && state.user !== null;

  return (
    <Stack.Navigator
      initialRouteName="Signin"
      //   screenOptions={{ headerShown: false }}
    >
      {authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Links Daily",
              headerRight: () => <HeaderTabs />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: "Back",
            }}
          />
          {/* <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle: "Back",
            }}
          /> */}
          <Stack.Screen
            name="Links"
            component={Links}
            options={{
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen
            name="PostLink"
            component={PostLink}
            options={{
              title: "Post",
              headerRight: () => <HeaderTabs />,
            }}
          />
          <Stack.Screen
            name="LinkView"
            component={LinkView}
            options={{
              title: " ",
              // headerRight: () => <HeaderTabs />,
              // headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={({ route }) => ({
              // title: route.params?.name || "",
              title: "",
              // headerShown: false,
              headerTransparent: true,
              headerBackTitle: "",
              headerTintColor: "#ffffff",
            })}
          />
          <Stack.Screen
            name="TrendingLinks"
            component={TrendingLinks}
            options={{
              title: "",
              headerTransparent: true,
              headerBackTitle: "",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );

  // return <Signup />;
}
