import React, {memo} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-easy-icon';
import Animated from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {SCREEN_WIDTH} from '../../utils/dimension';
import {Colors} from '../constant/Colors';
import {shadows} from '../constant/Shadows';
import {useThemeInterpolation} from '../hooks/useThemeInterpolation';
import {selectUser} from '../store/authSlice';
import {CImage} from './CImage';
import {CText} from './CText';
import Model from './models/Model';
type layoutTypes = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const HeaderMenu = () => {
  const user = useSelector(selectUser);
  const [open, setOpen] = React.useState(false);
  const [layout, setLayout] = React.useState<layoutTypes>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const {animatedStyle} = useThemeInterpolation(
    Colors.backgroundDark,
    Colors.backgroundLight,
    'color',
  );
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  return (
    <View style={[styles.header, {position: 'relative'}, shadows.medium]}>
      <CImage
        source={user?.icon || ''}
        resizeMode="contain"
        height={60}
        width={60}
        containerStyle={{
          backgroundColor: Colors.lighterBlue,
          borderRadius: 1000,
        }}></CImage>
      <CText size="md_bold" color="main">
        {user?.username}
      </CText>
      <Pressable
        onLayout={e => setLayout(e.nativeEvent.layout)}
        onPress={() => {
          setOpen(prev => !prev);
        }}>
        <AnimatedIcon
          type="antdesign"
          name="downcircle"
          size={36}
          style={animatedStyle}
        />
      </Pressable>
      {open && (
        <Model
          style={{
            position: 'absolute',
            top: layout.y + layout.height,
            left: layout.x + layout.width - SCREEN_WIDTH / 2,
          }}
          setOpen={setOpen}></Model>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.gray,
    borderRadius: 16,
    zIndex: 1,
  },
});

export default memo(HeaderMenu);
