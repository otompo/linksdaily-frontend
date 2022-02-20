import React, { useContext } from "react";
import { View, SafeAreaView } from "react-native";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import FooterTabs from "../components/nav/FooterTabs";

function Links() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Links Screen</Text>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
}

export default Links;
