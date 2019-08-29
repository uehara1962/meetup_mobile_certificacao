// import React from 'react';
// import { Text } from 'react-native';

// import Input from '~/components/Input';
// import Button from '~/components/Button';
// import Background from '~/components/Background';
// // import { Container } from './styles';

// export default function SignIn() {
//   return (
//     <Background>
//       <Text>SignIn</Text>

//       <Input
//         style={{ marginTop: 30 }}
//         icon="call"
//         placeholder="Digite seu nome"
//       />

//       <Button>Entrar</Button>
//     </Background>
//   );
// }
// S>----------------------------------------------------------------------------------------<//

// import React from 'react';
// import { Image } from 'react-native';

// import logom from '~/assets/logom.png';

// import Background from '~/components/Background';
// import {
//   Container,
//   Form,
//   FormInput,
//   SubmitButton,
//   SignLink,
//   SignLinkText,
// } from './styles';

// export default function SignIn({ navigation }) {
//   return (
//     <Background>
//       <Container>
//         <Image source={logom} style={{ width: 40, height: 40 }} />

//         <Form>
//           <FormInput
//             icon="mail-outline"
//             keyboardType="email-address"
//             autoCorrect={false}
//             autoCapitalize="none"
//             placeholder="Digite seu e-mail"
//           />
//           <FormInput
//             icon="lock-outline"
//             secureTextEntry
//             placeholder="Sua senha secreta"
//           />
//           <SubmitButton onPress={() => {}}>Acessar</SubmitButton>
//         </Form>

//         <SignLink onPress={() => navigation.navigate('SignUp')}>
//           <SignLinkText>Criar conta gratuita</SignLinkText>
//         </SignLink>
//       </Container>
//     </Background>
//   );
// }

// S>----------------------------------------------------------------------------------------<//

// import React, { useRef } from 'react';
// import { Image } from 'react-native';

// import logom from '~/assets/logom.png';

// import Background from '~/components/Background';
// import {
//   Container,
//   Form,
//   FormInput,
//   SubmitButton,
//   SignLink,
//   SignLinkText,
// } from './styles';

// export default function SignIn({ navigation }) {
//   const passwordRef = useRef();

//   function handleSubmit() {}
//   return (
//     <Background>
//       <Container>
//         <Image source={logom} style={{ width: 40, height: 40 }} />

//         <Form>
//           <FormInput
//             icon="mail-outline"
//             keyboardType="email-address"
//             autoCorrect={false}
//             autoCapitalize="none"
//             placeholder="Digite seu e-mail"
//             returnKeyType="next"
//             onSubmitEditing={() => passwordRef.current.focus()}
//           />
//           <FormInput
//             icon="lock-outline"
//             secureTextEntry
//             placeholder="Sua senha secreta"
//             ref={passwordRef}
//             returnKeyType="send"
//             onSubmitEditing={handleSubmit}
//           />
//           <SubmitButton onPress={() => {}}>Acessar</SubmitButton>
//         </Form>

//         <SignLink onPress={() => navigation.navigate('SignUp')}>
//           <SignLinkText>Criar conta gratuita</SignLinkText>
//         </SignLink>
//       </Container>
//     </Background>
//   );
// }

// S>----------------------------------------------------------------------------------------<//

import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logom from '~/assets/logom.png';

import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }
  return (
    <Background>
      <Container>
        <Image source={logom} style={{ width: 40, height: 40 }} />

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta grátis</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
