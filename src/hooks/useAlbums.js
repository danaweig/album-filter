import {useEffect, useState} from 'react';
import axios from 'axios';

function useAlbums(userID) {
    let [albums , setAlbums] = useState([]);
    let [loading , setLoading] = useState(true);
    let [error , setError] = useState(false);

    useEffect(()=>{
        axios({
            method: 'GET',
            url: `https://jsonplaceholder.typicode.com/albums/`,
            params: { userId: userID },
        }).then(res=>{
            setAlbums(res.data);
            setLoading(false);
        }).catch(e => {
            setError(true);
        })
    },[userID])
    return {albums, loading, error };
}

export default useAlbums;