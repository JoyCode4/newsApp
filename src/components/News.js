import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import NewsImage from "../assets/images/NewsImage.jpg";


export class News extends Component {

  static defaultProps = {
    country:"in",
    pageSize:9,
    category:"general",
    API_KEY:"5fd178daa9d84d87a0f119cb25dadff8"
  }

  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
  }

  async updateState(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    const res = await fetch(url);
    let data = await res.json();
    return data;
  }

  async componentDidMount(){
    const data = await this.updateState();
    this.setState({articles:data.articles, totalResults:data.totalResults,loading:false});
    
  }

  handlePreviousClick= async ()=>{
    const data = await this.updateState();
    this.setState({
      page : this.state.page-1,
      articles:data.articles,
      loading:false
    });
  }

  handleNextClick= async()=>{
    if(this.state.page<=Math.ceil(this.state.totalResults/this.props.pageSize)){
      const data = await this.updateState();
      this.setState({
        page : this.state.page+1,
        articles:data.articles,
        loading:false
      });
    }

  }

  render() {
    return (
      <div className="container my-5">
        <h1 className="text-center">{`NewsApp - (${(this.props.category).toUpperCase()}) Top Headlines`}</h1>
        {this.state.loading && <Spinner/>}
        <div className="row my-4">
          {!this.state.loading && this.state.articles.map((article) => {
            return (
              <div className="col-md-4"  key={article.url}>
                <NewsItem
                    title={article.title?article.title.slice(0,45):""}
                    description={article.description?article.description.slice(0,88):""}
                    imageUrl={article.urlToImage?article.urlToImage:NewsImage}
                    rm={article.url}
                    date={new Date(article.publishedAt).toGMTString()}
                    author={article.author?article.author:"Unknown"}
                    source={article.source.name}
                />
              </div>
            )
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark m-3" onClick={this.handlePreviousClick}> &larr; Previous</button>
          <button disabled={this.state.page>=Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark m-3" onClick={this.handleNextClick}>Next &rarr; </button>
        </div>
      </div>
    );
  }
}

export default News;
