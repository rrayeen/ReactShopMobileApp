import {View, Text, StyleSheet} from 'react-native';
import React, {memo, useRef, useState} from 'react';
import {Colors} from '../constant/Colors';
import {SCREEN_WIDTH} from '../../utils/dimension';
import {Picker} from '@react-native-picker/picker';
type Props = {
  order: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
};

const PickerOrder = ({order, setOrder}: Props) => {
  const pickerRef = useRef<any>(null);
  function openPicker() {
    pickerRef.current.focus();
  }
  function closePicker() {
    pickerRef.current.blur();
  }

  return (
    <View
      style={{
        borderRadius: 300,
        width: SCREEN_WIDTH / 2,
        alignSelf: 'center',
        overflow: 'hidden',
      }}>
      <Picker
        style={styles.picker}
        ref={pickerRef}
        selectedValue={order}
        dropdownIconColor={Colors.white}
        dropdownIconRippleColor={Colors.white}
        mode="dropdown"
        onValueChange={(itemValue, itemIndex) => setOrder(itemValue)}>
        <Picker.Item
          enabled={false}
          style={styles.pickerChild}
          label="Order By"
          value=""
        />
        <Picker.Item
          style={styles.pickerChild}
          label="Name : A-Z"
          value="Name_asc"
        />
        <Picker.Item
          style={styles.pickerChild}
          label="Name : Z-A"
          value="Name_desc"
        />
        <Picker.Item
          style={styles.pickerChild}
          label="Price : Low-High"
          value="Price_asc"
        />
        <Picker.Item
          style={styles.pickerChild}
          label="Price : High-Low"
          value="Price_desc"
        />
      </Picker>
    </View>
  );
};

export default memo(PickerOrder);
const styles = StyleSheet.create({
  picker: {
    fontFamily: 'c-Bold',
    fontSize: 20,
    backgroundColor: Colors.lighterBlue,
    width: SCREEN_WIDTH / 2,
    alignSelf: 'center',
  },
  pickerChild: {
    fontFamily: 'c-Bold',
    fontSize: 18,
    backgroundColor: Colors.lighterBlue,
  },
});
