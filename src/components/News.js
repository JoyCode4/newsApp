import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import NewsImage from "../assets/images/NewsImage.jpg";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    country:"in",
    pageSize:9,
    category:"general",
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
      loading: true,
      page:1,
      totalResults:0
    };
    document.title = `NewsApp - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  fetchingData = async (url) =>{
    this.setState({loading:true})
    const res = await fetch(url);
    let data = await res.json();
    this.props.setProgress(40);
    return data;
  }

  async componentDidMount(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await this.fetchingData(url);
    this.props.setProgress(70);
    this.setState({articles:data.articles, totalResults:data.totalResults,loading:false});
    this.props.setProgress(100);
  }

  // handlePreviousClick= async ()=>{
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.API_KEY}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  //   let data = await this.fetchingData(url);
  //   this.setState({
  //     page : this.state.page-1,
  //     articles:data.articles,
  //     loading:false
  //   });
  // }

  // handleNextClick= async()=>{
  //   if(this.state.page<=Math.ceil(this.state.totalResults/this.props.pageSize)){
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.API_KEY}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //     let data = await this.fetchingData(url);
  //     console.log(data);
  //     this.setState({
  //       page : this.state.page+1,
  //       articles:data.articles,
  //       loading:false
  //     });
  //   }

  // }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  fetchMoreData = async () =>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.API_KEY}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    let res=await fetch(url);
    let data = await res.json();
    this.setState({
      page:this.state.page+1,
      articles:this.state.articles.concat(data.articles),
      totalResults:data.totalResults,
      loading:false
    })
  }
  render() {
    return (
      <>
        <h1 className="text-center">{`NewsApp - ${this.capitalizeFirstLetter(this.props.category)} |  Top Headlines`}</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles !== this.state.totalResults}
          loader={(this.state.articles.length !== this.state.totalResults)?<Spinner/>:console.log()}
        >
          <div className="container">
            <div className="row my-4">
              {console.log(this.state.articles.length , this.state.totalResults)}
              {!this.state.loading && this.state.articles.map((article) => {
                if(article !== null || article !== undefined){
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
                }
                return ;
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark m-3" onClick={this.handlePreviousClick}> &larr; Previous</button>
          <button disabled={this.state.page>=Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark m-3" onClick={this.handleNextClick}>Next &rarr; </button>
        </div> */}
      </>
    );
  }
}

export default News;
