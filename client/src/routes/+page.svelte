<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	import { onMount } from 'svelte';
	import api from '../lib/api';
	import { userStore } from '../stores';
	import type { Message } from '../models/message';

	let messages = [{ from: 'bot', text: 'Hello! How can I assist you today?', id: uuidv4() }];
	let userMessage = '';
	let telegramID = '';

	onMount(() => {
		if (!$userStore) {
			window.location.href = '/login';
		} else {
			userStore.subscribe((user) => {
				if (user) {
					telegramID = user?.telegramID;
				}
			});
		}

		getMessages();
	});

	async function getMessages() {
		const response = await api.get('/messages');

		response.data.forEach((message: Message) => {
			messages = [...messages, { from: 'user', text: message.content, id: uuidv4() }];
			messages = [...messages, { from: 'bot', text: message.response, id: uuidv4() }];
		});
	}

	async function sendMessage() {
		if (userMessage.trim() === '') return;
		messages = [...messages, { from: 'user', text: userMessage, id: uuidv4() }];
		const response = await api.post('/messages', {
			content: userMessage
		});

		messages = [...messages, { from: 'bot', text: response.data.response, id: uuidv4() }];
		userMessage = '';
	}

	onMount(() => {
		const inputField = document.getElementById('message-input');
		inputField?.focus();
	});
</script>

<div class="h-full w-full flex flex-col justify-end">
	<div class="messages p-2">
		{#each messages as message (message.id)}
			<div class="flex {message.from === 'user' ? 'justify-end' : 'justify-start'}">
				<div
					class="bubble p-4 rounded-lg max-w-xs
                    {message.from === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}"
				>
					{message.text}
				</div>
			</div>
		{/each}
	</div>
	<div class="input-area flex space-x-2 p-2 fixed w-full">
		<input
			id="message-input"
			bind:value={userMessage}
			on:keypress={(e) => {
				if (e.key === 'Enter') sendMessage();
			}}
			class="input flex-grow p-2 border rounded-lg"
			placeholder="Type your message..."
		/>
		<button on:click={sendMessage} class="button bg-blue-500 text-white p-2 rounded-lg">Send</button
		>
	</div>
</div>

<style lang="postcss">
	.messages {
		max-width: 100%;
		overflow-y: auto;
		margin-bottom: 3.5rem;
		& > * {
			margin: 0.5rem;
		}
	}
</style>
