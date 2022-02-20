import React from "react";
import { TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function Search({ value, setValue }) {
  return (
    <View>
      <TextInput
        style={{
          paddingHorizontal: 20,
          marginHorizontal: 15,
          marginTop: 15,
          height: 50,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: "#ff9900",
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 8,
        }}
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder="Search..."
        autoCapitalize="none"
      />
    </View>
  );
}

export default Search;
