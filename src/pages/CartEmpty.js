import { Link } from "react-router-dom";

export default function CartEmpty() {
	return (
		<div className="container--cart">
			<div className="cart cart--empty">
				<h2>Кошик порожній 😕</h2>
				<p>
					Найімовірніше, ви не замовляли ще піцу.
					<br />
					Щоб замовити піцу, перейди на головну сторінку.
				</p>
				<picture>
					<source srcSet="img/cart-empty.webp" type="image/webp" />
					<img src="img/cart-empty.png" alt="Empty cart" />
				</picture>
				<Link to="/" className="button button--black">
					<span>Повернутися назад</span>
				</Link>
			</div>
		</div>
	);
}
