import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import FooterTabs from "../components/nav/FooterTabs";
import { LinkContext } from "../context/link";
import axios from "axios";
import PreviewCard from "../components/links/PreviewCard";
import SubmitButton from "../components/auth/SubmitButton";
import Search from "../components/links/Search";

const Home = ({ navigation }) => {
  const [links, setLinks] = useContext(LinkContext);
  const [state, setState] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [linksCount, setLinksCount] = useState(0);
  const [keyword, setKeyword] = useState("");
  // console.log(links);

  useEffect(() => {
    loadLinks();
  }, [page]);

  // when ever page changers we make a request to the backend
  //
  const loadLinks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/read-links/${page}`);
      setLinks([...links, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadLinksCount = async () => {
      const { data } = await axios.get(`/api/links-count`);
      setLinksCount(data);
    };
    loadLinksCount();
  }, []);

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

  const searched = (keyword) => (item) => {
    return item.title.toLowerCase().includes(keyword.toLowerCase());
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
    <>
      <Search value={keyword} setValue={setKeyword} />

      <SafeAreaView style={{ flex: 1 }}>
        <Text center title light style={{ paddingTop: 10, paddingBottom: 10 }}>
          Recent Links
        </Text>
        {/* <Text medium>Welcome: {state.user.name} </Text> */}

        <ScrollView showsVerticalScrollIndicator={true}>
          {links &&
            links.filter(searched(keyword)).map((link, i) => (
              <View key={i} style={{ marginTop: 20, alignItems: "center" }}>
                <PreviewCard
                  {...link.urlPreview}
                  handlePress={handlePress}
                  link={link}
                  showIcons={true}
                />
              </View>
            ))}

          {linksCount > links?.length && (
            <SubmitButton
              title="Load more"
              handleSubmit={() => setPage(page + 1)}
            />
          )}
          {/* <Text>{JSON.stringify(links, null, 4)}</Text> */}
        </ScrollView>
        <FooterTabs />
      </SafeAreaView>
    </>
  );
};

export default Home;
