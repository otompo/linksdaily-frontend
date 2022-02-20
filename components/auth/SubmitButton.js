import React from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import Text from "@kaloraat/react-native-text";

function SubmitButton({ title, handleSubmit, loading }) {
  return (
    <TouchableOpacity
      onPress={handleSubmit}
      style={{
        backgroundColor: "#ff9900",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        marginHorizontal: 15,
        borderRadius: 24,
      }}
    >
      <Text bold medium center>
        {loading ? <ActivityIndicator size="large" color="white" /> : title}
      </Text>
    </TouchableOpacity>
  );
}

export default SubmitButton;
