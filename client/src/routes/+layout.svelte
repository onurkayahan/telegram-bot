<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.postcss';
	import { AppShell, AppBar, initializeStores, Modal } from '@skeletonlabs/skeleton';
	import { getLocalStorage, removeLocalStorage } from '../utils';
	import { userStore } from '../stores';
	import type { User } from '../models/user';
	import { goto } from '$app/navigation';

	initializeStores();

	let user: User | null;
	let hasMounted = false;

	onMount(async () => {
		user = getLocalStorage('user');

		if (user) {
			userStore.set(user);
			goto('/profile');
		}

		hasMounted = true;

		userStore.subscribe((storedUser) => {
			user = storedUser;
		});
	});
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<Modal />
			<svelte:fragment slot="lead">
				<a class="flex justify-center items-center" href="/">
					<img width="40" height="40" src="/chatbot.svg" alt="" style="filter: invert(1)" />
					<strong class="text-xl ml-2">Chatbot</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if user}
					<a class="bg-initial" href="/profile"> Profile </a>
					<button
						class="bg-initial"
						on:click={() => {
							removeLocalStorage('user');
							userStore.set(null);
							goto('/login');
						}}
					>
						Logout
					</button>
				{:else}
					<a class="bg-initial" href="/signup"> Sign Up </a>
					<a class="bg-initial" href="/login"> Login </a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	{#if hasMounted}
		<slot />
	{/if}
</AppShell>
