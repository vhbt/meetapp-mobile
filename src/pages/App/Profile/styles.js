import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-top: 10px;
`;

export const Separator = styled.View`
  margin: 20px 0;
  height: 1px;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
`;

export const SubmitButton = styled(Button).attrs({
  background: 'rgb(70, 128, 255)',
})`
  margin: 15px 0 10px;
`;

export const LogoutButton = styled(Button).attrs({
  background: 'rgb(251, 97, 127)',
})``;
