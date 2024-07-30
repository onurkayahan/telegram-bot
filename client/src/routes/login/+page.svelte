<script lang="ts">
	import { goto } from '$app/navigation';
	import api from '../../lib/api';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import CustomTextAreaModal from '../../components/CustomTextAreaModal.svelte';
	import { userStore } from '../../stores';
	import { setLocalStorage } from '../../utils';

	const modalStore = getModalStore();

	let telegramID: string = '';
	let password: string = '';

	const login = async () => {
		if (telegramID && password) {
			showGetTokenModal();
		}
	};

	const showGetTokenModal = () => {
		const modal: ModalSettings = {
			type: 'component',
			component: {
				ref: CustomTextAreaModal,
				props: {
					title: 'Enter Token',
					body: 'Provide the token you got while signing up.',
					onResponse: (value: string) => handleLogin(value)
				}
			}
		};

		modalStore.trigger(modal);
	};

	const handleLogin = async (token: string) => {
		const response = await api.post(
			'/auth/login',
			{ telegramID, password, token },
			{ withCredentials: true }
		);

		if (response.status === 201) {
			userStore.set(response.data);
			setLocalStorage('user', JSON.stringify(response.data));

			goto('/profile');
		}
	};
</script>

<main>
	<main>
		<div class="previewer-viewport p-4 md:p-10 space-y-4">
			<div
				class="previewer-preview flex justify-center items-center mx-auto transition-[width] duration-200 w-full"
			>
				<div class="card p-4 w-full text-token space-y-4">
					<div class="flex justify-center items-center">
						<h1>Login</h1>
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
						><span>Password</span>
						<input
							class="input"
							type="password"
							placeholder="password"
							bind:value={password}
						/></label
					>
					<div class="container h-full mx-auto flex justify-center items-center gap-3">
						<button type="button" class="btn variant-filled-surface" on:click={login}>Login</button>
					</div>
				</div>
			</div>
		</div>
	</main>
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
		background-color: #0056b3;
	}
</style>
