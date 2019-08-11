import styled from 'styled-components/native';
import Input from '~/components/Input';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Form = styled.View``;

export const FormInput = styled(Input)`
  margin-top: 10px;
`;

export const Separator = styled.View`
  margin: 20px 0;
  height: 1px;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
`;
