import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type PaginationProps = {
	currentPage: number;
	onChangePage: any;
};

export default function Pagination({
	currentPage,
	onChangePage,
}: PaginationProps): React.ReactNode {
	return (
		<>
			<ReactPaginate
				className={styles.root}
				breakLabel="..."
				nextLabel=">"
				onPageChange={(event) => onChangePage(event.selected + 1)}
				pageRangeDisplayed={4}
				pageCount={3}
				previousLabel="<"
				renderOnZeroPageCount={null}
			/>
		</>
	);
}
