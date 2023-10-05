export type CartItem = {
	id: string;
	count: number;
	title: string;
	price: number;
	image: string;
	type: string;
	size: number;
};

export interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
}
