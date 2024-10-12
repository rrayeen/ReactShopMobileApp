import React from 'react';
import {StatusBar} from 'react-native';
import {useCTheme} from '../hooks/useCTheme';

export const CStatusBar = () => {
  const {isLightTheme} = useCTheme();

  return (
    <StatusBar barStyle={isLightTheme ? 'dark-content' : 'light-content'} />
  );
};
