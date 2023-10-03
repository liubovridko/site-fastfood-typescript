import React from "react";
import { useWhyDidYouUpdate } from "ahooks";
type CategoriesProps = {
	categoryId: number;
	onClickCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
	({ categoryId, onClickCategory }) => {
		/*useWhyDidYouUpdate("Categories", {
		categoryId,
		onClickCategory,
	});*/
		const categories = [
			"Усі",
			"М'ясні",
			"Веган",
			"Гриль",
			"Гострі",
			"Закриті",
		];

		return (
			<div className="sort__category">
				<ul>
					{categories.map((categoryName, i) => (
						<li
							key={i}
							onClick={() => onClickCategory(i)}
							className={categoryId == i ? "active" : ""}
						>
							{categoryName}
						</li>
					))}
				</ul>
			</div>
		);
	},
);

export default Categories;
