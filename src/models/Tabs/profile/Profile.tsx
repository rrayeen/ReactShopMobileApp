import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import Screen from '../../../components/Screen';
import {useAppSelector} from '../../../store/store';
import {selectUser} from '../../../store/authSlice';
import {CImage} from '../../../components/CImage';
import {SCREEN_WIDTH} from '../../../../utils/dimension';
import {Colors} from '../../../constant/Colors';
import {CText} from '../../../components/CText';
import CButton from '../../../components/Buttons/CButton';
import {getUserHistory} from '../../../react-query/queries/purchase/purchaseQueries';
import EmptyComponent from '../../../components/EmptyComponent';
import {newRecipeType} from '../../../react-query/queries/purchase/purchase';
import {format} from 'date-fns';
import {ProfileStackScreenProps} from '../../../navigators/stacks/ProfileNavigator';
import Loader from '../../../components/LoadingScreen/Loader';
import {useQueryClient} from '@tanstack/react-query';
import {queryClient} from '../../../react-query/queryClient';
import {ProfileStackRouts} from '../../../navigators/routes';

const Profile = ({navigation}: ProfileStackScreenProps<'Profile_Profile'>) => {
  const qeryClient = useQueryClient();
  const refresh = () => {
    queryClient.refetchQueries({queryKey: ['history']});
  };

  const user = useAppSelector(selectUser);
  if (!user)
    return (
      <Screen>
        <EmptyComponent msg="No data" />;
      </Screen>
    );
  const {purchaseHistory, isPending, status, isFetching, isFetched} =
    getUserHistory(user.id);
  return (
    <>
      {isFetching || isPending ? (
        <Loader />
      ) : (
        <Screen onRefresh={() => refresh()}>
          <View style={styles.imageContainer}>
            <CImage
              source={user?.icon || ''}
              resizeMode="contain"
              containerStyle={{
                backgroundColor: Colors.lightGray,
                borderRadius: 8,
              }}
              height={'100%'}
              width={'100%'}
            />
          </View>
          <CText isCentred mt={25} size="xxxl_bold" mb={25}>
            {user?.username}
          </CText>
          <CButton
            text="Edit Profile"
            width={SCREEN_WIDTH * 0.5}
            height={50}
            onPress={() => {}}
            style={{alignSelf: 'center'}}
            disabled
            mb={25}
          />
          <CText size="xxl_bold" color="salmon" mb={25}>
            Purchase History :
          </CText>

          {purchaseHistory && purchaseHistory.length > 0 ? (
            purchaseHistory.map((item: newRecipeType, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginBottom: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Pressable
                    onPress={() => {
                      // @ts-ignore
                      navigation.navigate(ProfileStackRouts.PURCHASE, item);

                      qeryClient.refetchQueries({queryKey: ['history']});
                    }}
                    style={{
                      borderBottomWidth: 1,
                      borderColor: Colors.darkGray,
                    }}>
                    <CText size="xl_bold" color="main">
                      Purchase #{index + 1}
                    </CText>
                  </Pressable>
                  <CText size="sm" color="darkGray" mb={10}>
                    {item.created_at &&
                      format(item?.created_at, 'dd MMMM yyyy')}
                  </CText>
                </View>
              );
            })
          ) : (
            <EmptyComponent msg="No Purchase History Yet" />
          )}
        </Screen>
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imageContainer: {
    borderColor: Colors.darkGray,
    borderWidth: 3,
    borderRadius: 8,
    overflow: 'hidden',
    borderStyle: 'dashed',
    padding: 10,
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    alignSelf: 'center',
  },
});
