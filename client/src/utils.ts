export function setLocalStorage(name: string, value: any) {
	if (typeof window !== 'undefined') {
		localStorage.setItem(name, value ?? '');
	}
}

export function getLocalStorage(name: string): any {
	if (typeof window !== 'undefined') {
		const data = localStorage.getItem(name);
		if (data) {
			return JSON.parse(data);
		}
		return null;
	}
}

export function removeLocalStorage(name: string): any {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(name);
	}
}
