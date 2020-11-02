import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export function ComboBox(props) {
  return (
    <Autocomplete
      options={props.data}
      getOptionLabel={(option) => option.description}
      style={{ width: 370 }}
      renderInput={(params) => <TextField {...params} label="Tags" variant="outlined" />}
    />
  );
}

export function ComboBoxUser(props) {
    return (
      <Autocomplete
        options={props.data}
        getOptionLabel={(option) => option.user_name}
        style={{ width: 370 }}
        renderInput={(params) => <TextField {...params} label="User" variant="outlined" />}
      />
    );
}
