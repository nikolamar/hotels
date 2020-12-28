import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import * as color from '../shared/color';
import moment from "moment";
import { Link } from "../router";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Review from "./review";
import Rating from "./rating";

const HotelCard = ({
  item,
  isFavorite,
  isLoadingReviews,
  onFavoritePress,
  onExpandingReviews,
  reviews
}) => {

  const [expanded, setExpanded] = useState(false);

  const handleExpandingReviews = () => {
    if (!expanded) {
      onExpandingReviews(item);
    }
    setExpanded(!expanded);
  }

  const renderReviews = () => {
    if (expanded) {
      if (!reviews.length) {
        return <View style={styles.noReviews}><Text style={styles.noReviewsText}>There are no reviews yet 😊</Text></View>
      }
      return reviews.map(review => <Review key={review.id} item={review} />);
    }
    return null;
  }

  const renderReviewsLoader = () => {
    if (isLoadingReviews) {
      return <ActivityIndicator size="small" color="white" style={styles.accordionIcon} />
    }

    return (
      <AntDesign
        name={expanded ? "upcircle": "circledown"}
        size={20} color="white"
        style={styles.accordionIcon}
        onPress={onFavoritePress}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View key={item.id} style={styles.row}>
        <Image  resizeMode="cover" style={styles.itemImage} source={{uri: item.image}} />
        <View style={styles.itemText}>
          <View style={{flexDirection: "row"}}>
            <View style={{flex: 1}}>
              <Text numberOfLines={1} style={styles.itemTitle}>{item.name}</Text>
              <Text numberOfLines={1} style={styles.itemLocation}>{`${item.city} - ${item.country}`}</Text>
            </View>
            <Link to={`/hotel/${item.id}`}>
              <Text numberOfLines={1} style={styles.moreDetails}>more details...</Text>
            </Link>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={25} color={color.primaryColor}
              style={{marginRight: 20}}
              onPress={onFavoritePress}
            />
            <Rating
              readonly={true}
              startingValue={item.stars}
            />
          </View>
          <Text style={styles.itemDescription} numberOfLines={6}>{item.description}</Text>
          <Text style={styles.itemPrice}>{`${item.price}€`}</Text>
          <View style={styles.itemBottom}>
            <Text style={styles.itemDate}>{moment(item.date).format('L')}</Text>
            <TouchableOpacity
              style={styles.showReviewButton}
              onPress={handleExpandingReviews}
            >
              {renderReviewsLoader()}
              <Text style={styles.showReviewText}>{expanded ? "HIDE" : "SHOW"} REVIEWS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {renderReviews()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginTop: 10,
    maxWidth: 800,
    width: "100%",
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 3,
      width: 0
    }
  },
  row: {
    flexDirection: "row",
  },
  itemImage: {
    width: "30%",
    height: undefined,
  },
  itemText: {
    width: "70%",
    padding: 20,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 5,
  },
  moreDetails: {
    flex: 1,
    fontSize: 14,
    marginRight: 10,
  },
  itemLocation: {
    fontSize: 16,
    fontWeight: '600'
  },
  itemDescription: {
    fontSize: 16,
    height: 115,
    overflow: 'hidden',
    marginVertical: 10,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'right'
  },
  itemBottom: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  itemDate: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    flex: 1,
    fontSize: 16,
  },
  showReviewButton: {
    width: 200,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.primaryColor,
  },
  showReviewText: {
    fontWeight: `600`,
    color: "white",
  },
  loadButton: {
    flexDirection: "row",
    alignSelf: "flex-start",
    width: 200,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: color.primaryColor,
  },
  loadText: {
    color: "white",
    fontWeight: `600`,
  },
  noReviews: {
    height: 80,
    justifyContent: "center",
  },
  noReviewsText: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  accordionIcon: {
    position: "absolute",
    left: 15,
  }
}) as any;

export default HotelCard;