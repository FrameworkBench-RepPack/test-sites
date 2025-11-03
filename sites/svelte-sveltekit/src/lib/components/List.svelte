<script lang="ts">
	import { listCategories } from '$lib/assets/listCategory';

	let {
		listData,
		sticky
	}: { listData: { name: string; age: number; category: number }[]; sticky: boolean } = $props();

	const sortOptions = new Map<string, string>([
		['name', 'Name'],
		['age', 'Age'],
		['category', 'Category']
	]);

	let sortOption = $state('name');

	let ageFrom = $state(0);
	let ageTo = $state(100);

	let categories: number[] = $state([...listCategories.keys()]);

	let filteredList = $derived(
		listData
			.filter(
				(candidate) =>
					candidate.age >= ageFrom &&
					candidate.age <= ageTo &&
					categories.includes(candidate.category)
			)
			.sort((a, b) => {
				switch (sortOption) {
					case 'name': {
						return a.name.localeCompare(b.name);
					}
					case 'age': {
						return a.age - b.age;
					}
					case 'category': {
						return a.category - b.category;
					}
					default: {
						throw TypeError('Unknown option');
					}
				}
			})
	);
</script>

<div id="list" class:sticky>
	<div class="controls">
		<form>
			<label>
				Sort by: <select name="sort" bind:value={sortOption}>
					{#each sortOptions.entries() as [key, name] (key)}
						<option value={key}>{name}</option>
					{/each}
				</select>
			</label>
			<fieldset>
				<legend> Age </legend>
				<label>
					From: <input
						type="number"
						name="age-from"
						bind:value={ageFrom}
						min="0"
						max="100"
						step="1"
					/>
				</label>
				<label>
					To: <input type="number" name="age-to" bind:value={ageTo} min="0" max="100" step="1" />
				</label>
			</fieldset>
			<fieldset>
				<legend> Categories </legend>
				{#each listCategories.entries() as [key, name] (key)}
					<label>
						<input type="checkbox" name="category" value={key} bind:group={categories} />
						{name}
					</label>
				{/each}
			</fieldset>
		</form>
	</div>
	<div class="data">
		<table>
			<thead>
				<tr> <th> Name </th> <th> Age </th> <th> Category </th> </tr>
			</thead>
			<tbody>
				{#each filteredList as item (item.name)}
					<tr>
						<td>{item.name}</td>
						<td>{item.age}</td>
						<td>{listCategories.get(item.category)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		{#if filteredList.length === 0}
			<p class="no-data-message">No entries matched the filter settings.</p>
		{/if}
	</div>
</div>

<style>
	#list {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1em;

		& .controls form {
			border: 0.1em solid black;
			border-radius: 0.7em;
			padding: 1em;
			accent-color: var(--color-tertiary);

			& label:has(> input[name='category']) {
				display: block;
			}
		}

		& .data {
			& table {
				width: 100%;
				text-align: center;
				border-collapse: collapse;

				& th {
					font-weight: bolder;
					background-color: var(--color-secondary);
				}

				& td,
				& th {
					border: 0.08em solid black;
					height: 3.5em;
				}
			}

			& .no-data-message {
				text-align: center;
			}
		}

		&.sticky {
			& .controls form {
				position: sticky;
				top: calc(var(--header-height) + var(--page-padding));
			}
			& .data thead th {
				top: var(--header-height);
				position: sticky;
			}
		}
	}
</style>
