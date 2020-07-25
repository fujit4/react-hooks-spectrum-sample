import React from 'react';
import { ActionButton, View } from '@adobe/react-spectrum';
import Light from '@spectrum-icons/workflow/Light';
import Contrast from '@spectrum-icons/workflow/Contrast';

const ColorSchemeSwitch = (props) => {

  const turnLightOn = (e) => {
    props.switch("TURN_LIGHT_ON")
  }

  const turnLightOff = (e) => {
    props.switch("TURN_LIGHT_OFF")
  }

  return (
    <View>
      {props.currentColorScheme === "light" ? (
        // button to turn light off
        <ActionButton onPress={turnLightOff}>
          <Contrast size="L" />
        </ActionButton>
      ) : (
          // button to turn light on
          <ActionButton onPress={turnLightOn}>
            <Light size="L" />
          </ActionButton>
        )
      }
    </View>
  );
};

export default ColorSchemeSwitch;