import {View, Text, Button, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AuthStackScreenProps} from '../../navigators/stacks/AuthNavigator';
import ControlledInput from '../../components/ControlledInput';
import {useCTheme} from '../../hooks/useCTheme';
import CButton from '../../components/Buttons/CButton';
import {CText} from '../../components/CText';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useForm} from 'react-hook-form';
import Screen from '../../components/Screen';
import TitleWithDelay from '../../components/TitleWithDelay';
import WelcomeHeader from '../../components/WelcomeHeader';
import {authStyles} from './Login';
import {useSignUp} from '../../react-query/queries/auth/authQueries';
import {validateEmail, validateEmailAndPassword} from '../../../utils/helper';
import Icon from 'react-native-easy-icon';

type formData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  adress: string;
};

const Register = ({navigation}: AuthStackScreenProps<'Register'>) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const {
    control,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      adress: '',
    },
  });
  const {mutate, status, isPending, error} = useSignUp();
  const onSubmit = (data: formData) => {
    mutate({
      username: data.username,
      email: data.email,
      password: data.password,
      adress: data.adress,
    });
    // validate me now
  };

  return (
    <Screen>
      <WelcomeHeader
        title="Welcome To Our Shop"
        subTitle="Sign Up"></WelcomeHeader>
      <View style={authStyles.container}>
        <ControlledInput
          control={control}
          name="username"
          rules={{
            required: true,
            validate(value) {
              if (value.length < 3) {
                return Promise.resolve('Name is required (3 char)');
              }
              return Promise.resolve(true);
            },
          }}
          placeholderText="Name"
          labelText="Name : "
          labelSize="lg_bold"
          bottomTextSize="xs_bold"
          bottomText={
            errors.username ? errors.username.message || 'Name is required' : ''
          }
          pressableStyle={{marginBottom: 10}}
        />
        <ControlledInput
          control={control}
          name="email"
          rules={{
            required: true,
            validate(value) {
              const validEmail = validateEmail(value);
              if (!validEmail) {
                return Promise.resolve('Invalid Email');
              }
              return Promise.resolve(true);
            },
          }}
          placeholderText="email@example.com"
          labelText="Email : "
          labelSize="lg_bold"
          bottomTextSize="xs_bold"
          bottomText={
            errors.email ? errors.email.message || 'Email is required' : ''
          }
          pressableStyle={{marginBottom: 10}}
        />
        <ControlledInput
          control={control}
          name="adress"
          rules={{
            required: true,
            validate(value) {
              if (value.length < 7) {
                return Promise.resolve('Adress is required (7 char)');
              }
              return Promise.resolve(true);
            },
          }}
          placeholderText=" 00 STREET NAME 0000 "
          labelText="Adress : "
          labelSize="lg_bold"
          bottomTextSize="xs_bold"
          bottomText={
            errors.adress ? errors.adress.message || 'Adress is required' : ''
          }
          pressableStyle={{marginBottom: 10}}
          multiline={true}
        />
        <ControlledInput
          control={control}
          RightAcessory={() => (
            <Pressable onPress={() => setPasswordShow(!passwordShow)}>
              {passwordShow ? (
                <Icon type="feather" name="eye-off" color="black" size={25} />
              ) : (
                <Icon type="feather" name="eye" color="black" size={25} />
              )}
            </Pressable>
          )}
          name="password"
          rules={{
            required: true,
            validate(value) {
              if (value.length < 6) {
                return Promise.resolve(
                  'Password must be at least 6 characters',
                );
              }
              return Promise.resolve(true);
            },
          }}
          secureTextEntry={!passwordShow}
          placeholderText="Password"
          labelText="Password : "
          labelSize="lg_bold"
          bottomTextSize="xs_bold"
          bottomText={
            errors.password
              ? errors.password.message || 'Password is required'
              : ''
          }
          pressableStyle={{marginBottom: 10}}
        />
        <ControlledInput
          secureTextEntry={!confirmPasswordShow}
          control={control}
          RightAcessory={() => (
            <Pressable
              onPress={() => setConfirmPasswordShow(!confirmPasswordShow)}>
              {confirmPasswordShow ? (
                <Icon type="feather" name="eye-off" color="black" size={25} />
              ) : (
                <Icon type="feather" name="eye" color="black" size={25} />
              )}
            </Pressable>
          )}
          name="confirmPassword"
          rules={{
            required: true,
            validate(value) {
              if (value !== getValues('password')) {
                return Promise.resolve('Passwords do not match');
              }
              return Promise.resolve(true);
            },
          }}
          placeholderText="Confirm Password"
          labelText="Confirm Password : "
          labelSize="lg_bold"
          bottomTextSize="xs_bold"
          bottomText={
            errors.confirmPassword
              ? errors.confirmPassword.message || 'Confirm Password is required'
              : ''
          }
          pressableStyle={{marginBottom: 10}}
        />
        <CButton
          text={isPending ? 'Loading...' : 'Sign Up'}
          onPress={handleSubmit(onSubmit)}
          mt={20}
          mb={10}
          disabled={isPending}
          buttonType="primary"></CButton>
        {error && (
          <CText size="lg_bold" color="deepRed" isCentred>
            {error.message}
          </CText>
        )}
        <CText size="lg_bold" style={{marginTop: 20}} isCentred={true}>
          Already Member?{' '}
          <CText
            onPress={() => navigation.replace('Login')}
            color="blue"
            size="xxl_bold"
            style={{
              textDecorationLine: 'underline',
              textDecorationColor: 'transparent',
            }}>
            Login!
          </CText>
        </CText>
      </View>
    </Screen>
  );
};

export default Register;
