import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as color from '../shared/color';

const Review = ({ item }) => (
  <View style={styles.container}>
    <Image  resizeMode="cover" style={styles.avatar} source={{uri: item.image}} />
    <View style={styles.itemText}>
      <View style={{flexDirection: "row"}}>
        <Text numberOfLines={1} style={styles.itemTitle}>{`${item.author.first_name} ${item.author.last_name}`}</Text>
        <AntDesign
          name={item.positive ? "like1" : "dislike1"}
          size={25} color={item.positive ? color.secondaryColor2 : color.secondaryColor3}
          style={styles.likeIcon}
        />
      </View>
      <Text numberOfLines={2} style={styles.itemDescription}>{item.message}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "grey",
    marginRight: 20,
  },
  itemText: {
    flex: 1,
    alignSelf: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
  },
  itemDescription: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 5,
  },
  likeIcon: {
    marginLeft: 10
  }
});

export default Review;