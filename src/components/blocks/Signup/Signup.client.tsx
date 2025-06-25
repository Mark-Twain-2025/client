'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupClient() {
    const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch('http://localhost:3001/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
                credentials: "include",
				body: JSON.stringify({ name, email, password }),
			});

			if (res.ok) {
				alert('회원가입 성공!');
				router.push('/login');
			} else {
				const err = await res.json();
				// alert(`회원가입 실패: ${err.message}`);
                alert(`회원가입 실패: ${err.message || err.error || JSON.stringify(err)}`);
			}
		} catch (error) {
			console.error('Signup error:', error);
			alert('회원가입 중 오류 발생');
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 px-4">
			<h1 className="text-3xl font-bold mb-6 text-center">회원가입</h1>
			<form
				onSubmit={handleSubmit}
				className="space-y-4 border p-6 rounded shadow"
			>
                <div>
					<label className="block mb-1 font-semibold">이름</label>
					<input
						type="text"
						className="w-full px-4 py-2 border rounded"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div>
					<label className="block mb-1 font-semibold">이메일</label>
					<input
						type="email"
						className="w-full px-4 py-2 border rounded"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label className="block mb-1 font-semibold">비밀번호</label>
					<input
						type="password"
						className="w-full px-4 py-2 border rounded"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
				>
					회원가입
				</button>
			</form>
		</div>
	);
}
