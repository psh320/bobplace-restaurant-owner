export type dayofweekType = {
  [index: string]: string;
  MONDAY: string;
  TUESDAY: string;
  WEDNESDAY: string;
  THURSDAY: string;
  FRIDAY: string;
  SATURDAY: string;
  SUNDAY: string;
};
//미션탭 진행중-성공요청 둘다에서 쓰이는 미션카드(타입동일(?))
export type IMission = {
  dayOfWeek: string;
  mission: string;
  missionId: number;
  point: number;
  startDate: string;
  userId: number;
  userName: string;
  seperate?: any;
};
export type IMissionProgress = {
  missionOnProgressCount: number;
  ownerMissionDto: IMission[];
};
