//미션탭 진행중-성공요청 둘다에서 쓰이는 미션카드(타입동일(?))
export type IMission = {
  mission: string;
  missionId: number;
  point: number;
  startHour: number;
  startMinute: number;
  userId: number;
  userName: string;
};
