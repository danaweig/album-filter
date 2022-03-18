import {useEffect, useState} from 'react';
import axios from 'axios';

function usePagedPhotos(albumId,pageNumber) {
    let [photos , setPhotos] = useState([]);
    let [loading , setLoading] = useState(true);
    let [error , setError] = useState(false);

    useEffect(()=>{
        if (albumId) {
            axios({
                method: 'GET',
                url: `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`,
                params: { _page: pageNumber, _limit : 15 },
            }).then(res=>{
                if (pageNumber===1) {
                    setPhotos(res.data);
                } else {
                    setPhotos(prevPhotos => [...prevPhotos, ...res.data]);
                }
                setLoading(false);
            }).catch(e => {
                setError(true);
            })
        }
    },[albumId, pageNumber])
    return {photos, loading, error };
}

export default usePagedPhotos;