<script>
	let listings = [
		{
			id: 1,
			title: 'Gerecupereerde Houten Balken',
			description: 'Set van eiken balken van sloop van een gebouw uit de jaren 1920',
			price: 500,
			location: 'Berlijn',
			image: 'https://placehold.co/600x400',
			category: 'Hout'
		},
		{
			id: 2,
			title: 'Vintage Bakstenen',
			description: '300 rode kleibakstenen in goede staat',
			price: 250,
			location: 'Hamburg',
			image: 'https://placehold.co/600x400',
			category: 'Metselwerk'
		},
		{
			id: 3,
			title: 'Vintage Bakstenen',
			description: '300 rode kleibakstenen in goede staat',
			price: 250,
			location: 'Hamburg',
			image: 'https://placehold.co/600x400',
			category: 'Metselwerk'
		},
		{
			id: 4,
			title: 'Vintage Bakstenen',
			description: '300 rode kleibakstenen in goede staat',
			price: 250,
			location: 'Hamburg',
			image: 'https://placehold.co/600x400',
			category: 'Metselwerk'
		},
		{
			id: 5,
			title: 'Vintage Bakstenen',
			description: '300 rode kleibakstenen in goede staat',
			price: 250,
			location: 'Hamburg',
			image: 'https://placehold.co/600x400',
			category: 'Metselwerk'
		}
		// Voeg meer mock data toe indien nodig
	];
</script>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">Beschikbare Zoekertjes</h1>
		<a
			href="/listing/create"
			class="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
		>
			Maak Zoekertje
		</a>
	</div>

	<!-- Filters -->
	<div class="mb-6">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<input
				type="text"
				placeholder="Zoek zoekertjes..."
				class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
			/>
			<select
				class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
			>
				<option value="">Alle Categorieën</option>
				<option value="wood">Hout</option>
				<option value="masonry">Metselwerk</option>
				<option value="metal">Metaal</option>
				<option value="fixtures">Armaturen</option>
			</select>
			<select
				class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
			>
				<option value="">Sorteer Op</option>
				<option value="price-asc">Prijs: Laag naar Hoog</option>
				<option value="price-desc">Prijs: Hoog naar Laag</option>
				<option value="date">Datum Toegevoegd</option>
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
							Bekijk Details
						</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
