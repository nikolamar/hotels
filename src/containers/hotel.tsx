import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { connect } from 'react-redux';
import * as actions from '../actions';
import HotelEdit from "../components/hotel-edit";
import { useParams } from "../router";

const Hotel = ({
  loadingHotelDetails,
  reviews,
  hotel,
  hotelById,
  reviewsListByHotelId,
}) => {

  let { id } = useParams();

  useEffect(() => {
    hotelById(id);
    reviewsListByHotelId(id);
  }, []);

  return (
    <View style={styles.container}>
      <HotelEdit
        item={hotel[id]}
        reviews={reviews[id]}
        loadingHotelDetails={loadingHotelDetails}
      />
    </View>
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
}) as any;

const mapStateToProps = state => ({
  loadingHotelDetails: state.loading.loadingHotelDetails,
  reviews: state.reviews,
  hotel: state.hotel,
});

export default connect(
  mapStateToProps,
  {
    hotelById: actions.hotelById,
    reviewsListByHotelId: actions.reviewsListByHotelId,
  }
)(Hotel);