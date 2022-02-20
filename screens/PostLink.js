import React, { useState, useContext } from "react";
import { SafeAreaView, ScrollView, TextInput, View } from "react-native";
import ogs from "@uehreka/open-graph-scraper-react-native";
import Text from "@kaloraat/react-native-text";
import FooterTabs from "../components/nav/FooterTabs";
import SubmitButton from "../components/auth/SubmitButton";
import urlRegex from "url-regex";
import PreviewCard from "../components/links/PreviewCard";
import axios from "axios";
import { LinkContext } from "../context/link";

function PostLink({ navigation }) {
  // context
  const [links, setLinks] = useContext(LinkContext);

  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [urlPreview, setUrlPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = async (text) => {
    try {
      setLoading(true);
      setLink(text);
      if (urlRegex({ strict: false }).test(text)) {
        ogs({ url: text }, (error, results, response) => {
          // console.log(error);
          //   console.log(response);
          //   console.log(results);
          if (results.success) {
            setUrlPreview(results);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!link || !title) {
      alert("Paste url and give it a nice title");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/post-link`, {
        link,
        title,
        urlPreview,
      });
      //   console.log(data);
      //   update link context
      setLinks([data, ...links]);
      setTimeout(() => {
        alert("Link Created Successfully");
        navigation.navigate("Home");
      }, 500);
      setLoading(false);
    } catch (err) {
      console.log("ERROR", err);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginVertical: 15 }}
      >
        <Text light center style={{ paddingTop: 25 }}>
          PASTE WEBSITE URL
        </Text>
        <TextInput
          value={link}
          onChangeText={(text) => handleChange(text)}
          placeholder="Paste the url"
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            borderWidth: 1,
            borderColor: "grey",
            height: 50,
            marginVertical: 15,
            marginHorizontal: 15,
            borderRadius: 30,
            padding: 15,
          }}
        />
        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Enter title"
          autoCapitalize="sentences"
          style={{
            borderWidth: 1,
            borderColor: "grey",
            height: 50,
            marginVertical: 15,
            marginHorizontal: 15,
            borderRadius: 30,
            padding: 15,
          }}
        />
        {urlPreview.success && (
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <PreviewCard {...urlPreview} />
          </View>
        )}
        <View style={{ paddingTop: 10 }}>
          <SubmitButton
            title="Submit"
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </View>
        {/* <Text>{JSON.stringify(urlPreview, null, 4)}</Text> */}
      </ScrollView>

      <FooterTabs />
    </SafeAreaView>
  );
}

export default PostLink;
