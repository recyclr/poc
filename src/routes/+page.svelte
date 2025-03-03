<script>
	import { onMount } from 'svelte';

	// Fake data for demonstration
	let featuredListings = [
		{
			id: 1,
			title: 'Reclaimed Oak Beams',
			category: 'Wood',
			price: 1200,
			description: '10 solid oak beams from 19th century warehouse, excellent condition',
			imageUrl: '/api/placeholder/400/300',
			address: '123 Main St, Portland, OR',
			distance: '2.3 km'
		},
		{
			id: 2,
			title: 'Vintage Brick Collection',
			category: 'Masonry',
			price: 850,
			description: '400 red clay bricks from demolished factory building',
			imageUrl: '/api/placeholder/400/300',
			address: '456 Pine Ave, Portland, OR',
			distance: '4.1 km'
		},
		{
			id: 3,
			title: 'Server Racks (x5)',
			category: 'Electronics',
			price: 2000,
			description: 'Five 42U server racks, good condition, all mounting hardware included',
			imageUrl: '/api/placeholder/400/300',
			address: '789 Tech Blvd, Portland, OR',
			distance: '6.8 km'
		},
		{
			id: 4,
			title: 'Granite Countertops',
			category: 'Stone',
			price: 1500,
			description: 'Premium black granite countertops from office renovation',
			imageUrl: '/api/placeholder/400/300',
			address: '101 Market St, Portland, OR',
			distance: '3.5 km'
		}
	];

	let categories = [
		{ name: 'Wood', icon: '🪵', count: 124 },
		{ name: 'Metal', icon: '🔧', count: 89 },
		{ name: 'Stone', icon: '🪨', count: 67 },
		{ name: 'Electronics', icon: '💻', count: 43 },
		{ name: 'Fixtures', icon: '🚿', count: 38 },
		{ name: 'Masonry', icon: '🧱', count: 31 }
	];

	let searchTerm = '';
	let selectedCategory = '';

	function handleSearch() {
		// This would be replaced with actual search logic
		console.log(`Searching for: ${searchTerm} in category: ${selectedCategory}`);
	}

	onMount(() => {
		// Could fetch initial data, initialize map, etc.
	});
</script>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Hero section -->
	<section class="relative mb-12 overflow-hidden rounded-xl bg-green-700">
		<div class="absolute inset-0 bg-gradient-to-r from-green-900 to-green-700 opacity-90"></div>
		<div class="relative px-6 py-16 sm:px-12 sm:py-24 lg:py-32">
			<h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
				Geef bouwmaterialen een tweede leven
			</h1>
			<p class="mt-6 max-w-lg text-xl text-green-100 sm:max-w-3xl">
				Maak contact met sloopbedrijven en vind duurzame materialen voor uw volgende project.
			</p>

			<!-- Search Bar -->
			<div class="mt-8 sm:flex">
				<div class="min-w-0 flex-1">
					<div class="flex rounded-md shadow-sm">
						<div class="relative flex flex-grow items-stretch">
							<input
								bind:value={searchTerm}
								type="text"
								class="block w-full rounded-l-md border-gray-300 px-4 py-3 focus:border-green-500 focus:ring-green-500"
								placeholder="Zoek naar materialen..."
							/>
						</div>
						<select
							bind:value={selectedCategory}
							class="inline-flex items-center border border-l-0 border-gray-300 bg-gray-50 px-4 pr-10 text-gray-700"
						>
							<option value="">Alle Categorieën</option>
							{#each categories as category}
								<option value={category.name}>{category.icon} {category.name}</option>
							{/each}
						</select>
						<button
							on:click={handleSearch}
							class="inline-flex items-center rounded-r-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
						>
							Zoeken
						</button>
					</div>
				</div>
				<div class="mt-3 sm:mt-0 sm:ml-3">
					<a
						href="/map"
						class="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-6 text-base font-medium text-green-700 hover:bg-gray-50 md:px-8 md:py-2.5 md:text-lg"
					>
						Bekijk Kaart
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Category section -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-bold text-gray-900">Blader per categorie</h2>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
			{#each categories as category}
				<a
					href={`/category/${category.name.toLowerCase()}`}
					class="flex flex-col items-center rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
				>
					<span class="mb-2 text-3xl">{category.icon}</span>
					<h3 class="text-lg font-medium text-gray-900">{category.name}</h3>
					<p class="text-sm text-gray-500">{category.count} zoekertjes</p>
				</a>
			{/each}
		</div>
	</section>

	<!-- Featured listings -->
	<section class="mb-12">
		<div class="mb-6 flex items-center justify-between">
			<h2 class="text-2xl font-bold text-gray-900">Aanbevolen zoekertjes</h2>
			<a href="/listings" class="font-medium text-green-600 hover:text-green-800">Bekijk alles</a>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each featuredListings as listing}
				<div
					class="overflow-hidden rounded-lg border border-gray-100 bg-white shadow transition-shadow duration-200 hover:shadow-md"
				>
					<img src="mock-images/item.jpeg" alt={listing.title} class="h-48 w-full object-cover" />
					<div class="p-4">
						<div class="flex items-start justify-between">
							<div>
								<h3 class="line-clamp-1 text-lg font-semibold text-gray-900">{listing.title}</h3>
								<p class="text-sm text-gray-500">{listing.address}</p>
							</div>
							<span class="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800"
								>{listing.category}</span
							>
						</div>
						<p class="mt-2 line-clamp-2 text-sm text-gray-700">{listing.description}</p>
						<div class="mt-4 flex items-center justify-between">
							<span class="text-lg font-bold text-gray-900">${listing.price}</span>
							<span class="text-sm text-gray-500">{listing.distance}</span>
						</div>
						<a
							href={`/listing/${listing.id}`}
							class="mt-4 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
						>
							Bekijk Details
						</a>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Call to action -->
	<section class="mb-12 rounded-lg bg-gray-50 p-8">
		<div class="text-center">
			<h2 class="text-3xl font-bold text-gray-900">Heeft u materialen te verkopen?</h2>
			<p class="mx-auto mt-2 max-w-3xl text-xl text-gray-500">
				Plaats uw sloopmaterialen en kom in contact met kopers in uw regio.
			</p>
			<div class="mt-6">
				<a
					href="/create-listing"
					class="inline-flex items-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
				>
					Maak een zoekertje
				</a>
			</div>
		</div>
	</section>
</div>
