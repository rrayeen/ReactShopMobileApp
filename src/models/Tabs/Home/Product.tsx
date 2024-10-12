import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useCTheme} from '../../../hooks/useCTheme';
import {ThemeContext} from '../../../context/ThemeContext';
import {HomeStackScreenProps} from '../../../navigators/stacks/HomeNavigator';
import Screen from '../../../components/Screen';
import {CText} from '../../../components/CText';
import {useGetProduct} from '../../../react-query/queries/product/productQueries';
import Loader from '../../../components/LoadingScreen/Loader';
import {CImage} from '../../../components/CImage';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../utils/dimension';
import Separator from '../../../components/Separator';
import {formatCurrency} from '../../../../utils/helper';
import CButton from '../../../components/Buttons/CButton';
import Icon from 'react-native-easy-icon';
import {shadows} from '../../../constant/Shadows';
import {useGetComments} from '../../../react-query/queries/comments/commentsQuery';
import CommentComponents from '../../../components/productComponents/CommentComponents';
import CommentForm from '../../../components/productComponents/CommentForm';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {selectUser} from '../../../store/authSlice';
import {
  addToCart,
  clearCart,
  quantityCheck,
  selectCart,
} from '../../../store/cartSlice';
import {PersistenceStorage} from '../../../storage';
import {KEYS} from '../../../storage/Keys';
import BackButton from '../../../components/Buttons/BackButton';
import {useQueryClient} from '@tanstack/react-query';

const Product = ({navigation, route}: HomeStackScreenProps<'Product'>) => {
  const queryClient = useQueryClient();
  const {id} = route.params;
  const {data, isPending, isFetching, status, error} = useGetProduct({id});
  const {
    allComments,
    commentLoading,
    commentStatus,
    commentIsFetching,
    commentIsFetched,
  } = useGetComments(id);
  const user = useAppSelector(selectUser);
  const [comment, setComment] = useState(false);
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const storage = PersistenceStorage;
  const carte = storage.getItem(KEYS.CART);
  const disabled = cart.find(el => el.id === id);
  useEffect(() => {
    if (data) dispatch(quantityCheck(data[0]));
  }, [data]);

  return (
    <>
      {data && allComments ? (
        <Screen containerStyle={{position: 'relative', paddingTop: 80}}>
          <BackButton backVoid={() => navigation.goBack()} />
          <CText isCentred size="xxxl_bold" color="main">
            {data[0].name}
          </CText>
          <CImage
            source={data[0].image}
            height={SCREEN_HEIGHT / 3}
            containerStyle={{marginVertical: 25, borderRadius: 10}}
          />
          <Separator size={'100%'} />
          <CText mt={25} mb={25} size="xl_bold" color="deepRed">
            Description
          </CText>
          <CText size="lg">{data[0].description}</CText>
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            <CText mb={25} mt={25} size="lg_bold" color="lightBlue">
              {formatCurrency(data[0].price)}
            </CText>
          </View>
          {data[0].quantity > 0 ? (
            <CButton
              text="Add To Cart"
              onPress={() => {
                dispatch(addToCart({...data[0]}));
              }}
              buttonType="secondary"
              disabled={disabled ? true : false}
            />
          ) : (
            <CButton
              text="Out of Stock"
              onPress={() => {}}
              disabled
              buttonType="primary"
            />
          )}

          <Separator size={'100%'} mt={25} mb={25} />
          <CText size="xxxl_bold" mb={25} color="main" isCentred={true}>
            Comments
          </CText>
          {allComments.map((comment, index) => (
            <CommentComponents
              key={index}
              userIcon={comment.userIcon}
              id={comment.id}
              userComment={comment.userComment}
              userName={comment.userName}
              userId={comment.userId}></CommentComponents>
          ))}

          {/*1 {empty comment component} 
            2 {add comment component}
          */}

          {comment ? (
            <CommentForm
              productId={id}
              userId={user?.id}
              userIcon={user?.icon}
              userName={user?.username}
              setComment={setComment}
            />
          ) : (
            <CButton
              text="Add Comment"
              onPress={() => setComment(true)}
              buttonType="success"
              height={60}
              width={SCREEN_WIDTH / 2.5}
              style={{alignSelf: 'center', marginTop: 25}}></CButton>
          )}
        </Screen>
      ) : isPending || isFetching || commentLoading ? (
        <Loader></Loader>
      ) : (
        <Screen>
          <CText
            onPress={() => navigation.goBack()}
            mb={25}
            isCentred
            size="xxxl_bold"
            color="main">
            Something went wrong please go back and try again
          </CText>
        </Screen>
      )}
    </>
  );
};

export default Product;
