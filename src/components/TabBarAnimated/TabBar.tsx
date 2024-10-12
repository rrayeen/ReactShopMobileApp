import {View, Text, StyleSheet, LayoutChangeEvent} from 'react-native';
import React, {useEffect, useMemo, useReducer} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {SCREEN_WIDTH} from '../../../utils/dimension';
import Animated from 'react-native-reanimated';
import TabItem from './TabItem';
import {useAnimateTabs} from './animateTabs';
import {useThemeInterpolation} from '../../hooks/useThemeInterpolation';
import {Colors} from '../../constant/Colors';

const tabHeight = 86;
type actiontype = {
  x: number;
  index: number;
};

const TabBar = ({
  state: {index: activeIndex, routes},
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const reducer = (state: any, action: actiontype) => {
    return [...state, {x: action.x, index: action.index}];
  };
  const [layout, dispatch] = useReducer(reducer, []);

  const handleLayout = (e: LayoutChangeEvent, index: number) => {
    dispatch({x: e.nativeEvent.layout.x, index});
  };

  const {animatedStyle} = useAnimateTabs({
    routesNumber: routes.length,
    layout,
    activeIndex,
  });
  const {animatedStyle: animatedBackgroundStyle} = useThemeInterpolation(
    Colors.backgroud.light['main'],
    Colors.backgroud.dark['main'],
  );
  const {animatedStyle: animatedBackgroundContainerStyle} =
    useThemeInterpolation(
      Colors.backgroud.dark['main'],
      Colors.backgroud.light['main'],
    );
  const animatedBallStyle = useMemo(
    () => [animatedBackgroundStyle, animatedStyle],
    [animatedBackgroundStyle, animatedStyle],
  );
  const animatedcontainerStyle = useMemo(
    () => [animatedBackgroundContainerStyle],
    [animatedBackgroundContainerStyle],
  );
  return (
    <Animated.View
      style={[styles.tabBar, styles.tabBarContainer, animatedcontainerStyle]}>
      <Animated.View
        style={[
          styles.activeTab,
          animatedBallStyle,
          {width: SCREEN_WIDTH / routes.length},
        ]}></Animated.View>

      {routes.map((route, i) => {
        const {options} = descriptors[route.key];
        const active = activeIndex === i;
        return (
          <TabItem
            routesNumber={routes.length}
            key={route.key}
            active={active}
            option={options}
            routeName={route.name}
            iconNames={['home', 'user', 'shopping-cart']}
            typeIconNames={['feather', 'feather', 'feather']}
            index={i}
            onLayout={e => {
              handleLayout(e, i);
            }}
            onPress={() => {
              navigation.navigate(route.name);
            }}></TabItem>
        );
      })}
    </Animated.View>
  );
};

export default TabBar;
const styles = StyleSheet.create({
  tabBar: {height: 86},
  activeTab: {
    height: 80,
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
