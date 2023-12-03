import { usePlayerStore } from '@store/playerStore'

export const Pause = ({ className }) => (
    <svg className={className} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
)
  
export const Play = ({ className }) => (
    <svg className={className} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>
)

export function CardPlayButton({ id }) {
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


    return (
        <button className="card-play-button rounded-full bg-green-600 p-4"
            onClick={handleClick}>
            {
                isPlayingThisSong 
                    ? <Pause/>
                    : <Play />
            }
        </button>
    )
}