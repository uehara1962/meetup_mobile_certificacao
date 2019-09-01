import React, { useRef, useState, useEffect } from 'react';
import { Image, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import logom from '~/assets/logom.png';

import {
  Container,
  Header,
  Separator,
  Form,
  FormInput,
  SubmitButton,
  LogoutButton,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  // password: Yup.string()
  //   .min(6, 'No mínimo 6 caracteres')
  //   .required('A senha é obrigatória'),
});

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validateErrors, setvalidateErrors] = useState([]);
  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState();

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  useEffect(() => {
    console.tron.log('useEffect_validateErrors :', validateErrors);
  }, [validateErrors]);

  async function validateData() {
    const errors = [];
    try {
      await schema.validate({ name, email }, { abortEarly: false });
    } catch (err) {
      console.tron.log('err: ', err);
      err.inner.forEach(e => {
        if (e.path === 'name') {
          setNameError(e.message);
        } else if (e.path === 'email') {
          setEmailError(e.message);
        }
        errors.push({
          name: e.path,
          message: e.message,
        });
        return errors;
      });
      setvalidateErrors(errors);
    }
    console.tron.log('errors: ', errors);
    return errors;
  }

  function teste() {
    const tmp = [0, 1];
    console.tron.log('teste_tmp: ', tmp);
    return tmp;
  }

  function handleSubmit() {
    const temp_error = validateData();
    const temp = teste();
    console.tron.log('handleSubmit_temp :', temp);
    console.tron.log('handleSubmit_temp_error :', temp_error);
    // console.tron.log('validateErrors :', validateErrors);
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <Header>
          <Image source={logom} style={{ width: 40, height: 40 }} />
        </Header>
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          {nameError && <Text style={{ color: 'red' }}>{nameError}</Text>}
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          {emailError && <Text style={{ color: 'red' }}>{emailError}</Text>}
          <Separator />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha atual"
            ref={oldPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua nova senha"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirmação de secreta"
            ref={confirmPasswordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <SubmitButton onPress={handleSubmit}>Salvar perfil</SubmitButton>
          <LogoutButton onPress={handleLogout}>Sair do Meetup</LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
