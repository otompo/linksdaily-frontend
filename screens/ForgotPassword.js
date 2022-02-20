import React, { useState, useContext } from "react";
import { View } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API } from "../config";
import axios from "axios";
import { AuthContext } from "../context/auth";

function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [resetCode, setResetCode] = useState("");
  // context
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email) {
      alert("Email fields is required");
      return;
    }
    try {
      const { data } = await axios.post(`/api/forgot-password`, {
        email,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        // console.log("Reset password responce", data);
        alert("Enter the password reset code we send in your email");
        setLoading(false);
        setVisible(true);
      }
    } catch (err) {
      alert("Error sending email. Try again");
      console.log("ERRRROR", err);
      setLoading(false);
    }
  };
  // const loadFromAsyncStorage = async () => {
  //   let data = await AsyncStorage.getItem("@auth");
  //   console.log("FROM ASYNC STORAGE", data);
  // };
  // loadFromAsyncStorage();
  const handlePasswordReset = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        password,
        resetCode,
      });
      // console.log(data);
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        alert("Now you can login with your new password");
        setLoading(false);
        navigation.navigate("Signin");
      }
    } catch (err) {
      alert("Password reset failed. Try again");
      console.log("ERRRROR", err);
      setLoading(false);
    }
  };
  return (
    <KeyboardAwareScrollView
      // extraScrollHeight={100} // (when scroll)to have extra height between keyboard and text input
      enableOnAndroid={true}
      // extraHeight={80} // make some height so the keyboard wont cover other component
      contentContainerStyle={{ flexGrow: 1 }} // make the scrollView full screen
    >
      <View style={{ marginVertical: 100 }}>
        <CircleLogo />
        <Text title center large color="#333" style={{ marginBottom: 60 }}>
          Forgot Password
        </Text>
        <UserInput
          name="EMAIL"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        {visible && (
          <>
            <UserInput
              name="PASSWORD RESET CODE"
              value={resetCode}
              setValue={setResetCode}
              // secureTextEntry={true}
              autoCorrect={false}
            />

            <UserInput
              name="New PASSWORD"
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
              autoCompleteType="password"
            />
          </>
        )}

        <SubmitButton
          title={visible ? "Reset Password" : "Request Reset code"}
          handleSubmit={visible ? handlePasswordReset : handleSubmit}
          loading={loading}
        />

        <Text
          onPress={() => navigation.navigate("Signin")}
          medium
          center
          color="orange"
          style={{ marginTop: 10 }}
        >
          Sign In
        </Text>
        {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default ForgotPassword;
