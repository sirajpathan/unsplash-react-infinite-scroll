import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import Image from './Image';
import useResizeEvent from '../hooks/windowResize';
import Loader from './Loader';


function ImageDetails({ match: { params } }) {

    const [image, setImage] = useState({ tags: '' });
    const [loading, setLoading] = useState(true);
    const [containerWidth, setContainerWidth] = useState(0);
    let imageContainer = useRef();
    useResizeEvent(() => {
        setContainerWidth(imageContainer.current.offsetWidth);
    });

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + '?key=' + process.env.REACT_APP_API_KEY + '&id=' + params.id;
        axios
            .get(url)
            .then(res => {
                setContainerWidth(imageContainer.current.offsetWidth);
                setImage(res.data.hits[0]);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div className="image-details">
                <Loader loading={loading}/>
                <div className="full-image" ref={imageContainer}>
                    {
                        !loading &&
                        <Image image={image} containerWidth={containerWidth} overlay={false} size="fullHDURL" />
                    }
                </div>
                <table className="image-detail-table">
                    <tbody>
                        <tr>
                            <td>User:</td>
                            <td>{image.user}</td>
                        </tr>
                        <tr>
                            <td>Downloads:</td>
                            <td>{image.downloads}</td>
                        </tr>
                        <tr>
                            <td>Size:</td>
                            <td>{image.imageWidth}x{image.imageHeight}</td>
                        </tr>
                        <tr>
                            <td>Tags:</td>
                            <td>
                                <ul className="tags">
                                    {
                                        image.tags.split(',').map(tag => <li key={tag}><a href="javascript:void(0)">{tag.trim()}</a></li>)
                                    }
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default (withRouter(ImageDetails));