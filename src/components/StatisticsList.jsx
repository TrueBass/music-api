import {
	IconCoins,
	IconMusic,
	IconTrophy,
	IconPlaylist,
	IconHeartSpark,
	IconTrendingUp
} from '@tabler/icons-react';

export default function StatisticsList({socialCreds, stats}) {
	const labelsList = [
		{label: "Social Credits", icon: IconCoins, value: socialCreds, subtitle: "10 credits per upload", color: "yellow"},
		{label: "Total Songs", icon: IconMusic, value: stats.totalSongs, subtitle: "", color: "blue"},
		{label: "Playlists Created", icon: IconPlaylist, value: stats.totalPlaylists, subtitle: "", color: "green"},
		{label: "Total Likes Received", icon: IconHeartSpark, value: stats.totalLikes, subtitle: "", color: "red"},
		{label: "Average Likes Per Song", icon: IconTrendingUp, value: stats.avgLikesPerSong, subtitle: "", color: "indigo"},
	];

	const colorMap = {
		yellow: {text: "#ffd600", icon: "#ffd600"},
		blue: { text: '#2563eb', icon: '#3b82f6' },
		red: { text: '#dc2626', icon: '#ef4444' },
		green: { text: '#16a34a', icon: '#22c55e' },
		indigo: { text: '#4f46e5', icon: '#6366f1' },
		orange: {text: "#ff9100", icon: "#ffab40"}
	};

	const StatCard = ({ icon: Icon, label, value, subtitle="", color = "blue" }) => {
		const { text, icon } = colorMap[color] || colorMap.blue;
    	return (
			<div style={{
					backgroundColor: 'white',
					borderRadius: '0.5rem',
					padding: '1rem',
					border: '1px solid #e5e7eb',
					boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
					transition: 'box-shadow 0.2s ease',
				}}
				onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
				onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'}>
				<div  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div>
						<p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#4b5563' }}>{label}</p>
						<p style={{ fontSize: '1.5rem', fontWeight: 700, color: text }}>{value}</p>
						{subtitle && <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>{subtitle}</p>}
					</div>
					<Icon size={24} color={icon} />
				</div>
			</div>
		);
	};

	return (
		<>
			{labelsList.map((item, i)=> <StatCard key={i} icon={item.icon} label={item.label} value={item.value} subtitle={item.subtitle} color={item.color}/>)}
			<StatCard icon={IconTrophy} label="Largest Playlist" value={stats.playlistSummary?.title} subtitle={`${stats.playlistSummary?.songsCount} songs so far`} color="orange"/>
		</>
	);
}