<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let listing = null;
	let loading = true;
	let error = null;

	// In a real app, this would be replaced with an API call
	const mockListing = {
		id: 1,
		title: 'Gerecupereerde Eiken Balken',
		category: 'Hout',
		price: 1200,
		description:
			'10 massieve eiken balken uit een 19e-eeuws magazijn, uitstekende staat. Perfect voor architecturale kenmerken of hoogwaardige meubelprojecten. Elke balk meet ongeveer 12ft x 12" x 12" en toont een prachtige natuurlijke patina.',
		images: ['/mock-images/item.jpeg', '/mock-images/item.jpeg', '/mock-images/item.jpeg'],
		address: '123 Hoofdstraat, Portland, OR',
		seller: {
			name: 'John Smith',
			rating: 4.8,
			joined: '2023',
			listings: 15
		},
		specifications: {
			Material: 'Eik',
			Age: 'Circa 1890s',
			Condition: 'Goed',
			Quantity: '10 stuks',
			Dimensions: '12ft x 12" x 12"'
		},
		posted: '2024-02-28',
		views: 245
	};

	onMount(async () => {
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 500));
			listing = mockListing;
		} catch (e) {
			error = 'Kon zoekertje niet laden';
		} finally {
			loading = false;
		}
	});

	let selectedImage = 0;
</script>

<svelte:head>
	<title>{listing ? listing.title : 'Laden...'} - Recyclr</title>
</svelte:head>

{#if loading}
	<div class="flex h-screen items-center justify-center">
		<div class="text-xl text-gray-600">Laden...</div>
	</div>
{:else if error}
	<div class="flex h-screen items-center justify-center">
		<div class="text-xl text-red-600">{error}</div>
	</div>
{:else}
	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Breadcrumb -->
		<nav class="mb-8">
			<ol class="flex text-sm">
				<li><a href="/" class="text-gray-500 hover:text-gray-700">Home</a></li>
				<li class="mx-2 text-gray-500">/</li>
				<li><a href="/listing" class="text-gray-500 hover:text-gray-700">Zoekertjes</a></li>
				<li class="mx-2 text-gray-500">/</li>
				<li class="text-gray-900">{listing.title}</li>
			</ol>
		</nav>

		<div class="grid gap-8 lg:grid-cols-2">
			<!-- Images Section -->
			<div class="space-y-4">
				<div class="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg">
					<img
						src={listing.images[selectedImage]}
						alt={listing.title}
						class="h-full w-full object-cover"
					/>
				</div>
				<div class="grid grid-cols-4 gap-4">
					{#each listing.images as image, i}
						<button
							class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg {selectedImage === i
								? 'ring-2 ring-green-500'
								: ''}"
							on:click={() => (selectedImage = i)}
						>
							<img src={image} alt="Thumbnail" class="h-full w-full object-cover" />
						</button>
					{/each}
				</div>
			</div>

			<!-- Details Section -->
			<div class="space-y-6">
				<div>
					<h1 class="text-3xl font-bold text-gray-900">{listing.title}</h1>
					<p class="mt-2 text-3xl font-bold text-green-600">€{listing.price}</p>
				</div>

				<div class="flex items-center space-x-4">
					<div class="flex items-center">
						<span class="text-sm text-gray-500">Geplaatst op {listing.posted}</span>
					</div>
					<div class="text-sm text-gray-500">
						{listing.views} keer bekeken
					</div>
				</div>

				<div>
					<h2 class="text-lg font-medium text-gray-900">Beschrijving</h2>
					<p class="mt-2 whitespace-pre-line text-gray-600">{listing.description}</p>
				</div>

				<div>
					<h2 class="text-lg font-medium text-gray-900">Specificaties</h2>
					<dl class="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
						{#each Object.entries(listing.specifications) as [key, value]}
							<div class="flex justify-between sm:block">
								<dt class="text-sm font-medium text-gray-500">{key}</dt>
								<dd class="text-sm text-gray-900">{value}</dd>
							</div>
						{/each}
					</dl>
				</div>

				<div>
					<h2 class="text-lg font-medium text-gray-900">Locatie</h2>
					<p class="mt-2 flex items-center text-gray-600">
						<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						{listing.address}
					</p>
				</div>

				<div class="border-t border-gray-200 pt-6">
					<div class="flex items-center space-x-4">
						<div class="flex-shrink-0">
							<div class="h-12 w-12 rounded-full bg-gray-200"></div>
						</div>
						<div class="flex-1">
							<h3 class="text-sm font-medium text-gray-900">{listing.seller.name}</h3>
							<div class="mt-1 flex items-center text-sm text-gray-500">
								<span class="mr-2">★ {listing.seller.rating}</span>
								<span>•</span>
								<span class="mx-2">{listing.seller.listings} zoekertjes </span>
								<span>•</span>
								<span class="ml-2">Lid sinds {listing.seller.joined}</span>
							</div>
						</div>
					</div>
				</div>

				<div class="flex space-x-4">
					<button
						class="flex-1 rounded-md bg-green-600 px-6 py-3 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
					>
						Contacteer Verkoper
					</button>
					<button
						class="rounded-md border border-gray-300 px-6 py-3 hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
					>
						<svg
							class="h-6 w-6 text-gray-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
