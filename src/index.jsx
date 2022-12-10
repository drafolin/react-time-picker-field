import React, { useEffect } from "react";

const TimePicker = (
	props
) => {
	const [value, setValue] = React.useState("");

	const parseInput = (value) => {
		const [hours, minutes] = value.split(":");
		if (hours && minutes) {
			const parsedHours = parseInt(hours);
			const parsedMinutes = parseInt(minutes);
			if (parsedHours && parsedMinutes || parsedHours === 0 || parsedMinutes === 0) {
				return new Date(0, 0, 0, parsedHours, parsedMinutes);
			}
		}
		return null;
	};

	const handleChange = (e) => {
		if (!parseInput(e.target.value)) {
			console.log("Invalid time format");
			setValue(e.target.value);
			return;
		}
		setValue(`00${parseInput(e.target.value).getHours()}`.slice(-2) + ":" + `00${parseInput(e.target.value).getMinutes()}`.slice(-2));
		console.log(`00${parseInput(e.target.value).getHours()}`.slice(-2) + ":" + `00${parseInput(e.target.value).getMinutes()}`.slice(-2));
		if (typeof props.value === "undefined") {
			props.onChange(parseInput(e.target.value));
		} else if (typeof props.value === "string") {
			props.onChange(`00${parseInput(e.target.value).getHours()}`.slice(-2) + ":" + `00${parseInput(e.target.value).getMinutes()}`.slice(-2));
		} else if (props.value instanceof Date) {
			props.onChange(parseInput(e.target.value));
		} else {
			throw new Error("Invalid time format");
		}
	};


	useEffect(() => {
		if (typeof props.value === "undefined") {
			setValue("00:00");
		} else if (typeof props.value === "string") {
			if (!props.value.includes(":")) {
				throw new Error("Invalid time format");
			}
			setValue(props.value);
		} else if (props.value instanceof Date) {
			const hours = ("00" + props.value.getHours()).slice(-2);
			const minutes = ("00" + props.value.getMinutes()).slice(-2);
			setValue(`${hours}:${minutes}`);
		} else {
			throw new Error("Invalid time format");
		}
	}, [props.value]);

	return (
		<>
			<input
				onInput={handleChange}
				value={value}
			/>
		</>
	);
};
export default TimePicker;
