import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

/*
  Image component for diplaying image. This also handles blur effect while loading images.
*/
export default function Image({ image, containerWidth, overlay = true, size }) {

  let [loading, setLoading] = useState(true);
  const history = useHistory();

  // Calculate image height to avoid flicker while loading images
  let getImageHeight = (containerWidth) => {
    return image.webformatHeight * (containerWidth / image.webformatWidth);
  }

  return (
    <figure
      style={{ height: getImageHeight(containerWidth) }}
      onClick={() => history.push('/image/' + image.id)}
      className="single-image-container">
        {/* Dummy blurred image for better experience */}
        <img alt={image.tags} style={loading ? {} : { opacity: 0 }} src={image.previewURL} className="blurred-image" />
        {/* Actual image will be display after loading is completed */}
        <img
          style={loading ? { opacity: 0 } : {}}
          onLoad={() => setLoading(false)}
          className="single-photo"
          src={size ? image[size] : image.webformatURL}
          alt={image.tags}
        />

        { overlay && <div className="overlay"></div>}
        
    </figure>
  )
}
