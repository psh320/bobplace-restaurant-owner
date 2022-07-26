import axios from 'axios';
import Config from 'react-native-config';

export const kakaoGeocoder = async (fullAddress: string) => {
  const kakaoApi = Config.KAKAO_REST_API;
  // const kakaoApi = 'dd2ba5f501ee6ee7660353fabf2c956e';
  console.log('??????????', kakaoApi);
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${fullAddress}`,
      {
        headers: {Authorization: `KakaoAK ${kakaoApi}`},
      },
    );
    console.log('post register:', response.data.documents[0]);
    const coordinate = {x: response.data.documents[0].x, y: response.data.documents[0].y};
    console.log(coordinate);
    return coordinate;
  } catch (error) {
    console.log('주소 좌표변환 에러:', error);
  }
};
