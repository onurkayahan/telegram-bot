<script lang="ts">
	import { goto } from '$app/navigation';
	import api from '../../lib/api';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { userStore } from '../../stores';
	import { setLocalStorage } from '../../utils';
	import CustomTextAreaModal from '../../components/CustomTextAreaModal.svelte';

	const modalStore = getModalStore();

	let telegramID: string = '';
	let password: string = '';
	let name: string = '';

	const signup = async () => {
		try {
			const response = await api.post('/auth/register', { telegramID, name, password });
			userStore.set(response.data);

			showTokenModal(response.data.token);
		} catch (error) {
			alert('Error during sign-up');
		}
	};

	const showTokenModal = (generatedToken: string) => {
		const modal: ModalSettings = {
			type: 'component',
			component: {
				ref: CustomTextAreaModal,
				props: {
					title: 'Token',
					body: 'Please save the token somewhere safe:',
					token: generatedToken,
					onResponse: (value: string) => goto('/login')
				}
			}
		};
		modalStore.trigger(modal);
	};
</script>

<main>
	<div class="previewer-viewport p-4 md:p-10 space-y-4">
		<div
			class="previewer-preview flex justify-center items-center mx-auto transition-[width] duration-200 w-full"
		>
			<div class="card p-4 w-full text-token space-y-4">
				<div class="flex justify-center items-center">
					<h1>Sign Up</h1>
				</div>
				<label class="label"
					><span>Telegram ID</span>
					<input
						class="input"
						type="text"
						placeholder="telegram ID"
						bind:value={telegramID}
					/></label
				>
				<label class="label"
					><span>Name</span>
					<input class="input" type="text" placeholder="name" bind:value={name} /></label
				>
				<label class="label"
					><span>Password</span>
					<input
						class="input"
						type="password"
						placeholder="password"
						bind:value={password}
					/></label
				>
				<div class="container h-full mx-auto flex justify-center items-center">
					<button type="button" class="btn variant-filled-surface" on:click={signup}
						>Sign Up!</button
					>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	form {
		display: flex;
		flex-direction: column;
		width: 300px;
		gap: 10px;
	}

	label {
		display: block;
		margin-bottom: 5px;
	}

	input {
		width: 100%;
		padding: 8px;
		font-size: 16px;
	}

	button {
		padding: 10px 20px;
		background-color: #007bff;
		color: white;
		border: none;
		cursor: pointer;
		font-size: 16px;
	}

	button:hover {
		background-color: #b30027;
	}
</style>
