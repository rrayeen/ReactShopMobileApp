import {useEffect} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const useOpacityDelay = (index: number) => {
  const opacity = useSharedValue<number>(0);
  const duration = 1000;
  const delay = index * 500;
  useEffect(() => {
    opacity.value = 1;
  });
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withDelay(delay, withTiming(opacity.value, {duration: duration})),
  }));
  return {
    animatedStyle,
  };
};

export default useOpacityDelay;
