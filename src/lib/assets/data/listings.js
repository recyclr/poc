const listings = [
	{
		id: 1,
		title: 'Reclaimed Oak Beams',
		category: 'Wood',
		price: 1200,
		description: '10 solid oak beams from 19th century warehouse, excellent condition',
		imageUrl: '/api/placeholder/400/300',
		address: 'Markt 1, 8000 Brugge, Belgium',
		distance: '0.5 km',
		specifications: {
			Condition: 'Excellent',
			Material: 'Oak',
			Quantity: '10 pieces',
			Dimensions: '4m x 20cm x 20cm'
		},
		// Add these properties that are used in the template
		posted: '2024-03-04',
		views: 245,
		images: [
			'mock-images/item.jpeg',
			'mock-images/item.jpeg',
			'mock-images/item.jpeg',
			'mock-images/item.jpeg'
		],
		seller: {
			name: 'John Doe',
			rating: 4.8,
			listings: 12,
			joined: 'Jan 2023'
		},
		geometry: { type: 'Point', coordinates: [3.2247, 51.2093] }
	},
	{
		id: 2,
		title: 'Vintage Brick Collection',
		category: 'Masonry',
		price: 850,
		description: '400 red clay bricks from demolished factory building',
		imageUrl: '/api/placeholder/400/300',
		address: 'Grote Markt 1, 8500 Kortrijk, Belgium',
		distance: '4.1 km',
		specifications: {
			Condition: 'Excellent',
			Material: 'Oak',
			Quantity: '10 pieces',
			Dimensions: '4m x 20cm x 20cm'
		},
		// Add these properties that are used in the template
		posted: '2024-03-04',
		views: 245,
		images: [
			'mock-images/item.jpeg',
			'mock-images/item.jpeg',
			'mock-images/item.jpeg',
			'mock-images/item.jpeg'
		],
		seller: {
			name: 'John Doe',
			rating: 4.8,
			listings: 12,
			joined: 'Jan 2023'
		},
		geometry: { type: 'Point', coordinates: [3.2667, 50.8264] }
	},
	{
		id: 3,
		title: 'Server Racks (x5)',
		category: 'Electronics',
		price: 2000,
		description: 'Five 42U server racks, good condition, all mounting hardware included',
		imageUrl: '/api/placeholder/400/300',
		address: 'Ooststraat 44, 8800 Roeselare, Belgium',
		distance: '6.8 km',
		specifications: {
			Condition: 'Excellent',
			Material: 'Oak',
			Quantity: '10 pieces',
			Dimensions: '4m x 20cm x 20cm'
		},
		// Add these properties that are used in the template
		posted: '2024-03-04',
		views: 245,
		images: [
			'mock-images/item.jpeg',
			'mock-images/item.jpeg',
			'mock-images/item.jpeg',
			'mock-images/item.jpeg'
		],
		seller: {
			name: 'John Doe',
			rating: 4.8,
			listings: 12,
			joined: 'Jan 2023'
		},
		geometry: { type: 'Point', coordinates: [3.1262, 50.9492] }
	},
	{
		id: 4,
		title: 'Granite Countertops',
		category: 'Stone',
		price: 1500,
		description: 'Premium black granite countertops from office renovation',
		imageUrl: '/api/placeholder/400/300',
		address: 'Eiermarkt 1, 8400 Oostende, Belgium',
		distance: '3.5 km',
		specifications: {
			Condition: 'Excellent',
			Material: 'Oak',
			Quantity: '10 pieces',
			Dimensions: '4m x 20cm x 20cm'
		},
		// Add these properties that are used in the template
		posted: '2024-03-04',
		views: 245,
		images: [
			'mock-images/item.jpeg',
			'mock-images/item.jpeg',
			'mock-images/item.jpeg',
			'mock-images/item.jpeg'
		],
		seller: {
			name: 'John Doe',
			rating: 4.8,
			listings: 12,
			joined: 'Jan 2023'
		},
		geometry: { type: 'Point', coordinates: [3.2147, 51.2093] }
	}
];

export default listings;
