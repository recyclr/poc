<script>
	import { MapLibre, GeoJSON, CircleLayer, SymbolLayer } from 'svelte-maplibre';
	import listings from '$lib/assets/data/listings.js';
	import categories from '$lib/assets/data/categories.js';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { goto } from '$app/navigation';

	let mapCenter = [3.2247, 51.2093];
	let mapZoom = 10;
	let isFilterDrawerOpen = false;
	let searchTerm = '';
	let selectedListing = null; // Track the selected listing for the drawer
	let filters = {
		categories: [],
		priceRange: [0, 5000],
		distance: 50,
		datePosted: 'any'
	};

	// Transform listings data into GeoJSON format
	let listingsFormatted = {
		type: 'FeatureCollection',
		features: listings.map((listing) => ({
			type: 'Feature',
			properties: {
				id: listing.id,
				title: listing.title,
				category: listing.category,
				price: listing.price,
				description: listing.description,
				imageUrl: listing.images[0], // Use first image from images array
				address: listing.address
			},
			geometry: listing.geometry
		}))
	};

	let categoriesFormatted = categories.map((cat) => ({ ...cat, checked: false }));

	function toggleFilterDrawer() {
		isFilterDrawerOpen = !isFilterDrawerOpen;
	}

	function handleSearch() {
		// This would be replaced with actual search logic
		console.log(`Zoeken naar: ${searchTerm}`);
		// Close the drawer after search
		isFilterDrawerOpen = false;
	}

	function resetFilters() {
		categoriesFormatted = categories.map((cat) => ({ ...cat, checked: false }));
		filters = {
			categories: [],
			priceRange: [0, 5000],
			distance: 50,
			datePosted: 'any'
		};
	}

	function applyFilters() {
		// Get selected categories
		filters.categories = categories.filter((cat) => cat.checked).map((cat) => cat.name);

		console.log('Toegepaste filters:', filters);
		isFilterDrawerOpen = false;

		// Here you would filter the map markers based on filters
		// For this demo, we just log the action
		console.log('Filteren van kaartmarkeringen met:', filters);
	}

	function getCurrentLocation() {
		if (navigator.geolocation && map) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					mapCenter = [longitude, latitude];
					mapZoom = 14;

					console.log(`Gebruikerslocatie: ${latitude}, ${longitude}`);
				},
				(error) => {
					console.error('Fout bij het ophalen van locatie:', error);
					alert('Kan uw locatie niet ophalen. Controleer uw browserinstellingen.');
				}
			);
		} else {
			alert('Geolocatie wordt niet ondersteund door uw browser.');
		}
	}

	// Function to close the drawer
	function closeDrawer() {
		selectedListing = null;
	}

	// Function to navigate to the details page
	function goToDetailsPage(listingId) {
		//  navigate to a details page at /listing/:listingId
		console.log(`Navigeren naar zoekertje details voor ID: ${listingId}`);

		goto(`/listing/${listingId}`);
	}

	// Updated handler for feature clicks to show drawer
	function handleFeatureClick(e) {
		const feature = e.features[0]; // Get the clicked feature
		if (!feature) return;

		// If it's a cluster, just center and zoom (existing behavior)
		if (feature.properties.cluster) {
			const coordinates = feature.geometry.coordinates;
			mapCenter = coordinates;
			mapZoom = 14;
			return;
		}

		// If it's an individual marker, set the selected listing and center the map
		selectedListing = feature.properties;
		mapCenter = feature.geometry.coordinates;
	}
</script>

<svelte:head>
	<title>Kaart - Recyclr</title>
</svelte:head>

