import React, { useRef } from 'react';
import { Image } from 'react-native';
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
  const passwordRef = useRef();

  function handleSubmit() {}

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

          <SubmitButton onPress={handleSubmit}>Sign In</SubmitButton>
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
