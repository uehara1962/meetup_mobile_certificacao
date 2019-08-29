import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  height: 70px;
  flex-direction: row;
  background: #0d0d0d;
  align-items: center;
  justify-content: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;

export const Item = styled.View`
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const MeetupImage = styled.Image`
  height: 142px;
  width: 100%;
  background: #eee;
`;

export const Detail = styled.View`
  padding-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #000;
  font-weight: bold;
  margin-top: 23px;
  margin-left: 10px;
  margin-bottom: 5px;
`;

export const Info = styled.View`
  flex-direction: row;
  margin-top: 5px;
  margin-left: 10px;
`;

export const BtnSubscription = styled(RectButton)`
  background: #dc3e6c;
  border-radius: 4px;
  padding: 5px;
  height: 45px;

  align-items: center;
  justify-content: center;
  margin: 0 10px 20px;
`;