<div class=" relative flex h-screen flex-col">
	<!-- Search and filter bar -->
	<div class=" bg-white p-4 shadow-md">
		<div class="mx-auto flex max-w-7xl items-center space-x-2">
			<div class="flex flex-grow items-center">
				<input
					bind:value={searchTerm}
					type="text"
					class="w-full rounded-l-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-green-500"
					placeholder="Zoek materialen of locatie..."
				/>
				<button
					on:click={handleSearch}
					class="rounded-r-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>

			<button
				on:click={toggleFilterDrawer}
				class="flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 hover:bg-gray-50"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mr-1 h-5 w-5 text-gray-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
					/>
				</svg>
				Filters
			</button>

			<button
				on:click={getCurrentLocation}
				class="rounded-full bg-green-600 p-2 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
				title="Gebruik mijn locatie"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
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
			</button>
		</div>
	</div>

	<!-- Filter drawer -->
	{#if isFilterDrawerOpen}
		<div
			class="absolute top-16 right-0 left-0 z-20 max-h-[80vh] overflow-y-auto bg-white p-4 shadow-lg"
		>
			<div class="mx-auto max-w-7xl">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-xl font-bold text-gray-900">Filters</h2>
					<button on:click={toggleFilterDrawer} class="text-gray-500 hover:text-gray-700">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<!-- Categories -->
				<div class="mb-6">
					<h3 class="mb-2 text-lg font-medium text-gray-900">Categorieën</h3>
					<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
						{#each categories as category}
							<label
								class="flex cursor-pointer items-center space-x-2 rounded-md border p-2 hover:bg-gray-50"
							>
								<input
									type="checkbox"
									bind:checked={category.checked}
									class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
								/>
								<span class="text-gray-700">{category.icon} {category.name}</span>
							</label>
						{/each}
					</div>
				</div>

				<!-- Price Range -->
				<div class="mb-6">
					<h3 class="mb-2 text-lg font-medium text-gray-900">Prijsklasse</h3>
					<div class="px-2">
						<input
							type="range"
							min="0"
							max="10000"
							step="100"
							bind:value={filters.priceRange[1]}
							class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-green-600"
						/>
						<div class="mt-2 flex justify-between">
							<span class="text-sm text-gray-500">€0</span>
							<span class="text-sm font-medium text-gray-900">€{filters.priceRange[1]}</span>
							<span class="text-sm text-gray-500">€10,000+</span>
						</div>
					</div>
				</div>

				<!-- Distance -->
				<div class="mb-6">
					<h3 class="mb-2 text-lg font-medium text-gray-900">Afstand</h3>
					<div class="px-2">
						<input
							type="range"
							min="1"
							max="100"
							bind:value={filters.distance}
							class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-green-600"
						/>
						<div class="mt-2 flex justify-between">
							<span class="text-sm text-gray-500">1 km</span>
							<span class="text-sm font-medium text-gray-900">{filters.distance} km</span>
							<span class="text-sm text-gray-500">100+ km</span>
						</div>
					</div>
				</div>

				<!-- Date Posted -->
				<div class="mb-6">
					<h3 class="mb-2 text-lg font-medium text-gray-900">Datum Geplaatst</h3>
					<div class="grid grid-cols-4 gap-2">
						{#each ['Elke', 'Vandaag', 'Deze Week', 'Deze Maand'] as dateOption, i}
							<label
								class="flex cursor-pointer items-center justify-center rounded-md border p-2 hover:bg-gray-50"
							>
								<input
									type="radio"
									name="datePosted"
									value={['any', 'today', 'week', 'month'][i]}
									bind:group={filters.datePosted}
									class="hidden"
								/>
								<span
									class={`text-sm ${filters.datePosted === ['any', 'today', 'week', 'month'][i] ? 'font-medium text-green-600' : 'text-gray-700'}`}
								>
									{dateOption}
								</span>
							</label>
						{/each}
					</div>
				</div>

				<!-- Action buttons -->
				<div class="flex justify-end space-x-4">
					<button
						on:click={resetFilters}
						class="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
					>
						Reset
					</button>
					<button
						on:click={applyFilters}
						class="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
					>
						Toepassen
					</button>
				</div>
			</div>
		</div>
	{/if}

	<MapLibre
		bind:center={mapCenter}
		bind:zoom={mapZoom}
		class="h-full w-full"
		standardControls
		style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
	>
		<GeoJSON
			id="listings"
			data={listingsFormatted}
			cluster={{
				radius: 50,
				maxZoom: 14,
				properties: {
					total_price: ['+', ['get', 'price']]
				}
			}}
		>
			<CircleLayer
				id="clusters"
				applyToClusters
				hoverCursor="pointer"
				paint={{
					'circle-color': '#38A169',
					'circle-radius': ['step', ['get', 'point_count'], 20, 3, 25, 6, 30],
					'circle-stroke-width': 1,
					'circle-stroke-color': '#fff'
				}}
				onclick={handleFeatureClick}
			/>

			<SymbolLayer
				id="cluster_count"
				applyToClusters
				layout={{
					'text-field': '{point_count_abbreviated}',
					'text-font': ['Open Sans Bold'],
					'text-size': 12
				}}
				paint={{
					'text-color': '#ffffff'
				}}
			/>

			<CircleLayer
				id="unclustered_point"
				applyToClusters={false}
				hoverCursor="pointer"
				paint={{
					'circle-color': '#38A169',
					'circle-radius': 8,
					'circle-stroke-width': 1,
					'circle-stroke-color': '#fff'
				}}
				onclick={handleFeatureClick}
			/>
		</GeoJSON>
	</MapLibre>

	<!-- Bottom Drawer for listing details -->
	{#if selectedListing}
		<div
			class="fixed right-0 bottom-0 left-0 z-30 transform rounded-t-xl bg-white shadow-lg transition-transform duration-300 ease-in-out"
		>
			<div class="p-4">
				<!-- Drawer handle/indicator -->
				<div class="mb-2 flex justify-center">
					<div class="h-1 w-12 rounded-full bg-gray-300"></div>
				</div>

				<!-- Close button -->
				<button
					on:click={closeDrawer}
					class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
					aria-label="Close drawer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<div class="flex flex-col sm:flex-row">
					<!-- Listing image -->
					<div class="mb-4 sm:mr-4 sm:mb-0 sm:w-1/3">
						<img
							src="mock-images/item.jpeg"
							alt={selectedListing.title}
							class="h-48 w-full rounded-lg object-cover"
						/>
					</div>

					<!-- Listing details -->
					<div class="sm:w-2/3">
						<h2 class="mb-2 text-xl font-bold">{selectedListing.title}</h2>

						<div class="mb-3 flex items-center">
							<span class="text-lg font-bold text-green-600">${selectedListing.price}</span>
						</div>

						<p class="mb-3 text-gray-600">{selectedListing.description}</p>
						<p class="mb-4 text-sm text-gray-500">
							<svg
								class="mr-1 inline-block h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
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
							{selectedListing.address}
						</p>

						<!-- Action buttons -->
						<div class="flex space-x-3">
							<button
								on:click={() => goToDetailsPage(selectedListing.id)}
								class="focus:ring-opacity-50 flex-1 rounded-lg bg-green-600 py-3 font-medium text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
							>
								Details Bekijken
							</button>
							<button
								class="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 transition-colors hover:bg-gray-200 focus:outline-none"
								aria-label="Save listing"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6 text-gray-700"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
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
		</div>
	{/if}
</div>
