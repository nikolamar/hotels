import React, { useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as color from '../shared/color';
import * as gStyles from "../global-styles";
import config from "../config";
import HotelCard from "../components/hotel-card";

const Hotels = ({
  loading,
  loadingReviews,
  hotels,
  favorites,
  reviews,
  hotelsList, 
  favoritesList,
  favoriteAddRemove,
  reviewsListByHotelId,
}) => {

  const favIds = useMemo(() => new Set(favorites.map(fav => fav.id)), [favorites]);

  useEffect(() => {
    hotelsList();
    favoritesList();
  }, []);

  const header = () => (
    <TouchableOpacity style={styles.loadButton} onPress={hotelsList}>
      {loading ? <ActivityIndicator size="small" color="white" style={{position: "absolute", left: 20}} /> : null}
      <Text style={styles.loadText}>LOAD HOTELS</Text>
    </TouchableOpacity>
  );

  const footer = () => (
    <View style={{height: 100}}></View>
  );

  const renderItem = ({ item }) => {
    const isFavorite = favIds.has(item.id);
    return (
      <HotelCard
        item={item}
        isFavorite={isFavorite}
        isLoadingReviews={loadingReviews === item.id}
        reviews={reviews[item.id]}
        onExpandingReviews={() => reviewsListByHotelId(item.id)}
        onFavoritePress={() => favoriteAddRemove({ is_favorite: !isFavorite, hotel_id: item.id })}
      />
    );
  }

  return (
    <ScrollView style={gStyles.page.container}>
      <FlatList
        data={hotels}
        renderItem={renderItem}
        style={styles.container}
        keyExtractor={(item) => String(item.id)}
        initialNumToRender={config.initialNumToRender}
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "100%",
    flex: 1,
    maxWidth: 800,
    paddingHorizontal: 10,
  },
  hotelContainer: {
    alignSelf: 'center',
    marginTop: 10,
    maxWidth: 800,
    width: "100%",
    flexDirection: "row",
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
  hotelImage: {
    width: "30%",
    height: undefined,
  },
  hotelText: {
    width: "70%",
    padding: 20,
  },
  hotelTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginVertical: 10,
  },
  hotelLocation: {
    fontSize: 16,
    fontWeight: '600'
  },
  hotelDescription: {
    fontSize: 16,
    height: 115,
    overflow: 'hidden',
    marginVertical: 10,
  },
  hotelPrice: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'right'
  },
  hotelBottom: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  hotelDate: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    flex: 1,
    fontSize: 16,
  },
  showReviewButton: {
    width: 150,
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
  }
}) as any;

const mapStateToProps = state => ({
  loading: state.loading.loadingHotels,
  loadingReviews: state.loading.loadingHotelReviews,
  hotels: state.hotels,
  favorites: state.favorites,
  reviews: state.reviews,
});

export default connect(
  mapStateToProps,
  {
    hotelsList: actions.hotelsList,
    favoritesList: actions.favoritesList,
    favoriteAddRemove: actions.favoriteAddRemove,
    reviewsListByHotelId: actions.reviewsListByHotelId,
  }
)(Hotels);