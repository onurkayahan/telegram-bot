<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	export let title: string;
	export let body: string;
	export let token: string;
	export let onResponse: (value: string) => void;

	let value = token ?? '';
	const dispatch = createEventDispatcher();

	const handleSubmit = () => {
		dispatch('response', value);
		onResponse(value);
		modalStore.close();
	};

	const handleClose = () => {
		modalStore.close();
	};
</script>

<div class="modal-overlay">
	<div class="modal-content">
		<h2>{title}</h2>
		<p>{body}</p>
		<textarea bind:value rows="5" class="modal-textarea"></textarea>
		<div class="modal-buttons">
			<button on:click={handleSubmit}>Ok</button>
			<button on:click={handleClose}>Close</button>
		</div>
	</div>
</div>

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal-content {
		background-color: rgb(var(--color-surface-800));
		border-radius: 4px;
		padding: 16px;
		max-width: 400px;
		width: 100%;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.modal-buttons {
		display: flex;
		justify-content: flex-end;
		margin-top: 8px;
	}

	.modal-buttons button {
		margin-left: 8px;
		padding: 8px 12px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		background: #007bff;
		color: white;
	}

	.modal-buttons button:last-of-type {
		background: #6c757d;
	}

	.modal-textarea {
		width: 100%;
		margin-top: 8px;
		padding: 8px;
		border-radius: 4px;
		background: transparent;
	}

	.modal-buttons button:hover {
		opacity: 0.9;
	}
</style>
