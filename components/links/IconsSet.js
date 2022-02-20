import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Text from "@kaloraat/react-native-text";
import dayjs from "dayjs";
// import relativeTime from "datjs/pugin/relativeTime";
import { useNavigation } from "@react-navigation/native";

function IconsSet({
  handleLikePress,
  handleUnLikePress,
  showIcons,
  link,
  state,
}) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        top: -180,
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: 20,
        marginLeft: 20,
      }}
    >
      {showIcons && (
        <>
          <View
            style={{
              alignItems: "center",

              //   position: "absolute",
              //   right: 20,
              //   top: 20,
              //   marginHorizontal: 30,
              //   justifyContent: "space-between",
            }}
          >
            <Icon
              name="eye"
              size={25}
              color="#ff9900"
              style={styles.TextShadowStyle}
            />
            <Text
              center
              color="#ff9900"
              style={{
                justifyContent: "center",
              }}
            >
              {link.views}
            </Text>
          </View>
          {link?.likes?.includes(state?.user._id) ? (
            <TouchableOpacity
              style={{
                // position: "absolute",
                // right: 70,
                // top: 20,
                // borderRadius: 30,
                alignItems: "center",
              }}
              onPress={() => handleUnLikePress(link)}
            >
              <Icon
                name="heartbeat"
                size={25}
                color="#ff9900"
                style={styles.TextShadowStyle}
              />
              <Text center color="#ff9900">
                {link?.likes?.length}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                // position: "absolute",
                // right: 70,
                // top: 20,
                // borderRadius: 30,
                alignItems: "center",
              }}
              onPress={() => handleLikePress(link)}
            >
              <Icon
                name="heart"
                size={25}
                color="#ff9900"
                style={styles.TextShadowStyle}
              />
              <Text center color="#ff9900">
                {link?.likes?.length}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
          >
            <Icon
              name="clock-o"
              size={25}
              color="#ff9900"
              style={styles.TextShadowStyle}
            />
            <Text center color="#ff9900">
              {dayjs(link.createdAt).format("DD/MM/YY")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("Profile", {
                name: link.postedBy?.name,
                _id: link.postedBy._id,
              })
            }
          >
            <Icon
              name="user"
              size={25}
              color="#ff9900"
              style={styles.TextShadowStyle}
            />
            <Text center color="#ff9900">
              {link.postedBy?.name}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default IconsSet;

const styles = StyleSheet.create({
  //   shadow: {
  //     shadowColor: "#333",
  //     shadowOpacity: 0.5,
  //     shadowRadius: 5,
  //     /// andrioid
  //     shadowOffset: {
  //       width: 0,
  //       height: 1,
  //     },
  //   },
  TextShadowStyle: {
    textShadowColor: "#333",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
