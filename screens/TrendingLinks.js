import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import FooterTabs from "../components/nav/FooterTabs";
import { LinkContext } from "../context/link";
import axios from "axios";
import PreviewCard from "../components/links/PreviewCard";

const TrendingLinks = ({ navigation }) => {
  const [links, setLinks] = useContext(LinkContext);
  const [state, setState] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLinks();
  }, []);
  const loadLinks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/read-links`);
      setLinks(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const handlePress = async (link) => {
    await axios.put(`/api/view-count/${link._id}`);
    // update link in the context

    setLinks(() => {
      const index = links.findIndex((l) => l._id === link._id);
      link[index] = { ...link, views: link.views + 1 };
      return [...links];
    });
    navigation.navigate("LinkView", { link });
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
      source={require("../assets/trendingImg.jpg")}
      style={{ flex: 1, height: "100%" }}
      resizeMode="cover"
    >
      <Text
        center
        title
        light
        color="#fff"
        style={{ paddingTop: 40, paddingBottom: 20 }}
      >
        Trending Links
      </Text>
      <RenderLinks
        links={
          links &&
          links.sort((a, b) => (a.views < b.views ? 1 : -1)).slice(0, 5)
        }
        handlePress={handlePress}
      />
      <View style={{ paddingBottom: 3, marginTop: -5 }}>
        <Text center title light color="#fff">
          Lastest Links
        </Text>
      </View>
      <RenderLinks
        links={
          links &&
          links.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 5)
        }
        handlePress={handlePress}
      />

      {/* <FooterTabs /> */}
    </ImageBackground>
  );
};

const RenderLinks = ({ links, handlePress }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={{
      paddingBottom: 10,
      marginBottom: -30,
    }}
  >
    {links &&
      links.map((link, i) => (
        <View
          key={i}
          style={{
            alignItems: "center",
            width: 330,
            height: 240,
          }}
        >
          <PreviewCard
            {...link.urlPreview}
            handlePress={handlePress}
            link={link}
            showIcons={true}
          />
        </View>
      ))}
  </ScrollView>
);

export default TrendingLinks;
