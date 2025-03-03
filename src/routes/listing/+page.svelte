<script>
	let listings = [
		{
			id: 1,
			title: 'Reclaimed Wooden Beams',
			description: 'Set of oak beams from 1920s building demolition',
			price: 500,
			location: 'Berlin',
			image: 'https://placehold.co/600x400',
			category: 'Wood'
		},
		{
			id: 2,
			title: 'Vintage Bricks',
			description: '300 red clay bricks in good condition',
			price: 250,
			location: 'Hamburg',
			image: 'https://placehold.co/600x400',
			category: 'Masonry'
		},
		{
			id: 3,
			title: 'Vintage Bricks',
			description: '300 red clay bricks in good condition',
			price: 250,
			location: 'Hamburg',
			image: 'https://placehold.co/600x400',
			category: 'Masonry'
		},
		{
			id: 4,
			title: 'Vintage Bricks',
			description: '300 red clay bricks in good condition',
			price: 250,
			location: 'Hamburg',
			image: 'https://placehold.co/600x400',
			category: 'Masonry'
		},
		{
			id: 5,
			title: 'Vintage Bricks',
			description: '300 red clay bricks in good condition',
			price: 250,
			location: 'Hamburg',
			image: 'https://placehold.co/600x400',
			category: 'Masonry'
		}
		// Add more mock data as needed
	];
</script>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">Available Listings</h1>
		<a
			href="/listing/create"
			class="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
		>
			Create Listing
		</a>
	</div>

	<!-- Filters -->
	<div class="mb-6">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<input
				type="text"
				placeholder="Search listings..."
				class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
			/>
			<select
				class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
			>
				<option value="">All Categories</option>
				<option value="wood">Wood</option>
				<option value="masonry">Masonry</option>
				<option value="metal">Metal</option>
				<option value="fixtures">Fixtures</option>
			</select>
			<select
				class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
			>
				<option value="">Sort By</option>
				<option value="price-asc">Price: Low to High</option>
				<option value="price-desc">Price: High to Low</option>
				<option value="date">Date Added</option>
			</select>
		</div>
	</div>

	<!-- Listings Grid -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each listings as listing}
			<div class="overflow-hidden rounded-lg bg-white shadow-sm">
				<img src="mock-images/item.jpeg" alt={listing.title} class="h-48 w-full object-cover" />
				<div class="p-4">
					<h3 class="text-lg font-medium text-gray-900">
						{listing.title}
					</h3>
					<p class="mt-1 text-sm text-gray-500">
						{listing.description}
					</p>
					<div class="mt-4 flex items-center justify-between">
						<span class="font-medium text-green-600">€{listing.price}</span>
						<span class="text-sm text-gray-500">{listing.location}</span>
					</div>
					<div class="mt-4">
						<a
							href="/listing/{listing.id}"
							class="inline-flex w-full items-center justify-center rounded-md border border-green-600 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50"
						>
							View Details
						</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
