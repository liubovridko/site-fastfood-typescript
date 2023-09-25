import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../redux/slices/cartSlice.js";

export default function CartItem({
	id,
	count,
	title,
	price,
	image,
	type,
	size,
}) {
	const dispatch = useDispatch();
	const onClickPlus = () => {
		dispatch(addItem({ id }));
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
				<div
					onClick={onClickMinus}
					className="button button--outline button--circle"
				>
					-
				</div>
				<b>{count}</b>
				<div
					onClick={onClickPlus}
					className="button button--outline button--circle"
				>
					+
				</div>
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
}
