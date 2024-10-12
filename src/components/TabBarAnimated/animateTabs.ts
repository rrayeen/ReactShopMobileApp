import {useEffect} from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {Colors} from '../../constant/Colors';
import {useCTheme} from '../../hooks/useCTheme';
interface animatedProps {
  layout: any;
  activeIndex: number;
  routesNumber: number;
}

export const useAnimateTabs = ({
  routesNumber,
  layout,
  activeIndex,
}: animatedProps) => {
  const initialOffsetValue = 6;
  const offset = useSharedValue<number>(initialOffsetValue);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));
  useEffect(() => {
    offset.value = withTiming(
      layout.length ? layout[activeIndex].x - 23 / 2 : initialOffsetValue,
      {
        duration: 300,
      },
    );
  }, [activeIndex]);
  return {animatedStyle};
};
export const useAnimatedFont = (fontSize: number, active: boolean) => {
  const {isLightTheme} = useCTheme();

  const animatedFont = useAnimatedStyle(() => ({
    fontSize: withTiming(active ? fontSize * 1.5 : fontSize, {duration: 300}),
    color: withTiming(
      isLightTheme
        ? active
          ? Colors.backgroud.dark['main']
          : Colors.backgroud.light['main']
        : active
        ? Colors.backgroud.light['main']
        : Colors.backgroud.dark['main'],
      {duration: 300},
    ),
  }));
  return {animatedFont};
};

export const useAnimatedText = (active: boolean, fontSize: number) => {
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(active ? 0 : 1, {duration: 300}),
    fontSize: withTiming(active ? 0 : fontSize, {duration: 300}),
  }));
  return {animatedStyle};
};

export const useAnimatedCartLength = (length: number) => {
  const ANGLE = 10;
  const TIME = 100;
  const EASING = Easing.elastic(1.5);
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${rotation.value}deg`}],
  }));

  useEffect(() => {
    rotation.value = withSequence(
      // deviate left to start from -ANGLE
      withTiming(-ANGLE, {duration: TIME / 2, easing: EASING}),
      // wobble between -ANGLE and ANGLE 7 times
      withRepeat(
        withTiming(ANGLE, {
          duration: TIME,
          easing: EASING,
        }),
        7,
        true,
      ),
      // go back to 0 at the end
      withTiming(0, {duration: TIME / 2, easing: EASING}),
    );
  }, [length]);
  return {animatedStyle};
};
