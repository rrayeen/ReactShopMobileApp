import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  addComment,
  commentType,
  deleteComment,
  getComments,
  newCommentType,
} from './comments';
import {isPending} from '@reduxjs/toolkit';

export function useGetComments(id: number) {
  const {
    data: allComments,
    isPending: commentLoading,
    status: commentStatus,
    isFetching: commentIsFetching,
    isFetched: commentIsFetched,
  } = useQuery({
    queryKey: ['comments'],
    queryFn: () => getComments(id),
  });
  return {
    allComments,
    commentIsFetched,
    commentIsFetching,
    commentLoading,
    commentStatus,
  };
}

export function useDeleteComment(id: number) {
  const queryClient = useQueryClient();
  const {mutate, isPending, status, error} = useMutation({
    mutationFn: () => deleteComment(id),
    onSuccess: () => {
      queryClient.refetchQueries({queryKey: ['comments']});
    },
  });

  return {mutate, isPending, status, error};
}

export function useAddComment() {
  const queryClient = useQueryClient();
  const {mutate, isPending, status, error} = useMutation({
    mutationFn: (comment: newCommentType) => {
      return addComment(comment);
    },
    onSuccess: () => {
      queryClient.refetchQueries({queryKey: ['comments']});
    },
  });
  return {mutate, isPending, status, error};
}
