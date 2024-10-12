import {Pressable, StyleSheet, View} from 'react-native';
import {shadows} from '../../constant/Shadows';
import {CImage} from '../CImage';
import {CText} from '../CText';
import {formatCurrency} from '../../../utils/helper';
import {SCREEN_WIDTH} from '../../../utils/dimension';
import {Colors} from '../../constant/Colors';
import {memo} from 'react';

type ProductComponentProps = {
  image: string;
  name: string;
  price: number;
  id: number;
  onClick: () => void;
};

const ProductComponent = ({
  image,
  name,
  price,
  id,
  onClick,
}: // categorie,
ProductComponentProps) => {
  return (
    <View
      style={[
        {
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 30,
        },
        ,
      ]}>
      <Pressable
        onPress={() => {
          onClick();
        }}
        style={[styles.component, shadows.medium]}>
        <CImage height={200} width={'100%'} source={image} />
        <View style={styles.info}>
          <CText color="black" size="md_bold">
            {name}
          </CText>
          <CText color="red" size="md_bold">
            {formatCurrency(price)}
          </CText>
        </View>
      </Pressable>
    </View>
  );
};

export default memo(ProductComponent);

const styles = StyleSheet.create({
  component: {
    height: 250,
    width: SCREEN_WIDTH / 1.3,
    borderRadius: 10,
    backgroundColor: Colors.lighterBlue,
    overflow: 'hidden',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});
