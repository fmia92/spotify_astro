import { allPlaylists, songs } from '@lib/data'

export async function GET({ params, request }) {
    const { url } = request
    // const searchParams = new URLSearchParams(url.split('?')[1])
    // const id = searchParams.get('id')

    const urlObject = new URL(url)
    const id = urlObject.searchParams.get('id')

    const playlist = allPlaylists.find(playlist => playlist.id === id)
    const playlistSongs = songs.filter(song => song.albumId === playlist?.albumId)

    return new Response(JSON.stringify({ playlist, songs: playlistSongs }), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    })
}
