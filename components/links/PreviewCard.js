import React, { useContext, useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Text from "@kaloraat/react-native-text";
import axios from "axios";
import { LinkContext } from "../../context/link";
import { AuthContext } from "../../context/auth";
import IconsSet from "./IconsSet";

function PreviewCard({
  ogTitle = "Untitled",
  ogDescription = "No description found...",
  ogImage = { url: "https://via.placeholder.com/500x500.png?text=Image" },
  handlePress = (f) => f,
  link = {},
  showIcons = false,
}) {
  const [links, setLinks] = useContext(LinkContext);
  const [state, setState] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleLikePress();
  }, [loading]);

  const handleLikePress = async (link) => {
    // console.log("Like", link._id);
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/like`, { linkId: link._id });
      setLinks((links) => {
        const index = links.findIndex((l) => l._id == link._id);
        data.postedBy = state.user;
        links[index] = data;
        return [...links];
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleUnLikePress = async (link) => {
    // console.log("Like", link._id);
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/unlike`, { linkId: link._id });
      setLinks((links) => {
        const index = links.findIndex((l) => l._id == link._id);
        data.postedBy = state.user;
        links[index] = data;
        return [...links];
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const ogImageUrl = (ogImage) => {
    if (ogImage?.url) {
      return ogImage.url;
    } else if (ogImage?.length > 0) {
      return ogImage[0].url;
    } else {
      return "https://via.placeholder.com/500x500.png?text=Image";
    }
  };
  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: 290,
        width: "92%",
        borderRadius: 30,
        shadowProp: {
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
        elevation: 2,
        marginBottom: 30,
      }}
    >
      <Image
        source={{ uri: ogImageUrl(ogImage) }}
        style={{
          height: "70%",
          width: "100%",
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
        }}
      />
      <View style={showIcons ? { marginBottom: -20 } : { marginBottom: 30 }}>
        <IconsSet
          handleLikePress={handleLikePress}
          handleUnLikePress={handleUnLikePress}
          showIcons={showIcons}
          link={link}
          state={state}
        />
      </View>

      <TouchableOpacity
        onPress={() => handlePress(link)}
        style={{ marginTop: -27 }}
      >
        <View style={{ padding: 5, height: 50 }}>
          <Text title style={{ fontSize: 12, fontWeight: "bold" }}>
            {ogTitle}
          </Text>
          <Text semi style={{ fontSize: 11 }}>
            {ogDescription}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default PreviewCard;
