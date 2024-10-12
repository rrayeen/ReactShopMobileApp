import {View, Text} from 'react-native';
import React from 'react';
import {CImage} from './CImage';
import {empty} from '../constant/images';
import {SCREEN_WIDTH} from '../../utils/dimension';
import {CText} from './CText';

const EmptyComponent = ({msg}: {msg: string}) => {
  return (
    <View>
      <CImage
        source={empty}
        resizeMode="contain"
        height={400}
        width={SCREEN_WIDTH * 1}></CImage>
      <CText isCentred color="main" size="xxl_bold">
        {msg}{' '}
      </CText>
    </View>
  );
};

export default EmptyComponent;
