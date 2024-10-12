import {CompositeScreenProps} from '@react-navigation/native';
import {TabStackRouts} from '../routes';
import {RootStackParamList, RootStackScreenProps} from './RootNavigator';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Profile from '../../models/Tabs/profile/Profile';
import {tabConfig} from '../navigatorConfig';
import HomeNavigator from './HomeNavigator';
import {useThemeInterpolation} from '../../hooks/useThemeInterpolation';
import {Colors} from '../../constant/Colors';
import React, {useMemo} from 'react';
import Icon from 'react-native-easy-icon';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useCTheme} from '../../hooks/useCTheme';
import {shadows} from '../../constant/Shadows';
import TabBar from '../../components/TabBarAnimated/TabBar';
import {ProfileNavigator} from './ProfileNavigator';
import {CartNavigator} from './CartNavgator';
export type TabStackParamList = {
  [TabStackRouts.HOME]: undefined;
  [TabStackRouts.PROFILE]: undefined;
  [TabStackRouts.CART]: undefined;
};
export type TabStackScreenProps<T extends keyof TabStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

const Tab = createBottomTabNavigator<TabStackParamList>();
const TabsNavigatos = () => {
  const {animatedStyle} = useThemeInterpolation(
    Colors.backgroud.light['main'],
    Colors.backgroud.dark['main'],
  );
  const tabBarStyles = useMemo(() => [animatedStyle], [animatedStyle]);
  return (
    <Tab.Navigator
      screenOptions={{
        ...tabConfig,
        tabBarStyle: styles.tabBarStyle,
      }}
      tabBar={props => {
        return <TabBar {...props}></TabBar>;
      }}>
      <Tab.Screen
        name={TabStackRouts.HOME}
        component={HomeNavigator}
        // options={{
        //   tabBarIcon: () => (
        //     <Icon type="feather" name="home" color="black"></Icon>
        //   ),
        // }}
      />
      <Tab.Screen
        name={TabStackRouts.PROFILE}
        component={ProfileNavigator}
        // options={{
        //   tabBarIcon: () => (
        //     <Icon type="feather" name="home" color="black"></Icon>
        //   ),
        // }}
      />
      <Tab.Screen
        name={TabStackRouts.CART}
        component={CartNavigator}
        // options={{
        //   tabBarIcon: () => (
        //     <Icon type="feather" name="home" color="black"></Icon>
        //   ),
        // }}
      />
    </Tab.Navigator>
  );
};
export default TabsNavigatos;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 85,
    ...shadows.large,
  },
  TabBarIcon: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
