import {ComponentType, useMemo, useRef} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '../constant/Colors';
import {useThemeInterpolation} from '../hooks/useThemeInterpolation';
import {CText, TextColors, TextSizes} from './CText';

type textInputStatuses = 'disabled' | 'error';

type StylesContainerProps = {
  pressableStyle?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};
type BottomTextProps = {
  bottomTextColor?: TextColors;
  bottomText?: string;
  bottomTextStyle?: StyleProp<TextStyle>;
  bottomTextSize?: TextSizes;
};
type RightAcessoryProps = {
  state?: textInputStatuses;
};
export type customTextInputProps = {
  state?: textInputStatuses;
  labelStyle?: StyleProp<TextStyle>;
  labelSize?: TextSizes;
  placeholderText: string;
  placeholderColor?: string;
  labelText: string;
  textSize?: number;
  editable?: boolean;
  RightAcessory?: ComponentType<RightAcessoryProps>;
} & Omit<TextInputProps, 'placeholder'> &
  StylesContainerProps &
  BottomTextProps;

export const CTextInput = ({
  state,
  labelText,
  labelSize = 'xs_medium',
  labelStyle = styles.labelText,
  placeholderText,
  placeholderColor = Colors.gray,
  pressableStyle,
  inputWrapperStyle,
  textStyle,
  RightAcessory,
  bottomText,
  bottomTextColor = 'deepRed',
  bottomTextStyle = styles.bottomText,
  bottomTextSize = 'sm_medium',
  editable = true,
  textSize = 16,
  ...textInputProps
}: customTextInputProps) => {
  const input = useRef<TextInput>(null);
  const disabled = editable === false || state === 'disabled';
  const placeholder = placeholderText;

  const focusTextInput = () => {
    if (disabled) return;
    input.current?.focus();
  };

  const generatedInputWrapperStyles = useMemo(
    () => [
      styles.inputWrapper,
      inputWrapperStyle,

      state === 'error' && {borderColor: Colors.deepRed},
    ],
    [inputWrapperStyle, state],
  );
  const generateInputStyle = useMemo(
    () => [
      styles.input,
      styles.text,
      {fontSize: textSize},
      state === 'error' && styles.invalidText,
      disabled && {color: Colors.black},
      textStyle && textStyle,
    ],
    [disabled, state, textStyle],
  );
  const {animatedStyle} = useThemeInterpolation(
    Colors.texts.light['main'],
    Colors.texts.dark['main'],
    'color',
  );

  return (
    <View>
      {labelText && (
        <CText size={labelSize} style={[labelStyle, animatedStyle]}>
          {labelText}
        </CText>
      )}
      <Pressable
        style={pressableStyle}
        accessibilityRole="button"
        accessibilityState={{disabled}}
        onPress={focusTextInput}>
        <View style={generatedInputWrapperStyles}>
          <TextInput
            placeholder={placeholder}
            style={generateInputStyle}
            placeholderTextColor={placeholderColor}
            textAlignVertical="center"
            autoCapitalize="none"
            autoComplete="off"
            {...textInputProps}
            autoCorrect={false}
            editable={!disabled}></TextInput>
          {RightAcessory && <RightAcessory state={state} />}
        </View>
        {bottomText && state === 'error' && (
          <CText
            size={bottomTextSize}
            color={bottomTextColor}
            style={[bottomTextStyle]}>
            {bottomText}
          </CText>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: Colors.textInput.light.main,
    borderColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingRight: 16,
    paddingLeft: 24,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
    alignSelf: 'stretch',
  },
  text: {
    color: Colors.black,
    fontFamily: 'c-Bold',
    fontSize: 20,
  },
  invalidText: {color: Colors.deepRed},
  bottomText: {textAlign: 'center', marginTop: 14},
  labelText: {
    alignSelf: 'flex-start',
    marginLeft: 12,
    marginBottom: 12,
  },
});
//wait for testing
