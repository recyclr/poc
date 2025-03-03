<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	let isMenuOpen = false;
	let isLoggedIn = false; // This would be replaced with your auth logic

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	$: currentPath = $page.url.pathname;
</script>

<div class="flex min-h-screen flex-col bg-gray-50">
	<!-- Navigation -->
	<header class="bg-white shadow-sm">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 justify-between">
				<div class="flex items-center">
					<a href="/" class="flex flex-shrink-0 items-center">
						<span class="text-2xl font-bold text-green-600">Recyclr</span>
					</a>
					<nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
						<a
							href="/"
							class="inline-flex items-center border-b-2 {currentPath === '/'
								? 'border-green-500 text-gray-900'
								: 'border-transparent text-gray-500 hover:border-green-300 hover:text-gray-700'} px-1 pt-1 text-sm font-medium"
						>
							Home
						</a>
						<a
							href="/map"
							class="inline-flex items-center border-b-2 {currentPath === '/map'
								? 'border-green-500 text-gray-900'
								: 'border-transparent text-gray-500 hover:border-green-300 hover:text-gray-700'} px-1 pt-1 text-sm font-medium"
						>
							Map
						</a>
						<a
							href="/my-listings"
							class="inline-flex items-center border-b-2 {currentPath === '/my-listings'
								? 'border-green-500 text-gray-900'
								: 'border-transparent text-gray-500 hover:border-green-300 hover:text-gray-700'} px-1 pt-1 text-sm font-medium"
						>
							My Listings
						</a>
					</nav>
				</div>
				<div class="hidden sm:ml-6 sm:flex sm:items-center">
					{#if isLoggedIn}
						<a
							href="/listings"
							class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
						>
							Your Listings
						</a>
						<a href="/profile" class="ml-3 rounded-full p-1 text-gray-400 hover:text-gray-500">
							<span class="sr-only">View profile</span>
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600"
							>
								<span class="text-sm font-medium">You</span>
							</div>
						</a>
					{:else}
						<a
							href="/login"
							class="ml-3 inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
						>
							Sign in
						</a>
						<a
							href="/register"
							class="ml-3 inline-flex items-center rounded-md border border-green-600 border-transparent bg-white px-4 py-2 text-sm font-medium text-green-600 hover:bg-gray-50"
						>
							Register
						</a>
					{/if}
				</div>
				<div class="-mr-2 flex items-center sm:hidden">
					<button
						on:click={toggleMenu}
						class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
					>
						<span class="sr-only">Open main menu</span>
						<svg
							class="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile menu -->
		{#if isMenuOpen}
			<div class="sm:hidden" transition:fade={{ duration: 100 }}>
				<div class="space-y-1 pt-2 pb-3">
					<a
						href="/"
						class="block border-l-4 border-green-500 bg-green-50 py-2 pr-4 pl-3 text-base font-medium text-green-700"
					>
						Home
					</a>
					<a
						href="/map"
						class="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-green-300 hover:bg-gray-50 hover:text-gray-700"
					>
						Map
					</a>
					<a
						href="/my-listings"
						class="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-green-300 hover:bg-gray-50 hover:text-gray-700"
					>
						My Listings
					</a>
					{#if isLoggedIn}
						<a
							href="/listings"
							class="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-green-300 hover:bg-gray-50 hover:text-gray-700"
						>
							Your Listings
						</a>
						<a
							href="/profile"
							class="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-green-300 hover:bg-gray-50 hover:text-gray-700"
						>
							Profile
						</a>
					{:else}
						<a
							href="/login"
							class="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-green-300 hover:bg-gray-50 hover:text-gray-700"
						>
							Sign in
						</a>
						<a
							href="/register"
							class="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-green-300 hover:bg-gray-50 hover:text-gray-700"
						>
							Register
						</a>
					{/if}
				</div>
			</div>
		{/if}
	</header>

	<!-- Page Content -->
	<main class="flex-grow">
		<slot />
	</main>

	<!-- Footer -->
	<footer class="bg-white">
		<div class="mx-auto max-w-7xl border-t border-gray-200 px-4 py-6 sm:px-6 lg:px-8">
			<div class="flex flex-col items-center justify-between md:flex-row">
				<div class="mb-4 md:mb-0">
					<span class="text-xl font-bold text-green-600">Recyclr</span>
					<p class="mt-1 text-sm text-gray-500">Sustainable demolition materials marketplace</p>
				</div>
				<div class="flex space-x-6">
					<a href="/terms" class="text-sm text-gray-500 hover:text-gray-700">Terms</a>
					<a href="/privacy" class="text-sm text-gray-500 hover:text-gray-700">Privacy</a>
					<a href="/contact" class="text-sm text-gray-500 hover:text-gray-700">Contact</a>
				</div>
			</div>
			<div class="mt-4 text-center text-xs text-gray-400">
				© {new Date().getFullYear()} Recyclr. All rights reserved.
			</div>
		</div>
	</footer>
</div>
