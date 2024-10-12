import React from 'react';
import CButton from './CButton';
import {SCREEN_WIDTH} from '../../../utils/dimension';

const BackButton = ({backVoid}: {backVoid: () => void}) => {
  return (
    <CButton
      text={'Go Back'}
      width={SCREEN_WIDTH / 4}
      height={40}
      onPress={backVoid}
      buttonType="primary"
      style={[{position: 'absolute', top: 20, left: 0}]}
      iconPosition="left"
      iconType="antdesign"
      iconName="back"
      iconColor="black"
      iconSize={16}
    />
  );
};

export default BackButton;
