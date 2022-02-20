import React, { useContext, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import FooterTabs from "../components/nav/FooterTabs";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { Divider } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

function Account({ navigation }) {
  const [state, setState] = useContext(AuthContext);

  // console.log(state);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState("");

  const [image, setImage] = useState({
    url: "",
    public_id: "",
  });

  useEffect(() => {
    if (state) {
      const { name, email, image, role } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
      setImage(image);
    }
  }, [state]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/update-password", { password });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        alert("Password Updated");
        setPassword("");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      alert("Password change failed. Try again.");
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    // console.log(permissionResult);
    if (permissionResult.granted !== true) {
      alert("Camera access is required");
      return;
    }
    // get image fro user
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
    // console.log(pickeResult);
    if (!pickerResult.cancelled) {
      let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
      // save image to state for preview
      // console.log(base64Image);
      setUploadImage(base64Image);
      // send to backend for uploading to clouldnary

      const { data } = await axios.post(`/api/upload-image`, {
        image: base64Image,
      });
      // console.log(data);
      // update user async storage
      const as = JSON.parse(await AsyncStorage.getItem("@auth"));
      // it has {user:{}, token}
      as.user = data;
      // console.log("UPDATED DATA", data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      // update  constext
      setState({ ...state, user: data });
      setImage(data.image);
      alert("Profile image saved successfully");
    }
  };

  const handleLogoutSubmit = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
  };
  return (
    <KeyboardAwareScrollView
      // extraScrollHeight={100} // (when scroll)to have extra height between keyboard and text input
      enableOnAndroid={true}
      // extraHeight={80} // make some height so the keyboard wont cover other component
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} // make the scrollView full screen
    >
      <ScrollView contentContainerStyle={{ marginVertical: 50 }}>
        <CircleLogo>
          {image && image.url ? (
            <Image
              source={{ uri: image.url }}
              style={{
                height: 180,
                width: 180,
                borderRadius: 100,
                marginVertical: 20,
              }}
            />
          ) : uploadImage ? (
            <Image
              source={{ uri: uploadImage }}
              style={{
                height: 180,
                width: 180,
                borderRadius: 100,
                marginVertical: 20,
              }}
            />
          ) : (
            <TouchableOpacity onPress={() => handleUpload()}>
              <Icon name="camera" size={40} color="orange" />
            </TouchableOpacity>
          )}
        </CircleLogo>
        {image && image.url ? (
          <TouchableOpacity onPress={() => handleUpload()}>
            <Icon
              name="camera"
              size={30}
              color="orange"
              style={{
                marginTop: 10,
                // marginLeft: 105,
                marginBottom: 5,
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <Text title center style={{ paddingBottom: -25 }}>
          {name}
        </Text>
        <Text medium center style={{ paddingBottom: 10 }}>
          {email}
        </Text>
        <Text small center light style={{ paddingBottom: 10 }}>
          {role}
        </Text>
        <UserInput
          name="NAME"
          value={name}
          setValue={setName}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />
        <SubmitButton
          title="Update"
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <SubmitButton
          title="Sign Out"
          handleSubmit={handleLogoutSubmit}
          loading={loading}
        />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

export default Account;
