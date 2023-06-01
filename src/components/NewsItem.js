import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,rm,author,date,source} = this.props;
    return (
        <div className="my-3">
            <div className="card">
            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"95%",zIndex:"1"}}>{source}</span>
                <img height={"200px"} src={imageUrl} className="card-img-top" alt="news"/>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">By {author}</small></p>
                    <p className="card-text"><small className="text-body-secondary">Published at {date}</small></p>
                    <a rel='noreferrer' href={rm} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
  }
}

export default NewsItem