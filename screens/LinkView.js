import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

const LinkView = ({ route }) => {
  const [weblink, setWeblink] = useState("");
  useEffect(() => {
    if (route.params?.link) {
      if (route.params.link.link.includes("http" || "https")) {
        setWeblink(route.params.link.link);
      } else {
        setWeblink(`http://${route.params.link.link}`);
      }
    }
  }, [route.params.link.link]);

  const LoadingIndicatorView = () => {
    return <ActivityIndicator color="#009b88" size="large" />;
  };

  return (
    <WebView
      source={{ uri: weblink }}
      renderLoading={LoadingIndicatorView}
      startInLoadingState={true}
    />
  );
};

export default LinkView;
