'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { addProductToDatabase } from '@/actions/server-actions';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTransition } from 'react';

const formSchema = z.object({
	product: z.string().min(1).max(50),
	price: z.string(),
});

export const AddProduct = () => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			product: '',
			price: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(() => {
			addProductToDatabase(values).then((data) => {
				console.log('[USE TRANSITION-DATA] - ', data);
			});
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-5 max-w-xl mx-auto p-5"
			>
				<FormField
					control={form.control}
					name="product"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Enter product name..."
									className="border-gray-300 p-2 rounded-md"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Enter a price..."
									className="border-gray-300 p-2 rounded-md"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="border bg-blue-500 text-white p-2 rounded-md">
					Add Product
				</Button>
			</form>
		</Form>
	);
};
