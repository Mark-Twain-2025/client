'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface AuthContextType {
	isLogIn: boolean | undefined;
	setIsLogIn: (v: boolean) => void;
	// userName: string | null;
	// setUserName: (name: string | null) => void;
	user: any;
	setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLogIn, setIsLogIn] = useState<boolean | undefined>(undefined);
	// const [userName, setUserName] = useState<string | null>(null);
	const [user, setUser] = useState<any>(null);



	useEffect(() => {
		const token = document.cookie.includes('authToken');
		setIsLogIn(token);
		// setUserName(localStorage.getItem('userName'));
		
		// localStorage에서 user 정보를 가져와서 안전하게 처리
		const userFromStorage = localStorage.getItem('user');
		if (userFromStorage) {
			try {
				// 먼저 JSON 파싱을 시도
				const parsedUser = JSON.parse(userFromStorage);

				setUser(parsedUser);
				setIsLogIn(true);
			} catch (error) {
				// JSON 파싱이 실패하면 문자열 그대로 사용하거나 기본값 설정
				console.warn('User data is not valid JSON, using default values');
				setUser({
					name: userFromStorage !== "[object Object]" ? userFromStorage : "User Name",
					coin: 0
				});
			}
		}
	}, []);

	return (
		// <AuthContext.Provider value={{ isLogIn, setIsLogIn, userName, setUserName }}>
		<AuthContext.Provider value={{ isLogIn, setIsLogIn, user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
};
