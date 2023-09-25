import styles from "./NotFoundBlock.module.scss";

export default function NotFoundBlock() {
	return (
		<div className={styles.not_found}>
			<h1>
				<span>😕</span> <br />
				Not found page
			</h1>
			<p>Ця сторінка не знайдена. Будь ласка перевірте Ваш запит</p>
		</div>
	);
}
