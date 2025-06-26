'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
	isLogIn: boolean | undefined;
	setIsLogIn: (v: boolean) => void;
	userName: string | null;
	setUserName: (name: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLogIn, setIsLogIn] = useState<boolean | undefined>(undefined);
	const [userName, setUserName] = useState<string | null>(null);

	useEffect(() => {
		const token = document.cookie.includes('authToken');
		setIsLogIn(token);
		setUserName(localStorage.getItem('userName'));
	}, []);

	return (
		<AuthContext.Provider value={{ isLogIn, setIsLogIn, userName, setUserName }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
};
