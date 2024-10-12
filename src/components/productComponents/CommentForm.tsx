import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../constant/Colors';
import {newCommentType} from '../../react-query/queries/comments/comments';
import {useAddComment} from '../../react-query/queries/comments/commentsQuery';
import {selectUser} from '../../store/authSlice';
import {useAppSelector} from '../../store/store';
import CButton from '../Buttons/CButton';
import {CImage} from '../CImage';
import ControlledInput from '../ControlledInput';
import {CText} from '../CText';
type props = Partial<newCommentType> & {
  setComment: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommentForm = ({
  productId,
  userIcon,
  userName,
  userId,
  setComment,
}: props) => {
  const {mutate, isPending, status, error} = useAddComment();
  const {handleSubmit, control} = useForm({
    defaultValues: {
      comment: '',
    },
  });
  const onSubmit = (data: {comment: string}) => {
    if (userIcon && userName && userId && productId) {
      mutate({
        userComment: data.comment,
        userId,
        userIcon,
        userName,
        productId: productId,
      });
      setComment(false);
    }
  };

  const user = useAppSelector(selectUser);
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <CImage
          source={userIcon || ''}
          height={50}
          width={50}
          containerStyle={[{borderRadius: 1000}, styles.image]}
        />
        <CText size="xl_bold">{userName}</CText>
      </View>
      <View style={styles.comment}>
        <ControlledInput
          labelText=""
          placeholderText="Write your comment..."
          control={control}
          name="comment"
          rules={{required: true}}></ControlledInput>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <CButton
          text="Cancel"
          onPress={() => {
            setComment(false);
          }}
          disabled={isPending}
          mt={10}
          mb={10}
          width={'30%'}
          height={40}
          style={{alignSelf: 'flex-end'}}
          buttonType="danger"></CButton>
        <CButton
          disabled={isPending}
          text="Comment"
          onPress={handleSubmit(onSubmit)}
          mt={10}
          mb={10}
          width={'30%'}
          height={40}
          buttonType="success"></CButton>
      </View>
    </View>
  );
};

export default CommentForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
    borderRadius: 16,
    borderColor: Colors.gray,
    borderWidth: 1,
    padding: 10,
  },
  comment: {marginVertical: 10},
  image: {borderRadius: 1000, backgroundColor: Colors.lightGray},

  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
    gap: 20,
    borderColor: Colors.gray,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});
