import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 20px 30px;
`;

export const LoadingIndicator = styled(ActivityIndicator)`
  margin-top: 40px;
`;

export const SubscriptionsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Subscription = styled.View`
  margin-bottom: 15px;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 120px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: rgba(255, 255, 255, 0.4);
`;

export const SubscriptionBody = styled.View`
  width: 100%;
  height: 195px;
  padding: 10px 20px;
  background: #fff;

  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const SubscriptionInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const DateText = styled.Text`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  margin-left: 5px;
`;

export const Location = styled.Text`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  margin-left: 5px;
`;

export const Organizer = styled.Text`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  margin-left: 5px;
`;

export const UnsubscribeButton = styled(Button).attrs({
  background: 'rgb(251, 97, 127)',
})`
  margin-top: 5px;
`;
