import React from "react";

type CategoriesProps = { categoryId: number; onClickCategory: any };

const Categories: React.FC<CategoriesProps> = ({
	categoryId,
	onClickCategory,
}) => {
	const categories = ["Усі", "М'ясні", "Веган", "Гриль", "Гострі", "Закриті"];

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
};

export default Categories;
