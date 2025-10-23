<script lang="ts">
	import listData from '$lib/assets/listData.json' with { type: 'json' };
	import List from '$lib/components/list.svelte';
</script>

<h1>Filterable list</h1>
<p>
	Nam pulvinar nisi a turpis sodales, id cursus purus malesuada. Mauris vestibulum mollis sapien, at
	ultrices arcu mollis quis. Nulla tempor nunc sed molestie suscipit. Aliquam egestas mollis sapien
	nec volutpat. Praesent vitae magna ut purus tristique posuere. Suspendisse eget lacus id nunc
	egestas aliquam. Sed urna urna, tristique in condimentum ac, molestie ac orci. Aenean lorem diam,
	condimentum nec nunc sed, maximus vulputate ante.
</p>
<p>
	Aenean gravida elementum ex in placerat. Donec sit amet libero volutpat, lacinia leo eget,
	suscipit augue. Nunc magna metus, iaculis et lacus at, faucibus convallis lorem. Aenean risus
	urna, pellentesque at nulla sit amet, vehicula euismod odio. Mauris feugiat dictum ipsum nec
	facilisis. Nulla sed rhoncus lectus. Praesent turpis nulla, iaculis nec purus sed, accumsan
	sollicitudin diam. Proin auctor diam et tortor rhoncus feugiat. Suspendisse non orci quis dolor
	finibus ullamcorper. Nam nisi nisi, venenatis vel fermentum sed, malesuada ut nulla. Nunc blandit
	commodo volutpat. Sed eu lobortis velit, venenatis sagittis diam.
</p>
<p>
	Proin a nisi sed erat tempus varius sed eu elit. Interdum et malesuada fames ac ante ipsum primis
	in faucibus. Maecenas ornare lobortis sagittis. Integer ac est mi. Nullam consequat iaculis massa
	et dignissim. Nunc fermentum imperdiet nisi. In hac habitasse platea dictumst. Ut ultrices luctus
	felis, et elementum nisl. Suspendisse lacinia finibus tortor, porta ultricies lectus condimentum
	ut. Quisque semper ex enim, ut tincidunt nunc eleifend nec. Duis vitae viverra massa.
</p>
<List {listData} sticky={true} />
<p>
	Aliquam eget nulla at ipsum elementum mattis quis ac felis. Fusce imperdiet quam et dui vulputate,
	sit amet hendrerit lorem feugiat. Donec convallis bibendum ex. Proin lacinia tortor eu aliquet
	vulputate. Nam euismod ultrices erat, eget euismod risus tempus sed. Curabitur eu ipsum
	sollicitudin, elementum mauris luctus, hendrerit nunc. Mauris porttitor mi augue, id auctor arcu
	condimentum nec. Aenean finibus, leo at accumsan sollicitudin, velit est facilisis quam, et
	sagittis ligula nisi at mi.
</p>

<style>
</style>
