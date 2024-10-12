import {Edges} from 'react-native-safe-area-context';

/**
 * Returns the edges to be used in a SafeAreaView based on the given options.
 * If `fullscreen` is true, it returns an empty array, meaning the whole screen
 * will be used. If `withoutTopEdge` or `withoutBottomEdge` is true, it returns
 * an array with the respective edge missing. Otherwise, it returns an array
 * with both 'top' and 'bottom' edges.
 */

export const getEdges = (
  fullscreen: boolean,
  withoutTopEdge: boolean,
  withoutBottomEdge: boolean,
): Edges => {
  if (fullscreen) return [];
  if (withoutTopEdge) return ['bottom'];
  if (withoutBottomEdge) return ['top'];
  return ['top', 'bottom'];
};
