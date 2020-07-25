import React from "react";
import { Header, Heading, View, Flex } from '@adobe/react-spectrum';
import ColorSchemeSwitch from './ColorSchemeSwitch';

const HookedHeader = (props) => {
  return (
    <Header>
      {/* 背景色 */}
      <View backgroundColor="red-500">
        {/* 文言を中央寄せ */}
        <Flex direction="row" justifyContent="center">
          {/* h2と同等 */}
          <Heading level="2" >
            <font color="white">{props.text}</font>
          </Heading>
          <View position="absolute" right="size-0">
            <ColorSchemeSwitch
              switch={props.switch}
              currentColorScheme={props.currentColorScheme}>
            </ColorSchemeSwitch>
          </View>
        </Flex>
      </View>
    </Header>
  );
};

export default HookedHeader;