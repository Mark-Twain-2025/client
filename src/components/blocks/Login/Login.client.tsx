'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/Auth';
import { FaUser, FaLock } from 'react-icons/fa';
import CardModal from "@/components/ui/CardModal";

export default function LoginClientPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);
	// const { isLogIn, setIsLogIn, setUserName } = useAuth();
	const { isLogIn, setIsLogIn, user, setUser } = useAuth();
	
	// 오늘 날짜가 마지막 로그인 날짜와 다른지 확인하는 함수
	const isFirstLoginToday = () => {
		const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD 형식
		const lastLoginDate = localStorage.getItem('lastLoginDate');
		console.log('Debug - Today:', today, 'Last login:', lastLoginDate, 'Is first login:', lastLoginDate !== today);
		return lastLoginDate !== today;
	};

	// 오늘 날짜를 마지막 로그인 날짜로 저장하는 함수
	const setTodayAsLoginDate = () => {
		const today = new Date().toISOString().slice(0, 10);
		localStorage.setItem('lastLoginDate', today);
		console.log('Debug - Set today as login date:', today);
	};

	useEffect(() => {
		if (isLogIn === true && !showLoginModal) {
			router.replace('/');
		}
	}, [isLogIn, showLoginModal, router]);

	if (isLogIn === undefined) {
		return <div style={{textAlign:'center',marginTop:'4rem'}}>Loading...</div>;
	}

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ email, password }),
			});

			
			

			if (res.ok) {
				const data = await res.json();
				setIsLogIn(true);
				
				console.log(data);

				if (data.user && data.user.name) {
					const userInfoRes=  await fetch(`/api/user_info/${data.user.user_id}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
						credentials: 'include',
					});
					const userInfo = await userInfoRes.json();
					console.log(userInfo);

					const updatedUser = { ...data.user, coin: userInfo.coins };
					localStorage.setItem('user', JSON.stringify(updatedUser));
					setUser(updatedUser);

					// // user 객체를 JSON 문자열로 저장
					// localStorage.setItem('user', JSON.stringify(data.user));
					// // setUser에 전체 user 객체 전달
					// setUser(data.user);
				}
				
				if (isFirstLoginToday()) {
					setShowLoginModal(true);
				} else {
					router.push('/');
				}
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
		<>
			<div className="login-bg">
				<div className="login-card">
					<h1 className="login-title">Login to LunchCoin</h1>
					<p className="login-subtitle">Use your credentials to access your account.</p>
					<form onSubmit={handleLogin} className="login-form">
						<div className="login-input-group">
							<FaUser className="login-input-icon" />
							<input
								type="email"
								placeholder="Enter email"
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
						<button type="submit" className="login-btn">Login</button>
					</form>
					<div className="login-bottom">
						Not registered? <a className="login-link" href="/signup">Create account</a>
					</div>
				</div>
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
					.login-row {
						display: flex;
						align-items: center;
						width: 100%;
					}
					.login-row-between {
						justify-content: space-between;
						margin-bottom: 0.2rem;
					}
					.login-remember {
						display: flex;
						align-items: center;
						font-size: 0.98rem;
						color: #6c6f80;
						gap: 0.4rem;
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
					.login-or {
						color: #6c6f80;
						font-size: 0.98rem;
						margin: 0.7rem 0 0.5rem 0;
						text-align: center;
					}
					.login-socials {
						display: flex;
						gap: 0.7rem;
						margin-bottom: 1.1rem;
						justify-content: center;
					}
					.login-social-btn {
						width: 40px;
						height: 40px;
						border-radius: 50%;
						border: none;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 1.25rem;
						background: #f6f8fb;
						color: #2563eb;
						cursor: pointer;
						transition: background 0.18s, color 0.18s;
					}
					.login-social-btn.twitter {
						color: #1da1f2;
					}
					.login-social-btn.facebook {
						color: #1877f3;
					}
					.login-social-btn.google {
						color: #ea4335;
					}
					.login-social-btn:hover {
						background: #e3e6f0;
					}
					.login-bottom {
						color: #6c6f80;
						font-size: 1.01rem;
						text-align: center;
					}
				`}</style>
			</div>
			<CardModal
				open={showLoginModal}
				onClose={() => {
					setShowLoginModal(false);
					setTodayAsLoginDate();
					router.push("/");
				}}
				imageSrc="/coin_no_bg.png"
				imageAlt="coin"
				title="🎉 출석 완료 🎉"
				message={
					<>
						<b>10 런치 코인</b>이 지급되었습니다!<br />
						내 지갑을 확인해보세요!
					</>
				}
				buttonText="홈으로 가기"
				onButtonClick={() => router.push("/")}
			/>
		</>
	);
}
