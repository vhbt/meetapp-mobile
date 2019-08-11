import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Meetup = styled.View`
  margin-bottom: 15px;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 120px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const MeetupBody = styled.View`
  width: 100%;
  height: 145px;
  padding: 20px;
  background: #fff;

  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const MeetupInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Date = styled.Text`
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
