'use server';

import { Product } from '@/typings';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const formSchema = z.object({
	product: z.string().min(1).max(50),
	price: z.string(),
});

export const addProductToDatabase = async (
	values: z.infer<typeof formSchema>
) => {
	const validatedFields = formSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' };
	}

	const { product, price } = validatedFields.data;

	if (!product || !price) {
		throw Error;
	}

	const newProduct: Product = {
		product: product,
		price: price,
	};

	await fetch('http://localhost:3000/api/products', {
		method: 'POST',
		body: JSON.stringify(newProduct),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	revalidateTag('products');
};
