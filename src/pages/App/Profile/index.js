import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import { Container, Form, FormInput, Separator } from './styles';

export default function Profile() {
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const user = useSelector(state => state.user.user);

  function handleSubmit() {}

  return (
    <Background>
      <Container>
        <Form>
          <FormInput
            icon="person-outline"
            placeholder="Full name"
            autoCorrect={false}
            value={user.name}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <FormInput
            icon="mail-outline"
            placeholder="Your e-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            value={user.email}
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            ref={emailRef}
          />

          <Separator />

          <FormInput
            icon="lock-outline"
            placeholder="Your old password"
            secureTextEntry
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={() => passwordRef.current.focus()}
            ref={oldPasswordRef}
          />
          <FormInput
            icon="lock-outline"
            placeholder="Your new password"
            secureTextEntry
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            ref={passwordRef}
          />
          <FormInput
            icon="lock-outline"
            placeholder="Confirm your new password"
            secureTextEntry
            returnKeyType="send"
            autoCapitalize="none"
            onSubmitEditing={handleSubmit}
            ref={confirmPasswordRef}
          />
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
