interface timePickerProps<T> {
	onChange: (v: T) => void;
	value?: T;
}

export default function TimePicker<T>(props: timePickerProps<T>): JSX.Element;
