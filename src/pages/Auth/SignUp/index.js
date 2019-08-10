import React, { useRef } from 'react';
import { Image } from 'react-native';
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
  const passwordRef = useRef();
  const emailRef = useRef();

  function handleSubmit() {}

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="mail-outline"
            placeholder="Full name"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
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
          />
          <FormInput
            icon="lock-outline"
            placeholder="Your password"
            autoCapitalize="none"
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            ref={passwordRef}
          />

          <SubmitButton onPress={handleSubmit}>Register</SubmitButton>
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
