import React from "react";
import './PhotoModal.scss';

const PhotoModal = ({photo, isOpened,handleModalCloseF, album}) => {
  return (    
    <div className={`PhotoModal ${ isOpened ? 'opened' : ''}`} onClick={()=>handleModalCloseF(photo)}>
      <div className="PhotoModalInner" onClick={(e)=>e.stopPropagation()}>
          <div className="PhotoModalHeader">
              <h3>{photo.title}</h3>
          </div>
          <div className="PhotoModalMain">
              <div className="PhotoCont">
                <img src={photo.url} alt={photo.title} />
              </div>
              <div className="PhotoDetails">
                <p>Album: {album}</p>
                <p>Id: {photo.id}</p>
              </div>
          </div>
          <button onClick={()=>handleModalCloseF(photo)}>X</button>
      </div>
    </div>
  );
  
}
export default PhotoModal;