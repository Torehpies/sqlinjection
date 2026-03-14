import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NicknamePrompt from '../components/NicknamePrompt.jsx';

function GuestLanding() {
	const navigate = useNavigate();
	const [commentInput, setCommentInput] = useState("");
	const [comments, setComments] = useState([]);
	const [nextGuestId, setNextGuestId] = useState(() => {
		const storedId = localStorage.getItem('guest_id');
		return storedId ? parseInt(storedId) : 2026000;
	});
	const [nickname, setNickname] = useState(() => {
		return localStorage.getItem('nickname') || '';
	});
	const [showNickPrompt, setShowNickPrompt] = useState(!localStorage.getItem('nickname'));
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleLogout = () => {
		localStorage.removeItem('nickname');
		navigate("/");
	};

	const handleSetNickname = (nick) => {
		setNickname(nick);
		setShowNickPrompt(false);
		localStorage.setItem('nickname', nick);
		if (!localStorage.getItem('guest_id')) {
			localStorage.setItem('guest_id', nextGuestId);
		}
	};

	// Fetch comments on mount
	useEffect(() => {
		fetch(`${import.meta.env.VITE_BACKEND_URL}/comments`)
			.then(res => res.json())
			.then(data => {
				if (data.success) setComments(data.comments);
			})
			.catch(() => setError("Could not load comments"));
	}, []);

	const handleAddComment = async (e) => {
		e.preventDefault();
		const trimmed = commentInput.trim();
		if (!trimmed) return;
		setLoading(true);

		const comment = {
			guest_id: String(nextGuestId),
			nickname,
			message: trimmed,
		};
		localStorage.setItem('nickname', nickname);
		localStorage.setItem('guest_id', nextGuestId);
		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/comments`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(comment),
			});
			const data = await res.json();
			if (data.success) {
				setComments(prev => [data.comment, ...prev]);
				setNextGuestId(prev => prev + 1);
				setCommentInput("");
			} else {
				setError(data.error || "Failed to post comment");
			}
		} catch {
			setError("Network error posting comment");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-900 p-8 text-white">
			{showNickPrompt && <NicknamePrompt onSet={handleSetNickname} />}

			<header className="mb-8 flex items-center justify-between">
				<h1 className="text-4xl font-bold">Guest Area</h1>
				<button
					onClick={handleLogout}
					className="rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
				>
					Back to Login
				</button>
			</header>

			<div className="mx-auto w-full max-w-2xl rounded-2xl bg-gray-800 p-6 ring-1 ring-gray-700">
				<form onSubmit={handleAddComment} className="mb-6 space-y-3">
					<label className="block text-sm font-medium text-gray-300">
						Write a comment
					</label>
					<input
						type="text"
						value={commentInput}
						onChange={e => {
							if (e.target.value.length <= 300) setCommentInput(e.target.value);
						}}
						placeholder="Type your comment..."
						maxLength={300}
						className="w-full rounded-lg border-2 border-gray-600 bg-gray-900 p-3 text-white transition-colors focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/20"
					/>
					<div className="text-xs text-gray-400 mb-1 text-right">
						{commentInput.length}/300
					</div>
					<button
						type="submit"
						disabled={loading || !commentInput.trim()}
						className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
					>
						{loading ? 'Posting...' : 'Post Comment'}
					</button>
					{error && <div className="text-red-400 mt-2">{error}</div>}
				</form>

				<div>
					<h2 className="mb-3 text-xl font-semibold">Comments</h2>
					{comments.length === 0 ? (
						<p className="text-gray-400">No comments yet.</p>
					) : (
						<ul className="space-y-3">
							{comments.map((comment, index) => (
								<li
									key={comment.id || `${comment.guest_id || comment.username}-${index}`}
									className="rounded-lg bg-gray-900 p-3 ring-1 ring-gray-700 text-left"
								>
									<p className="mb-1 text-sm font-semibold text-red-400">
										{comment.nickname ? `@${comment.nickname}` : `User ${comment.guest_id || comment.username}`}
										<span className="text-xs ml-3 text-gray-400">
											{comment.created_at ? new Date(comment.created_at).toLocaleString() : ''}
										</span>
									</p>
									<p
										className="text-white"
										dangerouslySetInnerHTML={{ __html: comment.message }}
									/>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}

export default GuestLanding;
