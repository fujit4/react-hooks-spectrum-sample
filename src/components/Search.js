import React, { useState } from "react";
import { TextField, Button, Flex, } from '@adobe/react-spectrum';

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (value) => { // onChangeイベントは引数がvalueになる
    setSearchValue(value);
  }

  const resetInputField = () => {
    setSearchValue("");
  }

  const callSearchFunction = (e) => {
    // e.preventDefault();                    // onPress event doesn't has preventDefault().
    props.search(searchValue);
    resetInputField();
  }

  return (
        <Flex direction="row" gap="size-100">
          <TextField
            // label="Title" labelPosition="side"
            placeholder="title"
            value={searchValue} onChange={handleSearchInputChanges} />
          <Button variant="cta" onPress={callSearchFunction}>Search</Button>
      </Flex>
  );
};

export default Search;