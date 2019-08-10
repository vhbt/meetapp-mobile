import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import { signUpRequest } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import logo from '~/assets/logo.png';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  GoLogin,
  GoLoginText,
  GoLoginButton,
} from './styles';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const emailRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signUpRequest({ name, email, password }));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="person-outline"
            placeholder="Full name"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            icon="mail-outline"
            placeholder="Your e-mail"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            ref={emailRef}
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
            Register
          </SubmitButton>
        </Form>
        <GoLogin>
          <GoLoginText>Already have an account?</GoLoginText>
          <GoLoginButton onPress={() => navigation.navigate('SignIn')}>
            Sign In
          </GoLoginButton>
        </GoLogin>
      </Container>
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
