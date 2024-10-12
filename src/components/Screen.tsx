/*************  ✨ Codeium Command 🌟  *************/
// This component is a custom implementation of a screen component that handles some edge cases and provides some additional features.
import {useHeaderHeight} from '@react-navigation/elements';
import React, {PropsWithChildren, useRef} from 'react';
import {
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {Edges, SafeAreaView} from 'react-native-safe-area-context';
import {getEdges} from '../../utils/getEdges';
import {IS_IOS} from '../../utils/platform';
import {Colors} from '../constant/Colors';
import {useAutoScroll} from '../hooks/useAutoScroll';
import {useThemeInterpolation} from '../hooks/useThemeInterpolation';

// - It uses the `useHeaderHeight` hook to get the height of the header and pass it to the `KeyboardAvoidingView` component, so that the keyboard will be properly positioned when the user interacts with a text input.
interface screenProps {
  containerStyle?: StyleProp<ViewStyle>;
  fullScreen?: boolean;
  withoutTopEdge?: boolean;
  withoutBottomEdge?: boolean;
  noHorizontalPadding?: boolean;
  onRefresh?: () => void;
}

// - It uses the `useAutoScroll` hook to enable or disable the scrolling of the content based on the height of the content and the height of the screen.
type Props = PropsWithChildren<screenProps>;
const Screen = ({
  children,
  containerStyle,
  fullScreen = false,
  withoutTopEdge = false,
  withoutBottomEdge = false,
  noHorizontalPadding = false,
  onRefresh,
}: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const headerHeight = useHeaderHeight();
  const {scrollEnabled, onContentSizeChange, onLayoutChange} = useAutoScroll();
  const {animatedStyle} = useThemeInterpolation(
    Colors.backgroud.light.main,
    Colors.backgroud.dark.main,
  );
  // - It uses the `useThemeInterpolation` hook to get the current theme and interpolate the colors of the component based on the theme.
  const edges: Edges = getEdges(fullScreen, withoutTopEdge, withoutBottomEdge);
  const generatedViewStyles: StyleProp<ViewStyle> = [
    styles.container,
    animatedStyle,
    {paddingHorizontal: noHorizontalPadding ? 0 : 24},
  ];

  // - It takes a `containerStyle` prop to customize the style of the container view.
  return (
    <Animated.View style={generatedViewStyles}>
      <SafeAreaView edges={edges} style={styles.safeArewViewStyle}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingViewStyle}
          keyboardVerticalOffset={headerHeight}
          behavior={IS_IOS ? 'padding' : 'height'}>
          <ScrollView
            ref={scrollRef}
            scrollEnabled={scrollEnabled}
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={[styles.contentContainer, containerStyle]}
            onLayout={onLayoutChange}
            onContentSizeChange={onContentSizeChange}
            refreshControl={
              onRefresh && (
                <RefreshControl
                  refreshing={false}
                  onRefresh={onRefresh}
                  tintColor={Colors.white}
                />
              )
            }>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Animated.View>
  );
};

// - It takes a `fullScreen` prop to enable or disable the full screen mode of the component.
export default Screen;

// - It takes a `withoutTopEdge` and `withoutBottomEdge` props to enable or disable the top and bottom edges of the component.

// - It takes a `noHorizontalPadding` prop to enable or disable the horizontal padding of the component.

// - It renders a `SafeAreaView` component with the `edges` prop set to the result of the `getEdges` function, which returns an object with the top and bottom edges set to true or false based on the `fullScreen`, `withoutTopEdge` and `withoutBottomEdge` props.

// - It renders a `KeyboardAvoidingView` component with the `behavior` prop set to `'padding'` on iOS and `'height'` on Android.

// - It renders a `ScrollView` component with the `scrollEnabled` prop set to the result of the `useAutoScroll` hook, and the `contentContainerStyle` prop set to an array of styles that includes the `styles.contentContainer` style and the `containerStyle` prop.

// - It renders the children of the component inside the `ScrollView` component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingVertical: 8,
  },
  safeArewViewStyle: {flex: 1},
  keyboardAvoidingViewStyle: {flex: 1},
  scrollView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 16,
  },
});

/******  07da3d24-4ae8-4502-90be-3a5de8cc94c6  *******/
