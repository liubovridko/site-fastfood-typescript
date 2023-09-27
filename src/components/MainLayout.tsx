import React from "react";
import { Outlet } from "react-router-dom";

import "../scss/app.scss";

import Header from "./Header";

const MainLayout: React.FC = () => {
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
