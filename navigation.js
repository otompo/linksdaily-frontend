import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/auth";
import { LinkProvider } from "./context/link";
import ScreensNav from "./components/nav/ScreensNav";

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <LinkProvider>
          <ScreensNav />
        </LinkProvider>
      </AuthProvider>
    </NavigationContainer>
  );

  // return <Signup />;
}
