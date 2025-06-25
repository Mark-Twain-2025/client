'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/Auth';

export default function LoginClientPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { isLogIn, setIsLogIn } = useAuth();

	useEffect(() => {
		if (isLogIn) {
			router.replace('/');
		}
	}, [isLogIn]);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await fetch('http://localhost:3001/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ email, password }),
			});

			if (res.ok) {
				alert('로그인 성공!');
				setIsLogIn(true);
				router.push('/');
			} else {
				const err = await res.json();
				alert(`로그인 실패: ${err.message}`);
			}
		} catch (error) {
			console.error('Login error:', error);
			alert('로그인 중 오류 발생');
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 px-4">
			<h1 className="text-3xl font-bold mb-6 text-center">로그인</h1>
			<form
				onSubmit={handleLogin}
				className="space-y-4 border p-6 rounded shadow"
			>
				<div>
					<label className="block mb-1 font-semibold">아이디</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-4 py-2 border rounded"
						required
					/>
				</div>
				<div>
					<label className="block mb-1 font-semibold">비밀번호</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-2 border rounded"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
				>
					로그인
				</button>
			</form>
		</div>
	);
}
