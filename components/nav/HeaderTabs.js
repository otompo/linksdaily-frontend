import React, { useContext } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../../context/auth";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

function HeaderTabs() {
  const [state, setState] = useContext(AuthContext);

  // const handleSignout = async () => {
  //   setState({ token: "", user: null });
  //   await AsyncStorage.removeItem("@auth");
  // };
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate("TrendingLinks")}>
        <Icon name="bell-o" size={25} color="#ff9900" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HeaderTabs;
