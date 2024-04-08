import { AddProduct } from '@/components/add-product';
import { Product } from '@/typings';

export default async function Home() {
	const res = await fetch('http://localhost:3000/api/products', {
		cache: 'no-store',
		next: {
			tags: ['products'],
		},
	});
	const products: Product[] = await res.json();

	return (
		<main>
			<h1 className="text-3xl font-bold text-center">Products Warehouse</h1>
			<AddProduct />
			<h2 className="font-bold p-5">List of Products</h2>
			<div className="flex flex-wrap gap-5">
				{products.map((product) => (
					<div key={product.id} className="p-5 shadow">
						<p>{product.product}</p>
						<p>{product.price}</p>
					</div>
				))}
			</div>
		</main>
	);
}
