import React, { useEffect,useState, useRef , useCallback } from 'react';
import Photo from '../Photo';
import PhotoModal from '../PhotoModal';
import usePagedPhotos from '../../hooks/usePagedPhotos';
import useAlbums from '../../hooks/useAlbums';
import './Album.scss';

function Album() {
    const userID = 1;
    const [selectedAlbum, setSelectedAlbum] = useState();
    const [modal, setModal] = useState({photo: {},isOpened: false});
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const {photos, loadingPhotos, errorPhotos } = usePagedPhotos(selectedAlbum, pageNumber);
    const {albums, loadingAlbums, errorAlbums } = useAlbums(userID);
    const observer = useRef(); // to store observer between our renders

    const lastPhotoElementRef = useCallback( node  => { // once the ref element is created this callback function will be attached to it
        if (loadingPhotos ) return;
        
        if (observer.current)  observer.current.disconnect(); // disconnect the previous last Elm before connecting the new last Elm
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) setPageNumber(prevPageNumber => prevPageNumber+ 1); // if the elm is on our viewport, increment page
        });
        if (node) observer.current.observe(node);
    },[loadingPhotos]);

    useEffect(()=> {
        if (albums.length) setSelectedAlbum(albums[0].id); 
    },[albums]);

    const handleAlbumSelect = (event) => {
        if (event.target.value !== 'default') {
            setSelectedAlbum( event.target.value );
            setPageNumber(1);
        }
    };
    
    const handleModalOpen = (currentPhoto) => {
        setModal({photo: currentPhoto,isOpened: true})
    };
    const handleModalClose = () => {
        setModal({...modal,isOpened: false})
    };
    
    return (
        <div className="Album">
            <div className="AlbumHeader">
                <h1>Photo Albums Page</h1>
                <div className="filters">
                    <input type="text" placeholder='Search Photo' onChange={(e)=>{setQuery(e.target.value ); }}/>
                    { ( albums.length > 0 )  && 
                        <select onChange={handleAlbumSelect}>
                            { albums.map(album => <option key={'album'+album.id} value={album.id}>{album.title}</option> )}
                        </select>
                    }
                </div>
            </div>
            <div className="AlbumMain">
                { ( photos.length > 0 ) && photos.filter(photo => {
                        if (query === '') return photo;
                        else return photo.title.toLowerCase().includes(query.toLowerCase() )
                    }).map((photo,i) => {
                        if ( i+1 === photos.length) return <Photo refLast ={lastPhotoElementRef} key={'photo'+i} data={photo} handleModalOpenF={handleModalOpen}  />
                        else return <Photo key={'photo'+i} data={photo} handleModalOpenF={handleModalOpen}  />
                    })
                }
            </div>
            <div>{ (loadingPhotos || loadingAlbums) && 'Loading...'}</div>
            <div>{ (errorPhotos || errorAlbums) && 'Error'}</div>

            <PhotoModal photo={modal.photo} album={
                (   albums.find( album => { return album.id === selectedAlbum }) ?
                    albums.find( album => { return album.id === selectedAlbum} ).title : ''
                )
            }
            isOpened={modal.isOpened} handleModalCloseF={handleModalClose} />
        </div>
    );
}

export default Album;
