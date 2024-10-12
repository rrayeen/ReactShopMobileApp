import React, {useMemo} from 'react';
import Screen from '../Screen';
import {CText} from '../CText';
import {View} from 'react-native';
import {useLoaderAnimation} from './useLoaderAnimation';
import Animated from 'react-native-reanimated';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../utils/dimension';
import {Colors} from '../../constant/Colors';

const Loader = () => {
  const {animatedBorder, animatedScreen, animatedButton} = useLoaderAnimation();
  const borderStyle = useMemo(() => [animatedBorder], [animatedBorder]);
  const screenStyle = useMemo(() => [animatedScreen], [animatedScreen]);
  const buttonStyle = useMemo(() => [animatedButton], [animatedButton]);
  return (
    <Screen
      containerStyle={{justifyContent: 'center', alignItems: 'center'}}
      noHorizontalPadding
      fullScreen>
      <Animated.View
        style={[
          borderStyle,
          {
            backgroundColor: Colors.black,
            //height: SCREEN_HEIGHT / 6,
            position: 'relative',
            // width: SCREEN_WIDTH / 3 - 48,
            marginLeft: 24,
            borderRadius: 12,
          },
        ]}>
        <Animated.View
          style={[
            screenStyle,
            {
              borderRadius: 12,
              backgroundColor: Colors.blue,
              // height: SCREEN_HEIGHT / 6 - 24,
              //top: 10,
              //left: 10,
              //width: SCREEN_WIDTH / 3 - 48 - 20,
              position: 'absolute',
            },
          ]}></Animated.View>
        <Animated.View
          style={[
            buttonStyle,
            {
              borderRadius: 12,
              backgroundColor: Colors.lighterBlue,
              //  height: 10,
              // bottom: 2.5,
              //left: (SCREEN_WIDTH / 2 - 96) / 2 - SCREEN_WIDTH / 14 / 2,
              //width: SCREEN_WIDTH / 28,
              position: 'absolute',
            },
          ]}></Animated.View>
      </Animated.View>
    </Screen>
  );
};

export default Loader;
