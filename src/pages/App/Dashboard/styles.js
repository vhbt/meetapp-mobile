import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding: 20px 30px;
`;

export const LoadingIndicator = styled(ActivityIndicator)`
  margin-top: 40px;
`;

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
