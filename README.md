# React time picker field

A simple time picker for React.
It's based on [vue-timepicker](https://vue3datepicker.com), but it's not directly a port.
It currently is very basic, and only supports these props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `'00:00'` | The value of the time picker |
| `onChange` | `function` | `() => {}` | The function to call when the value changes |

## Usage

```jsx
import React from 'react';
import TimePicker from 'react-time-picker-field';

const App = () => {
	const [time, setTime] = React.useState('12:00');

	return (
		<TimePicker
			value={time}
			onChange={setTime}
		/>
	);
};
```

I am, of course, open to suggestions and pull requests, so feel free to contribute!
