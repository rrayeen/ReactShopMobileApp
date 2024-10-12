import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {Colors} from '../constant/Colors';
import {useThemeInterpolation} from '../hooks/useThemeInterpolation';
type ViewProps = {
  Styles?: StyleProp<ViewStyle>;
};
type customContainerProps = {
  children?: React.ReactNode;
} & ViewProps;
const Container = ({
  children,
  Styles = {flex: 1, paddingVertical: 20, paddingHorizontal: 16},
}: customContainerProps) => {
  const {animatedStyle} = useThemeInterpolation(
    Colors.backgroud.light['main'],
    Colors.backgroud.dark['main'],
    'backgroundColor',
  );
  return (
    <Animated.View style={[animatedStyle, Styles]}>{children}</Animated.View>
  );
};

export default Container;
