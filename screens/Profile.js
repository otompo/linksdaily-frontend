import React, { useContext, useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Text from "@kaloraat/react-native-text";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import axios from "axios";
import { Divider } from "react-native-elements";
import { AuthContext } from "../context/auth";
import { LinkContext } from "../context/link";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

function Profile(props) {
  const route = useRoute();
  const [state, setState] = useContext(AuthContext);
  const [links, setLinks] = useContext(LinkContext);
  const [userLinks, setUserLinks] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const routeParamsId = route?.params?._id;

  useEffect(() => {
    routeParamsId
      ? fetchUserProfile(routeParamsId)
      : fetchUserProfile(state.user._id);
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const { data } = await axios.get(`/api/user-profile/${userId}`);
      //   console.log(data);
      setUserLinks(data.userlinks);
      setUserProfile(data.user);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (linkId) => {
    // console.log(linkId);
    try {
      //   setLoading(true);
      const { data } = await axios.delete(`/api/delete-link/${linkId}`);
      //   setLoading(false);
      //   update user links
      setUserLinks((links) => {
        const index = userLinks.findIndex((l) => l._id === linkId);
        userLinks.splice(index, 1);
        return [...links];
      });
      // update context
      setLinks((links) => {
        const index = links.findIndex((l) => l._id === linkId);
        userLinks.splice(index, 1);
        return [...links];
      });
      alert("Link Deleted");
    } catch (err) {
      console.log(err);
      //   setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/loading.gif")}
          style={{ height: 100, width: 100 }}
        />
      </View>
    );
  }
  return (
    <ImageBackground
      source={require("../assets/backimage.png")}
      style={{ flex: 1, height: "100%" }}
      resizeMode="cover"
      blurRadius={2}
    >
      <Text
        center
        large
        light
        style={{
          color: "#fff",
          paddingTop: 60,
          paddingBottom: 10,
          fontSize: 40,
        }}
      >
        Profile
      </Text>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ alignItems: "center", paddingBottom: 15 }}>
          <Image
            source={{
              uri: userProfile?.image?.url
                ? userProfile.image.url
                : `https://via.placeholder.com/500x500.png?text=Image`,
            }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
            }}
          />
          <Text large color="#fff" style={{ paddingTop: 10 }}>
            {userProfile.name}
          </Text>
          <Text large color="#b3b3b3" style={{ paddingTop: 5 }}>
            {userProfile.role}
          </Text>
          <Text sime color="#b3b3b3" style={{ paddingTop: 5 }}>
            {dayjs(userProfile.createdAt).fromNow()}
          </Text>
        </View>
        <Divider width={1} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingTop: 20 }}>
            <Text bold medium center color="#fff">
              {userLinks.length} Links
            </Text>
            {userLinks.map((link, i) => (
              <View
                key={i}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Text color="#fff">{link?.urlPreview?.ogTitle}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text color="#fff">{link?.views} Views</Text>
                  {state?.user?._id === link?.postedBy._id && (
                    <TouchableOpacity onPress={() => handleDelete(link._id)}>
                      <Icon name="trash" color="#ff0000" size={15} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
          {/* <Text>{JSON.stringify(userLinks, null, 4)}</Text> */}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default Profile;
