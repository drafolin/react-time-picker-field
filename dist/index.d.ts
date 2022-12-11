interface timePickerProps<T> {
	onChange: (v: T) => void;
	value?: T;
	className?: string;
}

export default function TimePicker<T>(props: timePickerProps<T>): JSX.Element;
