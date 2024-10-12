import React, {useMemo} from 'react';
import Animated from 'react-native-reanimated';
import {Colors} from '../constant/Colors';
import {useThemeInterpolation} from '../hooks/useThemeInterpolation';

type SeparatorColor = keyof (typeof Colors)['separator']['light'];

interface SeparatorProps {
  color?: SeparatorColor;
  depth?: number;
  direction?: 'Horizonal' | 'Vertical';
  size: number | `${number}%`;
  mt?: number;
  mb?: number;
}

const Separator = ({
  color = 'main',
  depth = 1,
  direction = 'Horizonal',
  size,
  mt = 0,
  mb = 0,
}: SeparatorProps) => {
  const {animatedStyle} = useThemeInterpolation(
    Colors.separator.light[color],
    Colors.separator.dark[color],
  );
  const separatorStyle = useMemo(
    () => [
      {
        marginTop: mt,
        marginBottom: mb,
        ...(direction === 'Vertical'
          ? {height: size, width: depth}
          : {height: depth, width: size}),
      },
      animatedStyle,
    ],
    [color, depth, direction, size, mt, mb, animatedStyle],
  );

  return <Animated.View style={separatorStyle}></Animated.View>;
};

export default Separator;
