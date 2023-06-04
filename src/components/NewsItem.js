import React, { Component } from 'react';

const NewsItem=(props)=> {
  let {title,description,imageUrl,rm,author,date,source} = props;
  return (
      <div className="my-3">
          <div className="card">
            <div className="container">
              <span className="badge rounded-pill bg-danger" style={{position:"absolute",right:0,top:"-10px",margin:"2px"}}>{source}</span>
            </div>
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

export default NewsItem