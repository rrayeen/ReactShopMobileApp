import {FasterImageView} from '@candlefinance/faster-image';
import React from 'react';
import {Image, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
interface CustomImageProps {
  source: string;
  height: number | `${number}%`;
  width?: number | `${number}%`;
  resizeMode?: 'contain' | 'cover';
  containerStyle?: StyleProp<ViewStyle>;
}
/**
 * Image component
 * @param source pass string uri for remote images
 * @example
 * source={"example.com"}
 */
export const CImage = ({
  source,
  height,
  width = '100%',
  resizeMode = 'cover',
  containerStyle,
}: CustomImageProps): JSX.Element => {
  return (
    <Animated.View
      style={[styles.imageContainer, containerStyle, {width, height}]}>
      {typeof source === 'string' ? (
        <FasterImageView
          source={{
            cachePolicy: 'discWithCacheControl',
            url: source,
            resizeMode,
            transitionDuration: 0.25,
            progressiveLoadingEnabled: true,
          }}
          style={styles.image}
        />
      ) : (
        <Image source={source} resizeMode={resizeMode} style={styles.image} />
      )}
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  imageContainer: {alignSelf: 'center', overflow: 'hidden'},
  image: {width: '100%', height: '100%'},
});
