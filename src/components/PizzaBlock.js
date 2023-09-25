import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../redux/slices/cartSlice.js";

const nameOfTypes = ["тонке", "традиційне"];

export default function PizzaBlock({ id, title, image, price, sizes, types }) {
	const dispatch = useDispatch();
	const cartItem = useSelector((state) =>
		state.cartReducer.items.find((obj) => obj.id == id),
	); //selectCartItemById(id)

	const pizzaCount = cartItem ? cartItem.count : 0;

	const [activeType, setActiveType] = React.useState(0);
	const [activeSize, setActiveSize] = React.useState(0);

	const onAddPizza = () => {
		const item = {
			id,
			title,
			image,
			price,
			size: sizes[activeSize],
			type: nameOfTypes[activeType],
		};

		dispatch(addItem(item));
	};
	return (
		<div className="pizza-block-wrapper">
			<div className="pizza-block">
				<div className="pizza-block__image">
					<picture>
						<img src={image} />
					</picture>
				</div>
				<h3 className="pizza-block__title">{title}</h3>
				<div className="pizza-block__options">
					<ul>
						{types.map((typeId) => (
							<li
								onClick={() => setActiveType(typeId)}
								key={typeId}
								className={activeType == typeId ? "active" : ""}
							>
								{nameOfTypes[typeId]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((size, i) => (
							<li
								onClick={() => setActiveSize(i)}
								key={i}
								className={activeSize == i ? "active" : ""}
							>
								{size} см
							</li>
						))}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">від {price}грн</div>
					<button onClick={onAddPizza} className="button button--add">
						<svg
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
								fill="#EB5A1E"
							/>
						</svg>
						<span>Додати</span>
						{pizzaCount > 0 && (
							<i style={{ display: "inline-block" }}>
								{pizzaCount}
							</i>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
