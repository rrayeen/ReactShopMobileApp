import {useRef, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';

/**
 * useAutoScroll hook will automatically disable scroll when content is smaller than the scroll view.
 * This is useful when you want to prevent the user from scrolling when there is not enough content.
 *
 * @returns an object with three properties:
 * - scrollEnabled: a boolean indicating whether the scroll is enabled or not.
 * - onContentSizeChange: a function that will be called when the content size of the scroll view changes.
 * - onLayoutChange: a function that will be called when the layout of the scroll view changes.
 */
export const useAutoScroll = () => {
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const scrollViewHeight = useRef<number | null>(null);
  const scrollViewContentHeight = useRef<number | null>(null);

  function updateScrollView() {
    if (
      scrollViewHeight.current === null ||
      scrollViewContentHeight.current === null
    ) {
      return;
    }

    const contentCanFit: boolean = (function () {
      return scrollViewContentHeight.current < scrollViewHeight.current + 1;
    })();

    if (scrollEnabled && contentCanFit) setScrollEnabled(false);
    if (!scrollEnabled && !contentCanFit) setScrollEnabled(true);
  }

  const onLayoutChange = (e: LayoutChangeEvent) => {
    const {height} = e.nativeEvent.layout;
    scrollViewHeight.current = height;
    updateScrollView();
  };

  const onContentSizeChange = (_: number, h: number) => {
    scrollViewContentHeight.current = h;
    updateScrollView();
  };

  updateScrollView();

  return {
    scrollEnabled,
    onContentSizeChange,
    onLayoutChange,
  };
};
