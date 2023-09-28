import React from "react";

import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice.js";

import styles from "./Search.module.scss";

import debounce from "lodash.debounce";

export default function Search(): React.ReactNode {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState<string>("");
	const inputRef = React.useRef<HTMLInputElement>(null);

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};
	const updateSearchValue = React.useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 1000),
		[],
	);
	const onClickClear = () => {
		dispatch(setSearchValue(""));
		setValue("");

		inputRef.current?.focus();
	};

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				height="512px"
				id="Layer_1"
				version="1.1"
				viewBox="0 0 512 512"
				width="512px"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z" />
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				placeholder="Пошук піцц..."
			/>
			{value && (
				<svg
					onClick={onClickClear}
					className={styles.clear}
					fill="none"
					height="24"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					viewBox="0 0 24 24"
					width="24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<line x1="18" x2="6" y1="6" y2="18" />
					<line x1="6" x2="18" y1="6" y2="18" />
				</svg>
			)}
		</div>
	);
}
