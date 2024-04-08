import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET() {
	try {
		const products = await db.products.findMany();
		if (!products) {
			return new NextResponse('Product not found', { status: 404 });
		}
		return new NextResponse(JSON.stringify(products), { status: 200 });
	} catch (error) {
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}

export async function POST(req: Request) {
	const { product, price } = await req.json();

	const existingProduct = await db.products.findUnique({
		where: {
			product: product,
		},
	});
	if (existingProduct) {
		return NextResponse.json(
			{ message: 'product already exists' },
			{ status: 400 }
		);
	}
	const newProduct = await db.products.create({
		data: { product, price },
	});

	return NextResponse.json(
		{ products: newProduct, message: 'Product created successfully' },
		{ status: 200 }
	);
}
