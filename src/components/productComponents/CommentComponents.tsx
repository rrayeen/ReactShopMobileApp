import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-easy-icon';
import {Colors} from '../../constant/Colors';
import {commentType} from '../../react-query/queries/comments/comments';
import {useDeleteComment} from '../../react-query/queries/comments/commentsQuery';
import {selectUser} from '../../store/authSlice';
import {useAppSelector} from '../../store/store';
import {CImage} from '../CImage';
import {CText} from '../CText';

const CommentComponents = ({
  id,
  userIcon,
  userComment,
  userName,
  userId,
}: commentType) => {
  const {mutate: deleteComment, isPending} = useDeleteComment(id);
  const user = useAppSelector(selectUser);
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <CImage
          source={userIcon}
          height={50}
          width={50}
          containerStyle={[{borderRadius: 1000}, styles.image]}
        />
        <CText size="xl_bold">{userName}</CText>
      </View>

      <CText style={styles.comment} size="lg_bold">
        {userComment}
      </CText>
      {userId === user?.id && (
        <Pressable
          disabled={isPending}
          style={{
            position: 'absolute',
            top: 7,
            right: 15,
          }}
          role="button"
          onPress={() => {
            deleteComment();
          }}>
          <Icon type="feather" name="trash-2" size={24} color={Colors.red} />
        </Pressable>
      )}
    </View>
  );
};

export default CommentComponents;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
    borderRadius: 16,
    borderColor: Colors.gray,
    borderWidth: 1,
    padding: 10,
  },
  comment: {marginVertical: 10, textAlign: 'center'},
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
