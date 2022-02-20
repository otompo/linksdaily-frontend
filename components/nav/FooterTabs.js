import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Divider } from "react-native-elements";

export const Tab = ({ name, icon, handlePress, screenName, routeName }) => {
  const activeScreenColor = screenName === routeName && "orange";

  return (
    <TouchableOpacity onPress={handlePress}>
      <Icon
        name={icon}
        size={25}
        style={{ marginBottom: 3, alignSelf: "center" }}
        color={activeScreenColor}
      />
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

function FooterTabs() {
  const router = useRoute();
  const navigation = useNavigation();

  return (
    <>
      <Divider width={1} />
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          marginHorizontal: 30,
          justifyContent: "space-between",
        }}
      >
        <Tab
          name="Home"
          icon="home"
          handlePress={() => navigation.navigate("Home")}
          screenName="Home"
          routeName={router.name}
        />
        <Tab
          name="Post Link"
          icon="plus-square"
          handlePress={() => navigation.navigate("PostLink")}
          screenName="PostLink"
          routeName={router.name}
        />
        <Tab
          name="Links"
          icon="list-ol"
          handlePress={() => navigation.navigate("Profile")}
          screenName="Links"
          routeName={router.name}
        />
        <Tab
          name="Account"
          icon="user"
          handlePress={() => navigation.navigate("Account")}
          screenName="Account"
          routeName={router.name}
        />
      </View>
    </>
  );
}

export default FooterTabs;
