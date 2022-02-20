import React from "react";
import { View, Image, Text } from "react-native";

function CircleLogo({ children }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        // paddingTop: 10,
        // paddingBottom: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          height: 190,
          width: 190,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children ? (
          children
        ) : (
          <Image
            source={require("../../assets/logos.png")}
            style={{
              width: 300,
              height: 300,
              // marginTop: -30,
              marginVertical: 30,
              marginHorizontal: 30,
            }}
          />
        )}
      </View>
    </View>
  );
}

export default CircleLogo;
