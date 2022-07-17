//미션탭 진행중-성공요청 둘다에서 쓰이는 미션카드(타입동일(?))
export type IMission = {
  date: string;
  mission: string;
  missionId: number;
  point: number;
  userId: number;
  userName: string;
};
export type IMissionProgress = {
  missionOnProgressCount: number;
  ownerMissionDto: IMission[];
};
