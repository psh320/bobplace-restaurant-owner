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

//가게 정보 조회 (평점, 리뷰갯수 보려고)
export const getStoreData = async (storeId?: number) => {
  const response = await customAxios().get(`/api/v1/stores/${storeId}`);
  return response.data.result;
};
//리뷰 목록 조회
export const getStoreReviewList = async ({pageParam = 0}, storeId?: number) => {
  const response = await customAxios().get(`/api/v1/reviews/${storeId}`, {
    params: {page: pageParam, size: 5},
  });
  return response;
};
export const postReply = async (
  data: {
    storeId: number;
    rate: number;
    content: string;
    missionId: number;
  },
  reviewId: number,
) => {
  const response = await customAxios().post(`/api/v1/reviews/reply/${reviewId}`, data);
  return response.data;
};
