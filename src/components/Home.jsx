import React, { Component } from 'react'
import axios from 'axios'
import Image from './Image'
import InfiniteScroll from 'react-infinite-scroll-component';
import {splitArray} from '../utils';

export class Home extends Component {
  constructor () {
    super()

    this.state = {
      images: [],
      count: 1,
      currentImage: 0,
      columnCount: 1,
      url: process.env.REACT_APP_API_URL + '?key=' + process.env.REACT_APP_API_KEY
    }

    this.fetchImages = this.fetchImages.bind(this);
    this.imageContainer = React.createRef();
  }

  componentDidMount () {
    this.resizeScreen();
    window.addEventListener("resize", this.resizeScreen);
    const { count } = this.state;

    // Getting first set of images
    axios
      .get(`${this.state.url}&image_type?all&page=1&per_page=20&page=1`)
      .then(res => this.setState({ images: res.data.hits, count: 1 + count }))
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.resizeScreen);
  }

  /*
    Set column count by dividing main container width by minimum column width
  */
  resizeScreen = () => {
    let width = this.imageContainer.current.offsetWidth;
    const count = Math.floor(width / 310);
    this.setState({columnCount: Math.max(count, 1)});
  }

  fetchImages () {
    const { images, count } = this.state;
    
    axios
      .get(`${this.state.url}&image_type?all&page=1&per_page=20&page=${count}`)
      .then(res => this.setState({ images: images.concat(res.data.hits), count: count + 1 }))
  }

  getContainerWidth (i) {
    return (this.imageContainer.current.offsetWidth - ((this.state.columnCount - 1) * 24)) / this.state.columnCount;
  }

  render () {
    const { images } = this.state;
    
    //Distribute image array data between column to get uneven placing of images
    var data = splitArray(images, this.state.columnCount);

    return (
      <div className="images">
        <InfiniteScroll
          dataLength={images.length}
          next={this.fetchImages}
          hasMore={true}
          loader={<h4>Loading...</h4>}>
          <div className="image-container" ref={this.imageContainer} style={{'--columns': this.state.columnCount}}>
            {
              data.map((col, i) => {
                return <div key={i} className="image-container-column">{col.map(image => <Image containerWidth={this.getContainerWidth(i)} key={image.id} image={image} />)}</div>
              })
            }
          </div>
        </InfiniteScroll>
      </div>
    )
  }


}

export default Home
