import {
  View,
  Text,
  StyleSheet,
  Pressable,
  LayoutChangeEvent,
} from 'react-native';
import React, {useMemo} from 'react';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-easy-icon';
import {SCREEN_WIDTH} from '../../../utils/dimension';
import {
  useAnimatedCartLength,
  useAnimatedFont,
  useAnimatedText,
  useAnimateTabs,
} from './animateTabs';
import Animated from 'react-native-reanimated';
import {useThemeInterpolation} from '../../hooks/useThemeInterpolation';
import {Colors} from '../../constant/Colors';
import {CText} from '../CText';
import {IconType} from 'react-native-easy-icon/src/Icon';
import {useAppSelector} from '../../store/store';
import {selectCart} from '../../store/cartSlice';
import {CartStackRouts, TabStackRouts} from '../../navigators/routes';
interface tabBarComponentProps {
  active: boolean;
  option: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
  routesNumber: number;
  routeName: string;
  iconNames: string[];
  typeIconNames: IconType[];
  index: number;
}
const Icons = Animated.createAnimatedComponent(Icon);
const TabItem = ({
  routesNumber,
  active,
  option,
  onPress,
  routeName,
  onLayout,
  iconNames,
  typeIconNames,
  index,
}: tabBarComponentProps) => {
  const cartLength = useAppSelector(selectCart).length;

  const {animatedFont} = useAnimatedFont(36, active);
  const animatedIcon = useMemo(() => [animatedFont], [animatedFont]);
  const {animatedStyle: textfont} = useAnimatedText(active, 16);
  const {animatedStyle: textColor} = useThemeInterpolation(
    Colors.backgroud.light['main'],
    Colors.backgroud.dark['main'],
    'color',
  );
  const textStyle = useMemo(
    () => [textfont, textColor, {marginTop: 5}],
    [textColor, textfont],
  );
  const {animatedStyle: animatedCart} = useAnimatedCartLength(cartLength);
  return (
    <Pressable
      onPress={onPress}
      onLayout={onLayout}
      style={[styles.container, {width: SCREEN_WIDTH / routesNumber - 25}]}>
      <Icons
        type={typeIconNames[index]}
        name={iconNames[index]}
        style={[animatedIcon]}></Icons>
      <CText
        size="sm_bold"
        color="white"
        isCentred={true}
        style={[textStyle, textColor]}>
        {routeName}
      </CText>
      {/* {routeName === 'Cart' && (
        <Animated.View style={[{position: 'absolute', top: 0, right: 0}]}>
          <Icon
            type="feather"
            name="circle"
            color="red"
            style={{position: 'absolute', top: 7, right: 10, zIndex: 1}}
            size={25}
          />
        </Animated.View>
      )} */}
      {routeName === TabStackRouts.CART && cartLength > 0 && (
        <Animated.View style={[styles.cartStyle, animatedCart]}>
          <CText color="lighterPink" size="sm_bold">
            {cartLength > 9 ? '9+' : cartLength}
          </CText>
        </Animated.View>
      )}
    </Pressable>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
