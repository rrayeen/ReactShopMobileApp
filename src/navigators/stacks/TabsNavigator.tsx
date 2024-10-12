import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import TabBar from '../../components/TabBarAnimated/TabBar';
import {Colors} from '../../constant/Colors';
import {shadows} from '../../constant/Shadows';
import {useThemeInterpolation} from '../../hooks/useThemeInterpolation';
import {tabConfig} from '../navigatorConfig';
import {TabStackRouts} from '../routes';
import {CartNavigator} from './CartNavgator';
import HomeNavigator from './HomeNavigator';
import {ProfileNavigator} from './ProfileNavigator';
import {RootStackParamList, RootStackScreenProps} from './RootNavigator';
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
