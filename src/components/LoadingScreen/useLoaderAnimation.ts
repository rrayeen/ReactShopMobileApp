import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../utils/dimension';
import {useEffect} from 'react';

export const useLoaderAnimation = () => {
  const margin = 48;
  const progress = useSharedValue(0);

  const animatedBorder = useAnimatedStyle(() => {
    const w = withTiming(
      progress.value > 0.03 && progress.value < 0.3
        ? SCREEN_WIDTH - margin
        : progress.value > 0.3 && progress.value < 0.6
        ? SCREEN_WIDTH / 2 - margin
        : SCREEN_WIDTH / 3 - margin,
      {
        duration: 1250,
      },
    );
    const h = withTiming(
      progress.value > 0.03 && progress.value < 0.3
        ? SCREEN_HEIGHT / 4
        : progress.value > 0.3 && progress.value < 0.6
        ? SCREEN_HEIGHT / 4
        : SCREEN_HEIGHT / 6,
      {
        duration: 1250,
      },
    );
    return {
      width: w,
      height: h,
    };
  });
  const animatedScreen = useAnimatedStyle(() => {
    const left = 10;
    const top = 10;
    const w = withTiming(
      progress.value > 0.03 && progress.value < 0.3
        ? SCREEN_WIDTH - margin - top * 2
        : progress.value > 0.3 && progress.value < 0.6
        ? SCREEN_WIDTH / 2 - margin - top * 2
        : SCREEN_WIDTH / 3 - margin - top * 2,
      {
        duration: 1250,
      },
    );
    const h = withTiming(
      progress.value > 0.03 && progress.value < 0.3
        ? SCREEN_HEIGHT / 4 - top * 2
        : progress.value > 0.3 && progress.value < 0.6
        ? SCREEN_HEIGHT / 4 - top * 2.5
        : SCREEN_HEIGHT / 6 - (top * 2 + 4),
      {
        duration: 1250,
      },
    );

    return {
      width: w,
      left,
      top,
      height: h,
    };
  });
  const animatedButton = useAnimatedStyle(() => {
    const left = withTiming(
      progress.value > 0.03 && progress.value < 0.3
        ? SCREEN_WIDTH / 2 - margin
        : progress.value > 0.3 && progress.value < 0.6
        ? (SCREEN_WIDTH / 2 - margin) / 2 - SCREEN_WIDTH / 14 / 2
        : (SCREEN_WIDTH / 2 - 96) / 2 - SCREEN_WIDTH / 14 / 2,
      {
        duration: 1250,
      },
    );
    const bottom = withTiming(
      progress.value > 0.03 && progress.value < 0.3
        ? -20
        : progress.value > 0.3 && progress.value < 0.6
        ? 0
        : 2.5,
      {
        duration: 1250,
      },
    );

    const w = withTiming(
      progress.value > 0.03 && progress.value < 0.3
        ? SCREEN_WIDTH / 7
        : progress.value > 0.3 && progress.value < 0.6
        ? SCREEN_WIDTH / 14
        : SCREEN_WIDTH / 28,
      {
        duration: 1250,
      },
    );
    const h = withTiming(
      progress.value > 0.03 && progress.value < 0.3
        ? 20
        : progress.value > 0.3 && progress.value < 0.6
        ? 10
        : 10,
      {
        duration: 1250,
      },
    );
    return {
      width: w,
      bottom,
      left,
      height: h,
    };
  });

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, {duration: 4000}), 0, false);
  }, []);
  return {animatedBorder, animatedScreen, animatedButton};
};
