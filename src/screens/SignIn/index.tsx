import React from 'react';
import { Alert, Modal, View } from 'react-native';

import { useAuth } from '../../hooks/useAuth';

import LoginBannerImg from '../../assets/images/login.svg';
import LogoImg from '../../assets/images/logo.svg';

import { 
  Container,
  Content,
  LoginBanner, 
  LoginInfo, 
  Header, 
  Partner, 
  Description, 
  SignInButton,
  SignInButtonIcon,
  SignInButtonText, 
  Icon,
  Loading
} from './styles';

export function SignIn() {
  const { signIn, isLoggingIn } = useAuth();

  async function handleSignIn() {
    try {
      await signIn();
    } catch (error) {
      Alert.alert("Ocorreu um erro ao tentar logar no app");
      console.log(error);
    }
  }

  return (
    <Container
      from={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
    >
      <Content>
        <LoginBanner>
          <LoginBannerImg width="100%" />
        </LoginBanner>

        <LoginInfo>
          <Header>
            <LogoImg />
            <Partner>by twitch</Partner>
          </Header>

          <Description>
            Veja dados{'\n'}
            interessantes sobre{'\n'}
            o mundo da Twitch
          </Description>

          <SignInButton onPress={handleSignIn}>
            <SignInButtonIcon>
              {
                isLoggingIn 
                  ? <Loading /> 
                  : <Icon name="twitch"/>
              }
            </SignInButtonIcon>

            <SignInButtonText>
              {
                isLoggingIn 
                ? "Entrando... "
                : "Entrar com Twitch"
              }
            </SignInButtonText>
          </SignInButton>
        </LoginInfo>
      </Content>

      <Modal 
        animationType="fade"
        visible={isLoggingIn}
        statusBarTranslucent
        transparent
      >
        <View
          style={{ flex: 1, backgroundColor: 'rgba(14, 14, 16, 0.5)' }}
        />
      </Modal>
    </Container>
  );
}