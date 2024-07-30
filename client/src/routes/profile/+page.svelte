<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import api from '../../lib/api';
	import type { User } from '../../models/user';
	import moment from 'moment';

	let user: User;

	onMount(async () => {
		await getProfile();
	});

	const getProfile = async () => {
		try {
			const response = await api.get('/users/profile');
			if (response.data.telegramID) {
				user = response.data;
			} else {
				goto('/login');
			}
		} catch (error) {
			goto('/login');
		}
	};
</script>

{#if user}
	<div class=" h-full flex flex-col justify-center items-center gap-3">
		<h1>Profile</h1>
		<p>Telegram ID: {user.telegramID}</p>
		<p>Name: {user.name}</p>
		<p>Created At: {moment(user.createdAt).format('DD.MM.YYYY')}</p>
		<button
			type="button"
			class="btn variant-filled-surface p-3"
			on:click={() => {
				goto('/');
			}}>Go to messages</button
		>
	</div>
{/if}
