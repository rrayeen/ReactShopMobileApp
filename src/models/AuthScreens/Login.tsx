import {View, Text, StyleSheet, Button, Pressable} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {AuthStackScreenProps} from '../../navigators/stacks/AuthNavigator';
import Screen from '../../components/Screen';
import ControlledInput from '../../components/ControlledInput';
import {useForm} from 'react-hook-form';
import CButton from '../../components/Buttons/CButton';
import {CText} from '../../components/CText';
import {Colors} from '../../constant/Colors';

import WelcomeHeader from '../../components/WelcomeHeader';
import {validateEmailAndPassword} from '../../../utils/helper';
import {GetLogin, GetSession} from '../../react-query/queries/auth/authQueries';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {
  selectIsAuthenticated,
  setIsAuthenticated,
  setUser,
} from '../../store/authSlice';
import Loader from '../../components/LoadingScreen/Loader';
import Icon from 'react-native-easy-icon';

type formData = {
  email: string;
  password: string;
};

const Login = ({navigation}: AuthStackScreenProps<'Login'>) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const {isPending, isError, mutate, status, data: session, error} = GetLogin();

  const onSubmit = (data: formData) => {
    mutate(data);
  };

  return (
    <>
      {status === 'pending' ? (
        <Loader />
      ) : (
        <Screen>
          <WelcomeHeader
            title="Welcome To Our Shop"
            subTitle="Login"></WelcomeHeader>
          <View style={authStyles.container}>
            <ControlledInput
              control={control}
              name="email"
              rules={{required: true}}
              placeholderText="name@example.com"
              labelText="Email"
              labelSize="lg_bold"
              bottomTextSize="xs_bold"
              bottomText={errors.email ? 'Email is required' : ''}
              pressableStyle={{marginBottom: 10}}
            />
            <ControlledInput
              secureTextEntry={!showPassword}
              RightAcessory={() => (
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Icon
                      type="feather"
                      name="eye-off"
                      color="black"
                      size={25}
                    />
                  ) : (
                    <Icon
                      type="feather"
                      name="eye"
                      color="black"
                      size={25}></Icon>
                  )}
                </Pressable>
              )}
              control={control}
              name="password"
              rules={{required: true}}
              placeholderText="Password"
              labelText="Password"
              labelSize="lg_bold"
              bottomTextSize="xs_bold"
              bottomText={errors.password ? 'Password is required' : ''}
              pressableStyle={{marginBottom: 10}}
            />
            <CButton
              text="Login"
              onPress={handleSubmit(onSubmit)}
              mt={20}
              mb={10}
              buttonType="primary"></CButton>
            {error && (
              <CText size="lg_bold" color="deepRed" isCentred>
                {error.message}
              </CText>
            )}
            <CText size="lg_bold" style={{marginTop: 20}} isCentred={true}>
              Don't have an account?{' '}
              <CText
                onPress={() => navigation.replace('Register')}
                color="blue"
                size="xxl_bold"
                style={{
                  textDecorationLine: 'underline',
                  textDecorationColor: 'transparent',
                }}>
                Sign Up!
              </CText>
            </CText>
          </View>
        </Screen>
      )}
    </>
  );
};

export const authStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default Login;