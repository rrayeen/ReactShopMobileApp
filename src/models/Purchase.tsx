import BackButton from '../components/Buttons/BackButton';
import {CText} from '../components/CText';
import Screen from '../components/Screen';
import {ProfileStackScreenProps} from '../navigators/stacks/ProfileNavigator';

import {format} from 'date-fns';
import {View} from 'react-native';
import {formatCurrency} from '../../utils/helper';
import {ProfileStackRouts} from '../navigators/routes';

type itemType = {
  quantity: number;
  name: string;
};

const Purchase = ({navigation, route}: ProfileStackScreenProps<'Purchase'>) => {
  const {
    id,
    created_at,
    deliveredDay,
    items,
    totalItem,
    totalPrice,
    location,
    number,
    username,
  } = route.params;
  const purchaseItems: itemType[] = JSON.parse(items);
  const day = new Date(deliveredDay);
  // const difference = deliveredDay - new Date().getTime();
  const difference = Math.ceil(
    (deliveredDay - new Date().getTime()) / (60 * 1000 * 60 * 24),
  );
  const futureDate = format(day, 'dd MMMM yyyy');

  return (
    <Screen
      containerStyle={{
        paddingTop: 80,
        paddingBottom: 50,
        position: 'relative',
        flexDirection: 'column',
      }}>
      <BackButton
        backVoid={() => navigation.replace(ProfileStackRouts.PROFILE)}
      />
      <CText isCentred color="darkGray" size="xxxl_bold">
        {format(created_at, 'dd MMMM yyyy')}
      </CText>
      <View style={{marginVertical: 50}}>
        {purchaseItems.map((item, index) => (
          <CText size="xl_bold" key={index}>
            {`\u2022`}
            <CText size="xl_bold" key={index} color="salmon">
              {item.quantity}
            </CText>
            {' ' + item.name}
          </CText>
        ))}
      </View>

      <View style={{justifyContent: 'flex-end', flex: 1}}>
        <CText isCentred size="xl_bold">
          Total Items:
          <CText size="xl_bold" color="salmon">
            {' '}
            {totalItem}{' '}
          </CText>
        </CText>
        <CText isCentred size="xl_bold" mt={15}>
          Total Price:{' '}
          <CText size="xl_bold" color="salmon">
            {formatCurrency(totalPrice)}{' '}
          </CText>
        </CText>
        <CText isCentred mt={15} color="darkGray" size="xl_bold">
          {difference > 1
            ? `Your purchase will be delivered in ${difference} days, by ${futureDate}`
            : difference > 0
            ? `Your purchase will be delivered within 24 hours`
            : 'Your purchase Already delivered at ' + futureDate}
          , to {location}
        </CText>
      </View>
    </Screen>
  );
};

export default Purchase;
