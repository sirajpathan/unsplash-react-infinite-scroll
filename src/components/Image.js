import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

export default function Image({ image, containerWidth, overlay = true, size }) {

  let [loading, setLoading] = useState(true);
  const history = useHistory();

  let clickHandler = image => {
    history.push('/image/' + image.id);
  }
  let handlerShowImage = () => {
    setLoading(false);
  }

  let getImageHeight = (containerWidth) => {
    return image.webformatHeight * (containerWidth / image.webformatWidth);
  }

  return (
    <figure style={{ height: getImageHeight(containerWidth) }} onClick={() => clickHandler(image)} className="single-image-container">
      <img alt={image.tags} style={loading ? {} : { opacity: 0 }} src={image.previewURL} className="blurred-image" />
      <img
        style={loading ? { opacity: 0 } : {}}
        onLoad={handlerShowImage}
        className="single-photo"
        src={size ? image[size] : image.webformatURL}
        alt={image.tags}
      />
      { overlay && <div className="overlay"></div>}
    </figure>
  )
}
