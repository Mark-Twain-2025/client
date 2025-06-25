'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
	isLogIn: boolean;
	setIsLogIn: (v: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLogIn, setIsLogIn] = useState(false);

	useEffect(() => {
		const token = document.cookie.includes('authToken');
		setIsLogIn(token);
	}, []);

	return (
		<AuthContext.Provider value={{ isLogIn, setIsLogIn }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
};
