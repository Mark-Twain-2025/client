'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import CardModal from "@/components/ui/CardModal";

export default function SignupClient() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showCongrats, setShowCongrats] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch('/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: "include",
				body: JSON.stringify({ name, email, password }),
			});

			if (res.ok) {
				setShowCongrats(true);
			} else {
				const err = await res.json();
				alert(`회원가입 실패: ${err.message || err.error || JSON.stringify(err)}`);
			}
		} catch (error) {
			console.error('Signup error:', error);
			alert('회원가입 중 오류 발생');
		}
	};

	return (
		<>
			<div className="login-bg">
				<div className="login-card">
					<h1 className="login-title">Sign up for LunchCoin</h1>
					<p className="login-subtitle">Create your account to get started.</p>
					<form onSubmit={handleSubmit} className="login-form">
						<div className="login-input-group">
							<FaUser className="login-input-icon" />
							<input
								type="text"
								placeholder="Name"
								value={name}
								onChange={e => setName(e.target.value)}
								required
								className="login-input"
							/>
						</div>
						<div className="login-input-group">
							<FaEnvelope className="login-input-icon" />
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
								className="login-input"
							/>
						</div>
						<div className="login-input-group">
							<FaLock className="login-input-icon" />
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
								className="login-input"
							/>
							<span
								className="login-eye"
								onClick={() => setShowPassword(v => !v)}
								style={{ cursor: 'pointer' }}
							>
								<svg width="22" height="22" fill="#888" viewBox="0 0 24 24">
									<path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm0-8c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z"/>
								</svg>
							</span>
						</div>
						<button type="submit" className="login-btn">Sign Up</button>
					</form>
					<div className="login-bottom">
						Already have an account? <a className="login-link" href="/login">Login</a>
					</div>
				</div>
			</div>
			<CardModal
				open={showCongrats}
				onClose={() => setShowCongrats(false)}
				imageSrc="/coin_no_bg.png"
				imageAlt="coin"
				title="🎉 Welcome 🎉"
				message={
					<>
						가입을 축하드립니다!<br />
						<b>1000 런치 코인</b>이 지급되었습니다!
					</>
				}
				buttonText="로그인 하러 가기"
				onButtonClick={() => router.push("/login")}
			/>
			<style jsx>{`
				.login-bg {
					min-height: 100vh;
					background: #f6f8fb;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.login-card {
					background: #fff;
					border-radius: 14px;
					box-shadow: 0 4px 24px rgba(0,0,0,0.08);
					padding: 2.5rem 2.2rem 2.2rem 2.2rem;
					max-width: 500px;
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				.login-title {
					font-size: 2rem;
					font-weight: 700;
					color: #22223b;
					margin-bottom: 0.7rem;
					text-align: center;
				}
				.login-subtitle {
					color: #6c6f80;
					font-size: 1rem;
					margin-bottom: 2.1rem;
					text-align: center;
				}
				.login-form {
					width: 100%;
					display: flex;
					flex-direction: column;
					gap: 1.1rem;
				}
				.login-input-group {
					display: flex;
					align-items: center;
					background: #f6f8fb;
					border-radius: 8px;
					padding: 0.7rem 1rem;
					border: 1.5px solid #e3e6f0;
					position: relative;
				}
				.login-input-icon {
					color: #6c6f80;
					font-size: 1.1rem;
					margin-right: 0.7rem;
				}
				.login-input {
					border: none;
					background: transparent;
					outline: none;
					font-size: 1.08rem;
					flex: 1;
					padding-left: 0.5rem;
				}
				.login-eye {
					position: absolute;
					right: 1rem;
					top: 50%;
					transform: translateY(-50%);
				}
				.login-btn {
					width: 100%;
					background: #FFA500;
					color: #fff;
					font-size: 1.13rem;
					font-weight: 600;
					border: none;
					border-radius: 8px;
					padding: 0.9rem 0;
					margin-top: 0.2rem;
					margin-bottom: 0.7rem;
					cursor: pointer;
					transition: background 0.18s;
				}
				.login-btn:hover {
					background: #e69400;
				}
				.login-bottom {
					color: #6c6f80;
					font-size: 1.01rem;
					text-align: center;
				}
				.login-link {
					color: #FFA500;
					text-decoration: none;
					font-weight: 500;
					font-size: 0.98rem;
				}
				.login-link:hover {
					text-decoration: underline;
				}
			`}</style>
		</>
	);
}
