import React, { useEffect } from "react";

const TimePicker = (
	props
) => {
	const [value, setValue] = React.useState("");
	const [formattedValue, setFormattedValue] = React.useState("");
	const [popoutVisible, setPopoutVisible] = React.useState(false);

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
		setValue(e.target.value);
		setFormattedValue(`00${parseInput(e.target.value).getHours()}`.slice(-2) + ":" + `00${parseInput(e.target.value).getMinutes()}`.slice(-2));

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
			setFormattedValue("00:00");
		} else if (typeof props.value === "string") {
			if (!props.value.includes(":")) {
				throw new Error("Invalid time format");
			}
			setValue(props.value);
			setFormattedValue(props.value);
		} else if (props.value instanceof Date) {
			const hours = ("00" + props.value.getHours()).slice(-2);
			const minutes = ("00" + props.value.getMinutes()).slice(-2);
			setValue(`${hours}:${minutes}`);
			setFormattedValue(`${hours}:${minutes}`);
		} else {
			throw new Error("Invalid time format");
		}
	}, [props.value]);

	const saveTime = (newDate) => {
		setFormattedValue(`00${newDate.getHours()}`.slice(-2) + ":" + `00${newDate.getMinutes()}`.slice(-2));
		setValue(`00${newDate.getHours()}`.slice(-2) + ":" + `00${newDate.getMinutes()}`.slice(-2));
		if (typeof props.value === "undefined") {
			props.onChange(newDate);
		} else if (typeof props.value === "string") {
			props.onChange(`00${newDate.getHours()}`.slice(-2) + ":" + `00${newDate.getMinutes()}`.slice(-2));
		} else if (props.value instanceof Date) {
			props.onChange(newDate);
		} else {
			throw new Error("Invalid time format");
		}
	};

	return (
		<div
			className={props.className || "rtpf"}
		>
			<input className="rtpf__input"
				onInput={handleChange}
				onFocus={() => { setPopoutVisible(true); }}
				onBlur={() => { setPopoutVisible(false); }}
				value={value} />
			<div className={`rtpf__popout ${popoutVisible ? "rtpf__popout--active" : ""}`}>
				<div className="rtpf__increment-row">
					<button
						className="rtpf__increment-button rtpf__increment-button--hours"
						onClick={() => {
							const [hours, minutes] = formattedValue.split(":");
							const parsedHours = parseInt(hours) + 1;
							const parsedMinutes = parseInt(minutes);
							// check that it's still valid time, otherwise loop back to 00:xx
							if (parsedHours === 24) {
								const newDate = new Date(0, 0, 0, 0, parsedMinutes);
								saveTime(newDate);
								return;
							}
							const newDate = new Date(0, 0, 0, parsedHours, parsedMinutes);
							saveTime(newDate);
						}}
					>
						+
					</button>
					<button
						className="rtpf__increment-button rtpf__increment-button--minutes"
						onClick={() => {
							const [hours, minutes] = formattedValue.split(":");
							const parsedHours = parseInt(hours);
							const parsedMinutes = parseInt(minutes) + 1;
							// check that it's still valid time, otherwise loop back to (xx+1):00
							if (parsedMinutes === 60) {
								const newDate = new Date(0, 0, 0, parsedHours + 1, 0);
								saveTime(newDate);
								return;
							}
							const newDate = new Date(0, 0, 0, parsedHours, parsedMinutes);
							saveTime(newDate);
						}}
					>
						+
					</button>
				</div>
				<div
					className="rtpf__time-display"
				>
					<span
						className="rtpf__time-display-hours"
					>
						{formattedValue.split(":")[0]}
					</span>
					<span
						className="rtpf__time-display-separator"
					>
						:
					</span>
					<span
						className="rtpf__time-display-minutes"
					>
						{formattedValue.split(":")[1]}
					</span>
				</div>
				<div
					className="rtpf__decrement-row"
				>
					<button
						className="rtpf__decrement-button rtpf__decrement-button--hours"
						onClick={() => {
							const [hours, minutes] = formattedValue.split(":");
							const parsedHours = parseInt(hours) - 1;
							const parsedMinutes = parseInt(minutes);
							// check that it's still valid time, otherwise loop back to 23:xx
							if (parsedHours === -1) {
								const newDate = new Date(0, 0, 0, 23, parsedMinutes);
								saveTime(newDate);
								return;
							}
							const newDate = new Date(0, 0, 0, parsedHours, parsedMinutes);
							saveTime(newDate);
						}}
					>
						-
					</button>
					<button
						className="rtpf__decrement-button rtpf__decrement-button--minutes"
						onClick={() => {
							const [hours, minutes] = formattedValue.split(":");
							const parsedHours = parseInt(hours);
							const parsedMinutes = parseInt(minutes) - 1;
							// check that it's still valid time, otherwise loop back to (xx-1):59
							if (parsedMinutes === -1) {
								const newDate = new Date(0, 0, 0, parsedHours - 1, 59);
								saveTime(newDate);
								return;
							}
							const newDate = new Date(0, 0, 0, parsedHours, parsedMinutes);
							saveTime(newDate);
						}}
					>
						-
					</button>
				</div>
			</div>
		</div>
	);
};
export default TimePicker;
