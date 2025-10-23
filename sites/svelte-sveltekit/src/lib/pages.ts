import type { Pathname } from '$app/types';

export const pages = new Map<Pathname, string>([
	['/static-1', 'Static 1'],
	['/static-2', 'Static 2'],
	['/live', 'Live'],
	['/tooltips', 'Tooltips'],
	['/faq', 'FAQ'],
	['/list', 'List']
]);
