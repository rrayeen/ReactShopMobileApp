import {
  View,
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
  PressableProps,
  StyleSheet,
} from 'react-native';
import React, {useMemo} from 'react';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {Colors} from '../../constant/Colors';
import {useThemeInterpolation} from '../../hooks/useThemeInterpolation';
import {CText, TextColors, TextSizes} from '../CText';
import Icon, {IconType} from 'react-native-easy-icon/src/Icon';

type PRH<T extends string, K> = Partial<Record<T, K>> | undefined;

type ButtonTypes = keyof typeof $buttonTypesColor.light;
interface CustomButtonProps extends PressableProps {
  text: string;
  textSize?: TextSizes;
  buttonType?: ButtonTypes;
  mb?: number;
  mt?: number;
  mr?: number;
  ml?: number;
  style?: StyleProp<ViewStyle>;
  height?: number | `${number}%`;
  width?: number | `${number}%`;
  iconPosition?: 'left' | 'right';
  iconType?: IconType;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
}

const AnimatedPressabel = Animated.createAnimatedComponent(Pressable);

const CButton = ({
  text,
  textSize,
  buttonType = 'primary',
  mb,
  mt,
  mr,
  ml,
  style,
  height,
  width,
  iconType,
  iconName,
  iconColor,
  iconSize = 16,
  iconPosition = 'left',
  ...PressableProps
}: CustomButtonProps) => {
  const {animatedStyle} = useThemeInterpolation(
    Colors.button.light[buttonType],
    Colors.button.dark[buttonType],
  );
  const opacity = useSharedValue(1);
  const handlePressIn = () => {
    opacity.value = withSpring(0.65, {duration: 150});
  };
  const handlePressOut = () => {
    opacity.value = withSpring(1, {duration: 250});
  };
  const containerStyle = useMemo(() => {
    return [
      styles.container,
      animatedStyle,
      !!mt && {marginTop: mt},
      !!mb && {marginBottom: mb},
      !!mr && {marginRight: mr},
      !!ml && {marginLeft: ml},
      !!width && {width: width},
      style,
      {opacity},
    ];
  }, [style, mt, mb, mr, ml, animatedStyle, opacity, width]);
  const buttonStyle = useMemo(() => {
    return [
      styles.baseButton,
      !!PressableProps.disabled && styles.disabledButton,
      buttonTypesStyle?.[buttonType] ?? {},
      !!height && {height: height},
    ];
  }, [height, buttonType, PressableProps.disabled, buttonTypesStyle]);
  return (
    <Animated.View style={containerStyle}>
      <AnimatedPressabel
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={buttonStyle}
        accessibilityRole={'button'}
        {...PressableProps}>
        {iconPosition === 'left' && iconType && iconName && (
          <Icon
            type={iconType}
            name={iconName}
            color={iconColor}
            size={iconSize}
            style={{marginRight: 8}}></Icon>
        )}
        <CText
          isCentred
          size={textSize ?? $textData[buttonType].size}
          color={$textData[buttonType].color}
          style={styles.baseText}>
          {text}
        </CText>
        {iconPosition === 'right' && iconType && iconName && (
          <Icon
            type={iconType}
            name={iconName}
            color={iconColor}
            size={iconSize}
            style={{marginLeft: 8}}></Icon>
        )}
      </AnimatedPressabel>
    </Animated.View>
  );
};

const $buttonTypesColor = {
  ...Colors.button,
};
const $textData: Record<ButtonTypes, {color: TextColors; size: TextSizes}> = {
  primary: {
    color: 'black',
    size: 'md_bold',
  },
  secondary: {
    color: 'white',
    size: 'md_bold',
  },
  success: {
    color: 'white',
    size: 'lg_bold',
  },
  danger: {
    color: 'lighterPink',
    size: 'lg_bold',
  },
};

const styles = StyleSheet.create({
  container: {width: '100%', borderRadius: 6},
  baseButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    borderRadius: 6,
  },
  baseText: {
    flexShrink: 1,
    flexGrow: 0,
    textAlign: 'center',
    zIndex: 10,
  },
  disabledButton: {
    opacity: 0.4,
  },
});

const buttonTypesStyle: PRH<ButtonTypes, ViewStyle> = StyleSheet.create({
  danger: {height: 80},
});

export default CButton;
