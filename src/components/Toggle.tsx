import {View, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../constant/Colors';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
interface toggleProps {
  activated: boolean;
  onPressHandler: () => void;
  size?: number;
}
/**
 * Toggle component that renders a toggle button with a knob that moves
 * between two colors when the component is activated/deactivated.
 *
 * The component takes three props:
 * - `activated`: a boolean that determines whether the toggle is
 *   activated or not.
 * - `onPressHandler`: a function that is called when the toggle is pressed.
 * - `size`: an optional number that determines the size of the toggle
 *   button. Defaults to 32.
 *
 * The component returns a `Pressable` component that contains a `View`
 * with the toggle button and a `Animated.View` with the knob. The knob
 * is animated using `useAnimatedStyle` to move between two states: one
 * when the toggle is activated and one when it is deactivated. The
 * animation is triggered by the `activated` prop.
 */
const Toggle = ({activated, onPressHandler, size = 32}: toggleProps) => {
  const offBackgourndColor = Colors.white;
  const onBackgourndColor = Colors.backgroundDark;
  const KNOB_SIZE = size * 0.8;
  const animatedSwitchedKnob = useAnimatedStyle(() => {
    const [offSetLeft, offSetRight] = [4, 4];
    const start = withTiming(activated ? '100%' : '0%');
    const marginStart = withTiming(
      activated ? -KNOB_SIZE - offSetRight : 0 + offSetLeft,
    );
    return {start, marginStart};
  }, [activated]);
  return (
    <Pressable
      accessibilityRole="togglebutton"
      style={{height: size, width: size * 1.8}}
      onPress={onPressHandler}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: offBackgourndColor,
            height: size,
            width: size * 1.8,
          },
        ]}>
        <Animated.View
          style={[
            styles.inner,
            {backgroundColor: onBackgourndColor},
            useAnimatedStyle(
              () => ({opacity: withTiming(activated ? 1 : 0)}),
              [activated],
            ),
          ]}></Animated.View>
        <Animated.View
          style={[
            styles.toggle,
            animatedSwitchedKnob,
            {width: KNOB_SIZE, height: KNOB_SIZE},
          ]}></Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    overflow: 'hidden',
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 0,
  },
  inner: {
    borderColor: Colors.red,
    overflow: 'hidden',
    position: 'absolute',
    alignItems: 'center',
    paddingStart: 4,
    paddingEnd: 4,
    width: '100%',
    height: '100%',
  },
  toggle: {
    borderRadius: 12,
    position: 'absolute',
    width: 26,
    height: 26,
    backgroundColor: Colors.lightGray,
  },
});

export default Toggle;
