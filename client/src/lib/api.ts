import axios from 'axios';
import { userStore } from '../stores';

const instance = axios.create({
	baseURL: 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json'
	}
});

userStore.subscribe((user) => {
	if (user) {
		instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
	} else {
		delete instance.defaults.headers.common['Authorization'];
	}
});

export default instance;
