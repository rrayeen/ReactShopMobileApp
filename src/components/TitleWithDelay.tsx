import {View, ViewStyle, StyleProp} from 'react-native';
import React, {useMemo} from 'react';
import useOpacityDelay from '../hooks/useOpacityDelay';
import {CText, CustomProps, TextSizes} from './CText';
type Props = {
  text: string;
  textConatinerStyle?: StyleProp<ViewStyle>;
  size?: TextSizes;
  color?: CustomProps['color'];
};

const TitleWithDelay = ({
  text,
  textConatinerStyle,
  size = 'xxxl_bold',
  color = 'main',
}: Props) => {
  const title: string[] = text.split(' ');
  return (
    <View
      style={[
        {justifyContent: 'center', flexDirection: 'row', gap: 10},
        textConatinerStyle,
      ]}>
      {title.map((item, index) => {
        const {animatedStyle} = useOpacityDelay(index);
        const textStyle = useMemo(() => [animatedStyle], [animatedStyle]);
        return (
          <CText key={index} style={[textStyle]} color={color} size={size}>
            {item}
          </CText>
        );
      })}
    </View>
  );
};

export default TitleWithDelay;
