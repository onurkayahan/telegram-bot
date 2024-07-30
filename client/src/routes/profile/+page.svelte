<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import api from '../../lib/api';
	import type { User } from '../../models/user';
	import moment from 'moment';

	let currentUser: User;
	let users: User[] = [];

	onMount(async () => {
		await getProfile();
	});

	const getProfile = async () => {
		try {
			const response = await api.get('/users/profile');
			if (response.data.telegramID) {
				currentUser = response.data;
			} else {
				goto('/login');
			}
		} catch (error) {
			goto('/login');
		}
	};

	const getUsers = async () => {
		try {
			const response = await api.get('/users');
			users = response.data;
		} catch (error) {
			console.error(error);
		}
	};
</script>

{#if currentUser}
	<div class=" h-full flex flex-col justify-center items-center gap-3">
		<h1>Profile</h1>
		<p>Telegram ID: {currentUser.telegramID}</p>
		<p>Name: {currentUser.name}</p>
		<p>Created At: {moment(currentUser.createdAt).format('DD.MM.YYYY')}</p>
		<button
			type="button"
			class="btn variant-filled-surface p-3"
			on:click={() => {
				goto('/');
			}}>Go to messages</button
		>
		{#if currentUser.isAdmin}
			<button
				type="button"
				class="btn variant-filled-surface p-3"
				on:click={() => {
					getUsers();
				}}>Get all users</button
			>
			{#each users as user (user.telegramID)}
				<p>{user.name}</p>
			{/each}
		{/if}
	</div>
{/if}
