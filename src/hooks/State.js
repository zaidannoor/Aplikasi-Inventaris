import { useState } from 'react';
 
function State(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);
 
  const onValueChangeHandler = (event) => {
    setValue(event.target.value);
  };
 
  return [value, onValueChangeHandler];
}
 
export default State;