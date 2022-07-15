import {customAxios} from './customAxios';

//사장님 리뷰 답글 남기기 __ 스웨거에서 report ((reply는 모지 ? ?))
export const postReviewsReply = async (
  data: {
    content: string;
    // missionId: number;
    // rate: number;
    // storeId: number;
  },
  reviewId: number,
) => {
  const response = await customAxios().post(`/api/v1/reviews/report/${reviewId}`, data);
  return response.data;
};
// const replyMutation = useMutation(
//   (data: {content: string}, reviewId) =>
//     postReviewsReply(data, reviewId),
//   {
//     onSuccess(replyData) {
//       console.log('답글목록 , ', replyData);
//     },
//   },
// );
//   const submitReview = async () => {
//     await reviewMutation.mutate({
//       content: content,
//     });
//     await setOpen____Modal(true);//모달 열기
//   };
