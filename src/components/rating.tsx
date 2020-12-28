import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from "react-native";

const Rating = ({ startingValue = 3, imageSize = 25, readonly = false }) => {

  // To set the default Star Selected
  const [defaultRating, setDefaultRating] = useState(startingValue);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  // Filled Star. You can also give the path from local
  const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
  // Empty Star. You can also give the path from local
  const starImageCorner =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

  return (
    <View style={styles.customRatingBarStyle}>
      {maxRating.map((item, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            disabled={readonly}
            onPress={() => setDefaultRating(item)}>
            <Image
              style={styles.starImageStyle}
              source={
                item <= defaultRating
                  ? { uri: starImageFilled }
                  : { uri: starImageCorner }
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  starImageStyle: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
}) as any;

export default Rating;