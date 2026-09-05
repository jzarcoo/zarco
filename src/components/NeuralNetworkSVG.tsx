export default function NeuralNetworkSVG() {
	return (
		<svg
			viewBox="0 0 400 200"
			className="h-full w-full opacity-80"
			preserveAspectRatio="xMidYMid meet"
			role="img"
			aria-label="Diagram of a neural network feeding into heatmap tiles"
		>
			<g stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.5">
				<line x1="50" y1="50" x2="120" y2="30" />
				<line x1="50" y1="50" x2="120" y2="70" />
				<line x1="50" y1="50" x2="120" y2="110" />
				<line x1="50" y1="50" x2="120" y2="150" />
				<line x1="50" y1="100" x2="120" y2="30" />
				<line x1="50" y1="100" x2="120" y2="70" />
				<line x1="50" y1="100" x2="120" y2="110" />
				<line x1="50" y1="100" x2="120" y2="150" />
				<line x1="50" y1="150" x2="120" y2="30" />
				<line x1="50" y1="150" x2="120" y2="70" />
				<line x1="50" y1="150" x2="120" y2="110" />
				<line x1="50" y1="150" x2="120" y2="150" />
				<line x1="120" y1="30" x2="190" y2="50" />
				<line x1="120" y1="70" x2="190" y2="50" />
				<line x1="120" y1="110" x2="190" y2="50" />
				<line x1="120" y1="150" x2="190" y2="50" />
				<line x1="120" y1="30" x2="190" y2="100" />
				<line x1="120" y1="70" x2="190" y2="100" />
				<line x1="120" y1="110" x2="190" y2="100" />
				<line x1="120" y1="150" x2="190" y2="100" />
				<line x1="120" y1="30" x2="190" y2="150" />
				<line x1="120" y1="70" x2="190" y2="150" />
				<line x1="120" y1="110" x2="190" y2="150" />
				<line x1="120" y1="150" x2="190" y2="150" />
				<line x1="190" y1="50" x2="260" y2="50" />
				<line x1="190" y1="100" x2="260" y2="100" />
				<line x1="190" y1="150" x2="260" y2="150" />
			</g>
			<g fill="#93c5fd" stroke="#fff" strokeWidth="1">
				<circle cx="50" cy="50" r="6" />
				<circle cx="50" cy="100" r="6" />
				<circle cx="50" cy="150" r="6" />
				<circle cx="120" cy="30" r="6" />
				<circle cx="120" cy="70" r="6" />
				<circle cx="120" cy="110" r="6" />
				<circle cx="120" cy="150" r="6" />
				<circle cx="190" cy="50" r="6" />
				<circle cx="190" cy="100" r="6" />
				<circle cx="190" cy="150" r="6" />
			</g>
			<g>
				<rect x="250" y="20" width="40" height="40" fill="url(#nn-heat1)" stroke="#ef4444" strokeWidth="2" />
				<rect x="310" y="20" width="40" height="40" fill="url(#nn-heat2)" />
				<rect x="250" y="80" width="40" height="40" fill="url(#nn-heat3)" />
				<rect x="310" y="80" width="40" height="40" fill="url(#nn-heat1)" />
				<rect x="250" y="140" width="40" height="40" fill="url(#nn-heat2)" stroke="#ef4444" strokeWidth="2" />
				<rect x="310" y="140" width="40" height="40" fill="url(#nn-heat3)" />
			</g>
			<defs>
				<radialGradient id="nn-heat1" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stopColor="#ef4444" />
					<stop offset="50%" stopColor="#eab308" />
					<stop offset="100%" stopColor="#3b82f6" />
				</radialGradient>
				<radialGradient id="nn-heat2" cx="30%" cy="70%" r="50%">
					<stop offset="0%" stopColor="#eab308" />
					<stop offset="70%" stopColor="#3b82f6" />
					<stop offset="100%" stopColor="#1e3a8a" />
				</radialGradient>
				<radialGradient id="nn-heat3" cx="70%" cy="30%" r="50%">
					<stop offset="0%" stopColor="#ef4444" />
					<stop offset="100%" stopColor="#1e3a8a" />
				</radialGradient>
			</defs>
		</svg>
	);
}
