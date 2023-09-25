import { Outlet } from "react-router-dom";

import "../scss/app.scss";

import Header from "./Header.js";

const MainLayout = () => {
	return (
		<div className="wrapper">
			<Header />

			<main className="content">
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
