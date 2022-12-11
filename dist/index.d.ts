interface timePickerProps<T> {
	onChange: (v: T) => void;
	value?: T;
	className?: string;
	hoursInterval?: number;
	minutesInterval?: number;
}

export default function TimePicker<T>(props: timePickerProps<T>): JSX.Element;
