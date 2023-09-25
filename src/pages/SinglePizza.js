import React from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export default function SinglePizza() {
	const [pizza, setPizza] = React.useState();
	const { id } = useParams();
	const navigate = useNavigate();
	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					`https://64fb19d3cb9c00518f7aa530.mockapi.io/items/${id}`,
				);
				setPizza(data);
			} catch (error) {
				console.log(error);
				navigate("/");
			}
		}
		fetchPizza();
	}, []);

	if (!pizza) {
		return "Louding...";
	}

	return (
		<div className="container">
			<picture>
				<img src={pizza.image} alt="Pizza" />
			</picture>

			<h2> {pizza.title}</h2>
			<p>description</p>
			<h4>{pizza.price} uah</h4>
		</div>
	);
}
