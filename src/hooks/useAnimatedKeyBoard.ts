import {useAnimatedKeyboard, useAnimatedStyle} from 'react-native-reanimated';

const useAnimatedKeyBoard = () => {
  const keyboard = useAnimatedKeyboard();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: -keyboard.height.value}],
  }));
  return {animatedStyle};
};

export default useAnimatedKeyBoard;
