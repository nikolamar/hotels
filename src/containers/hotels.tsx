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