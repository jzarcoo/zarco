export default function ArchitectureSVG() {
	return (
		<svg
			viewBox="0 0 200 150"
			className="h-full w-full"
			role="img"
			aria-label="Isometric diagram of servers connecting to clients and a cloud"
		>
			<polygon
				points="100,120 180,80 100,40 20,80"
				fill="#e2e8f0"
				stroke="#94a3b8"
				strokeWidth="1"
			/>
			<g transform="translate(90, 50)">
				<rect x="0" y="10" width="15" height="30" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.5" />
				<polygon points="0,10 7.5,6 15,10 7.5,14" fill="#f1f5f9" stroke="#64748b" strokeWidth="0.5" />
				<polygon points="15,10 15,40 7.5,44 7.5,14" fill="#94a3b8" stroke="#64748b" strokeWidth="0.5" />
			</g>
			<g transform="translate(110, 60)">
				<rect x="0" y="10" width="15" height="30" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.5" />
				<polygon points="0,10 7.5,6 15,10 7.5,14" fill="#f1f5f9" stroke="#64748b" strokeWidth="0.5" />
				<polygon points="15,10 15,40 7.5,44 7.5,14" fill="#94a3b8" stroke="#64748b" strokeWidth="0.5" />
			</g>
			<g transform="translate(80, 65)">
				<rect x="0" y="10" width="15" height="30" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.5" />
				<polygon points="0,10 7.5,6 15,10 7.5,14" fill="#f1f5f9" stroke="#64748b" strokeWidth="0.5" />
				<polygon points="15,10 15,40 7.5,44 7.5,14" fill="#94a3b8" stroke="#64748b" strokeWidth="0.5" />
			</g>
			<path
				d="M 150 40 Q 150 30 160 30 Q 170 30 170 40 Q 180 40 180 50 Q 180 60 165 60 L 155 60 Q 140 60 140 50 Q 140 40 150 40 Z"
				fill="#bae6fd"
				stroke="#38bdf8"
				strokeWidth="1"
			/>
			<path d="M 100 80 L 150 50" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" fill="none" />
			<path d="M 100 80 L 50 60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" fill="none" />
			<path d="M 100 80 L 50 100" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" fill="none" />
			<rect x="40" y="55" width="10" height="8" fill="#fff" stroke="#64748b" strokeWidth="0.5" />
			<rect x="40" y="95" width="10" height="8" fill="#fff" stroke="#64748b" strokeWidth="0.5" />
			<circle cx="140" cy="85" r="4" fill="#fff" stroke="#64748b" strokeWidth="0.5" />
		</svg>
	);
}
