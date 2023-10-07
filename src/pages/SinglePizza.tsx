import React from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const SinglePizza: React.FC = () => {
	const [pizza, setPizza] = React.useState<{
		image: string;
		price: number;
		title: string;
	}>();
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
			<div className="pizza-block">
				<div className="pizza-block__image">
					<img src={"/" + pizza.image} alt={pizza.title} />
				</div>

				<h2> {pizza.title}</h2>
				<p>description</p>
				<h4>{pizza.price} uah</h4>
			</div>
		</div>
	);
};

export default SinglePizza;
