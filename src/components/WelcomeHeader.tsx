import React, {useMemo} from 'react';
import {Colors} from '../constant/Colors';
import {devices} from '../constant/images';
import useOpacityDelay from '../hooks/useOpacityDelay';
import {useThemeInterpolation} from '../hooks/useThemeInterpolation';
import {CImage} from './CImage';
import TitleWithDelay from './TitleWithDelay';
type Props = {
  title: string;
  subTitle: string;
};

const WelcomeHeader = ({title, subTitle}: Props) => {
  const {animatedStyle} = useThemeInterpolation(
    Colors.backgroud.dark['main'],
    Colors.backgroud.light['main'],
    'backgroundColor',
  );
  const {animatedStyle: delayedOpacity} = useOpacityDelay(0);

  const imageStyle = useMemo(
    () => [
      {
        borderRadius: 1000,
        marginTop: 50,
      },
      animatedStyle,
      delayedOpacity,
    ],
    [animatedStyle, delayedOpacity],
  );
  return (
    <>
      <TitleWithDelay
        text={title}
        color="lightBlue"
        textConatinerStyle={{marginBottom: 10}}></TitleWithDelay>
      <TitleWithDelay text={subTitle} color="darkBlue"></TitleWithDelay>
      <CImage
        source={devices}
        height={150}
        width={150}
        containerStyle={imageStyle}></CImage>
    </>
  );
};

export default WelcomeHeader;
