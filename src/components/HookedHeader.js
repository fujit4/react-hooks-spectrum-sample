import React from "react";
import { Header, Heading, View, Flex } from '@adobe/react-spectrum';

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
        </Flex>
      </View>
    </Header>
  );
};

export default HookedHeader;