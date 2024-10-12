import {View, Text} from 'react-native';
import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {CTextInput, customTextInputProps as cInputProps} from './CTextInput';
type ControllerRules = {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: any) => boolean | Promise<boolean | string>;
};

interface ControlledInputProps<TFieldValues extends FieldValues = FieldValues>
  extends cInputProps {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: ControllerRules;
}

export const ControlledInput = <TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  ...textInputProps
}: ControlledInputProps<TFieldValues>) => {
  return (
    <Controller
      rules={rules}
      control={control}
      name={name}
      render={({field: {value, onChange, onBlur}, fieldState: {invalid}}) => (
        <CTextInput
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          state={invalid ? 'error' : undefined}
          {...textInputProps}
        />
      )}
    />
  );
};

export default ControlledInput;
