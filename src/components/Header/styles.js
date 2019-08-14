import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.SafeAreaView`
  justify-content: center;
  align-items: center;
  height: ${Platform.OS === 'ios' ? '120px' : '80px'};
  background: rgb(248, 248, 250);
  border-bottom-width: 1;
  border-bottom-color: rgba(0, 0, 0, 0.18);
`;

export const Logo = styled.Image`
  margin-top: ${Platform.OS === 'ios' ? '5px' : '0'};
`;
