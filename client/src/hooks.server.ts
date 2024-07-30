// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('auth');
	if (token) {
		try {
			const user = jwt.verify(token, 'your_secret_key') as App.Locals['user'];
			event.locals.user = user;
		} catch (err) {
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	const protectedRoutes = ['/profile'];

	if (protectedRoutes.includes(event.url.pathname) && !event.locals.user) {
		return Response.redirect('/login');
	}

	return resolve(event);
};
