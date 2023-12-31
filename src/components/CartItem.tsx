import React from "react";
import { useDispatch } from "react-redux";
import {
	addItem,
	minusItem,
	removeItem,
	CartItem,
} from "../redux/slices/cartSlice";

type CartItemProps = {
	id: string;
	count: number;
	title: string;
	price: number;
	image: string;
	type: string;
	size: number;
};
const CartItemBlock: React.FC<CartItemProps> = ({
	id,
	count,
	title,
	price,
	image,
	type,
	size,
}) => {
	const dispatch = useDispatch();
	const onClickPlus = () => {
		dispatch(addItem({ id } as CartItem));
	};
	const onClickMinus = () => {
		dispatch(minusItem(id));
	};
	const onClickRemove = () => {
		if (window.confirm("Бажаєте видалити ?")) {
			dispatch(removeItem(id));
		}
	};
	return (
		<div className="cart__item">
			<div className="cart__item--info">
				<picture>
					<img src={image} />
				</picture>
				<div className="cart__item--title">
					<h3>{title}</h3>
					<span>
						{type}, {size} см
					</span>
				</div>
			</div>
			<div className="cart__item--count">
				<button
					disabled={count == 1}
					onClick={onClickMinus}
					className="button button--outline button--circle"
				>
					-
				</button>
				<b>{count}</b>
				<button
					onClick={onClickPlus}
					className="button button--outline button--circle"
				>
					+
				</button>
			</div>
			<div className="cart__item--price">
				<b>{price * count} грн</b>
			</div>
			<div
				onClick={onClickRemove}
				className="button button--grey button--circle"
			>
				<span>x</span>
			</div>
		</div>
	);
};

export default CartItemBlock;
