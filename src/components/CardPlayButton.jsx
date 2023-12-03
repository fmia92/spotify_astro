import { usePlayerStore } from '@store/playerStore'
import { Pause, Play } from "./Player"

export function CardPlayButton({ id, size = 'small' }) {
    const { currentMusic, setCurrentMusic, isPlaying, setIsPlaying } = usePlayerStore(state => state)
    console.log({ currentMusic })
    
    const isPlayingThisSong = isPlaying && currentMusic?.playlist.id === id

    const handleClick = () => {
        if (isPlayingThisSong) {
            setIsPlaying(false)
            return
        }
        
        fetch(`/api/getInfoPlaylist.json?id=${id}`)
            .then(res => res.json())
            .then(data => {
                const { songs, playlist } = data
                setCurrentMusic({ songs, playlist, song: songs[0] })
                setIsPlaying(true)
            })
    }

    const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'

    return (
        <button className="card-play-button rounded-full bg-green-600 p-4
        hover:scale-105 transition hover:bg-green-400"
            onClick={handleClick}>
            {
                isPlayingThisSong ? <Pause className={iconClassName} /> : <Play className={iconClassName} />
            }
        </button>
    )
}