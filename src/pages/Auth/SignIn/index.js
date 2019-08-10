import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import { signInRequest } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import logo from '~/assets/logo.png';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  GoRegister,
  GoRegisterText,
  GoRegisterButton,
} from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  async function handleSubmit() {
    dispatch(signInRequest({ email, password }));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="mail-outline"
            placeholder="Your e-mail"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon="lock-outline"
            placeholder="Your password"
            autoCapitalize="none"
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            ref={passwordRef}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Sign In
          </SubmitButton>
        </Form>
        <GoRegister>
          <GoRegisterText>Don&apos;t have an account?</GoRegisterText>
          <GoRegisterButton onPress={() => navigation.navigate('SignUp')}>
            Create
          </GoRegisterButton>
        </GoRegister>
      </Container>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
