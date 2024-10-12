import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {useThemeInterpolation} from '../hooks/useThemeInterpolation';
import {Colors} from '../constant/Colors';
import Animated from 'react-native-reanimated';
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
