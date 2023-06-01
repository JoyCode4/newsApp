import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import NewsImage from  "../assets/images/News.jpg";



export class News extends Component {

  static defaultProps = {
    country:"in",
    pageSize:9,
    category:"general"
  }

  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
    document.title = `NewsApp - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1d4c908b79e040ae8a0ca6bed20815dd&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    const res = await fetch(url);
    let data = await res.json();
    console.log(data.articles);
    this.setState({articles:data.articles, totalResults:data.totalResults,loading:false});
    
  }

  handlePreviousClick= async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1d4c908b79e040ae8a0ca6bed20815dd&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    const res = await fetch(url);
    let data = await res.json();

    this.setState({
      page : this.state.page-1,
      articles:data.articles,
      loading:false
    });
  }

  handleNextClick= async()=>{
    if(this.state.page<=Math.ceil(this.state.totalResults/this.props.pageSize)){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1d4c908b79e040ae8a0ca6bed20815dd&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      const res = await fetch(url);
      let data = await res.json();
      
      this.setState({
        page : this.state.page+1,
        articles:data.articles,
        loading:false
      });
    }

  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <div className="container my-5">
        <h1 className="text-center">{`NewsApp - ${this.capitalizeFirstLetter(this.props.category)} | Top Headlines`}</h1>
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
          <button disabled={this.state.page>=Math.ceil(this.state.totalResults/this.state.pageSize)} type="button" className="btn btn-dark m-3" onClick={this.handleNextClick}>Next &rarr; </button>
        </div>
      </div>
    );
  }
}

export default News;
