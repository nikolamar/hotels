import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { useHistory } from "../router";
import * as color from '../shared/color';
import * as gStyles from "../global-styles";
import moment from "moment";
import Review from "./review";
import Rating from "./rating";
import { produce } from "immer";

const HotelEdit = ({ item, reviews, loadingHotelDetails }) => {

  const [edit, setEdit] = useState(produce(item, draft => {}));

  const history = useHistory();

  const isEditing = useMemo(() => history.location.pathname.includes("/edit"), [history.location.pathname]);

  const handleEdit = (prop, val) => {
    setEdit({ ...edit, [prop]: val });
  }

  const handleButton = () => {
    if (isEditing) {
      history.push(`/hotel/${item.id}`);
    } else {
      history.push(`/hotel/${item.id}/edit`);
    }
  }

  const renderContent = () => {
    if (loadingHotelDetails) {
      return <ActivityIndicator size="small" color={color.primaryColor} style={styles.loadingDetails} />;
    }

    if (!item?.id) {
      return <View style={styles.networkError}><Text style={styles.networkErrorText}>LOADING PROBLEMS WITH HOTEL DETAILS!</Text></View>;
    }

    if (isEditing) return (
      <View key={item.id} style={styles.row}>
        <Image  resizeMode="cover" style={styles.itemImage} source={{uri: item.image}} />
        <View style={styles.itemText}>
          <Text style={[styles.label, {textAlign: "right"}]}>Rating:</Text>
          <View style={{flexDirection: "row"}}>
            <View style={{flex: 1, marginRight: 20}}>
              <Text style={styles.label}>Name: </Text>
              <TextInput value={edit.name} onChangeText={(val) => handleEdit("name", val)} underlineColorAndroid="transparent" style={gStyles.auth.textInput} />
              <Text style={styles.label}>Location: </Text>
              <TextInput value={edit.country} onChangeText={(val) => handleEdit("country", val)}  underlineColorAndroid="transparent" style={gStyles.auth.textInput} />
            </View>
            <Rating
              readonly={false}
              startingValue={item.stars}
            />
          </View>
          <Text style={styles.label}>Description: </Text>
          <TextInput value={edit.description} onChangeText={(val) => handleEdit("description", val)} underlineColorAndroid="transparent" multiline={true} style={styles.textInputDescription} />
          <Text style={[styles.label, {textAlign: "right"}]}>Price: </Text>
          <TextInput value={edit.price} onChangeText={(val) => handleEdit("price", val)} underlineColorAndroid="transparent" style={[gStyles.auth.textInput, {alignSelf: "flex-end", width: 100}]} />
          <View style={styles.itemBottom}>
            <Text style={styles.itemDate}>{moment(item.date).format('L')}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleButton}
            >
              <Text style={styles.editButtonText}>SAVE HOTEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );

    return (
      <View key={item.id} style={styles.row}>
        <Image  resizeMode="cover" style={styles.itemImage} source={{uri: item.image}} />
        <View style={styles.itemText}>
          <View style={{flexDirection: "row"}}>
            <View style={{flex: 1, marginRight: 20}}>
              <Text numberOfLines={1} style={styles.itemTitle}>{item.name}</Text>
              <Text numberOfLines={1} style={styles.itemLocation}>{`${item.city} - ${item.country}`}</Text>
            </View>
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
              style={styles.editButton}
              onPress={handleButton}
            >
              <Text style={styles.editButtonText}>EDIT HOTEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const renderReviews = () => {
    if (!reviews.length) {
      return <View style={styles.noReviews}><Text style={styles.noReviewsText}>There are no reviews yet 😊</Text></View>
    }
    
    return reviews.map(review => <Review key={review.id} item={review} />);
  }

  return (
    <View style={styles.container}>
      {renderContent()}
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
  label: {
    marginVertical: 5,
    marginHorizontal: 10
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
  editButton: {
    width: 150,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.primaryColor,
  },
  editButtonText: {
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
  networkError: {
    height: 80,
    justifyContent: "center",
  },
  networkErrorText: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  textInputDescription: {
    textAlignVertical: "top",
    backgroundColor: color.secondaryColor,
    borderRadius: 20,
    height: 150,
    padding: 20,
    marginVertical: 5,
  }
}) as any;

export default HotelEdit;