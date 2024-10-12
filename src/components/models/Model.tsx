import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Pressable,
} from 'react-native';
import React, {useMemo} from 'react';
import {CText} from '../CText';
import Toggle from '../Toggle';
import Icon from 'react-native-easy-icon';
import {useCTheme} from '../../hooks/useCTheme';
import {Colors} from '../../constant/Colors';
import {SCREEN_WIDTH} from '../../../utils/dimension';
import {useThemeInterpolation} from '../../hooks/useThemeInterpolation';
import Animated from 'react-native-reanimated';
import {Logout} from '../../react-query/queries/auth/authQueries';
import Separator from '../Separator';
type ModelProps = {
  style?: StyleProp<ViewStyle>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Model = ({style, setOpen}: ModelProps) => {
  const {mutate} = Logout();
  const {isLightTheme, toggleTheme} = useCTheme();
  const {animatedStyle} = useThemeInterpolation(
    Colors.backgroud.light['main'],
    Colors.backgroud.dark['main'],
    'backgroundColor',
  );
  const {animatedStyle: closeIconStyle} = useThemeInterpolation(
    Colors.backgroud.dark['main'],
    Colors.backgroud.light['main'],
    'color',
  );
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const containerStyle = useMemo(
    () => [
      animatedStyle,
      styles.container,
      {
        borderColor: isLightTheme
          ? Colors.backgroundDark
          : Colors.backgroundLight,
      },
      style,
    ],
    [animatedStyle, isLightTheme],
  );
  const animatedIconStyle = useMemo(() => [closeIconStyle], [closeIconStyle]);

  return (
    <Animated.View style={containerStyle}>
      <Pressable
        onPress={() => setOpen(false)}
        style={[styles.children, {justifyContent: 'flex-end'}]}>
        <AnimatedIcon
          type="material-community"
          name="close-circle-outline"
          size={28}
          style={animatedIconStyle}></AnimatedIcon>
      </Pressable>
      <Separator color="main" size={'100%'}></Separator>
      <View style={styles.children}>
        <CText size="md_bold">Theme</CText>
        <Toggle
          size={20}
          activated={isLightTheme}
          onPressHandler={() => toggleTheme()}></Toggle>
      </View>
      <Separator color="main" size={'100%'}></Separator>
      <Pressable
        onPress={() => mutate()}
        style={[styles.children, {backgroundColor: Colors.red}]}>
        <CText size="md_bold" color="lightPink">
          Log out
        </CText>
        <Icon
          type="material-community"
          name="logout"
          size={20}
          color={Colors.lightPink}></Icon>
      </Pressable>
    </Animated.View>
  );
};

export default Model;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH / 2,
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  children: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
