import React from "react";
import './Photo.scss';

const Photo = ({data, handleModalOpenF, refLast}) => {
  return (
    <div className="Photo" ref={refLast}>
        <div className="PhotoCont" onClick={() => handleModalOpenF(data)}>
            <div className="PhotoHeader">
                <img src={data.thumbnailUrl} alt="thum" />
            </div>
            <div className="PhotoMain">
                <h3>{data.title}</h3>
                <p>Id: {data.id}</p>
            </div>
            <div className="PhotoFooter">
                <p><a href={data.url}>{data.url}</a></p>
            </div>
        </div>
    </div>
  );
}
export default Photo;