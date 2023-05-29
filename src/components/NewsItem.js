import React, { Component } from 'react'

export class NewsItem extends Component {
    constructor(){
        super();
    }
  render() {
    let {title,description,imageUrl,rm} = this.props;
    return (
        <div className="my-3">
            <div className="card" style={{width: "18rem"}}>
                <img height={"200px"} src={imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <a href={rm} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
        </div>
    )
  }
}

export default NewsItem