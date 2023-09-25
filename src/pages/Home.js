import React from "react";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
	selectFilter,
} from "../redux/slices/filterSlice.js";
import {
	selectPizzaData,
	setItems,
	fetchPizzas,
} from "../redux/slices/pizzaSlice.js";

import qs from "qs";
import { useNavigate, Link } from "react-router-dom";

import Categories from "../components/Categories.js";
import Sort, { sortList } from "../components/Sort.js";
import PizzaBlock from "../components/PizzaBlock.js";
import Skeleton from "../components/Skeleton.js";
import Pagination from "../components/Pagination/";

export default function Home() {
	const { items, status } = useSelector(selectPizzaData);

	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);
	//const [items, setItems] = React.useState([]);
	//const [isLoading, setIsLoading] = React.useState(true);
	//const [categoryId, setCategoryId] = React.useState(0);

	const onClickCategory = React.useCallback((id) => {
		dispatch(setCategoryId(id));
	}, []);
	/*const [sortObj, setSortObj] = React.useState({
		name: "популярні",
		sortProperty: "rating",
	});*/
	/*const [currentPage, setCurrentPage] = React.useState(1);*/
	const onChangePage = (page) => {
		dispatch(setCurrentPage(page));
	};

	//if params was changed and first render is done
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage]);
	//if first render is done-check url params and save it in redux
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find((obj) => {
				return obj.sortProperty == params.sortProperty;
			});
			dispatch(setFilters({ ...params, sort }));
			isSearch.current = true;
		}
	}, []);

	const getPizzas = async () => {
		const category = categoryId > 0 ? `&category=${categoryId}` : "";
		const sortBy = sort.sortProperty.replace("-", "");
		const order = sort.sortProperty.includes("-") ? "asc" : "desc";
		const search = searchValue ? `&search=${searchValue}` : "";

		try {
			dispatch(
				fetchPizzas({ category, sortBy, order, search, currentPage }),
			);
			/*const res = await axios.get(
				`https://64fb19d3cb9c00518f7aa530.mockapi.io/items?limit=4&page=${currentPage}${category}&sortBy=${sortBy}&order=${order}${search}`,
			);
			dispatch(setItems(res.data));*/
		} catch (error) {
			console.log(error, "Reqiured error");
		}
	};
	//if first render is done-make a request for pizza
	React.useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	return (
		<div className="container">
			<div className="block__filter">
				<Categories
					categoryId={categoryId}
					onClickCategory={onClickCategory}
				/>
				<Sort />
			</div>
			<h2 className="content__title">Усі піцци</h2>
			{status == "error" ? (
				<div className="content__error-info">
					<h2>Помилка 😕</h2>
					<p>
						Нажаль, не вийшло отримати піцци.
						<br />
						Спробуйте повторити запит.
					</p>
				</div>
			) : (
				<div className="content__items">
					{status == "loading"
						? [...new Array(6)].map((_, index) => (
								<Skeleton key={index} />
						  ))
						: items
								.filter((obj) => {
									if (
										obj.title
											.toLowerCase()
											.includes(searchValue.toLowerCase())
									) {
										return true;
									}
									return false;
								})
								.map((item, key) => (
									<Link
										key={item.id}
										to={`/pizza/${item.id}`}
									>
										{" "}
										<PizzaBlock {...item} />
									</Link>
								))}
				</div>
			)}

			<Pagination
				currrentPage={currentPage}
				onChangePage={onChangePage}
			/>
		</div>
	);
}
