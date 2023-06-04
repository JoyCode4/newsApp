import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import NewsImage from "../assets/images/NewsImage.jpg";
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
  const [articles,setArticles]=useState([])
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(true)
  const [totalResults,setTotalResults]=useState(0)
  // document.title = `NewsApp - ${capitalizeFirstLetter(props.category)}`;
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews= async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.API_KEY}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let res = await fetch(url);
    props.setProgress(40);
    let data = await res.json();
    props.setProgress(70);

    setArticles(data.articles);
    setTotalResults(data.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(()=>{
    updateNews();
  },[])
  // handlePreviousClick= async ()=>{
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.API_KEY}&page=${this.state.page-1}&pageSize=${props.pageSize}`;
  //   let data = await this.fetchingData(url);
  //   this.setState({
  //     page : this.state.page-1,
  //     articles:data.articles,
  //     loading:false
  //   });
  // }

  // handleNextClick= async()=>{
  //   if(this.state.page<=Math.ceil(this.state.totalResults/props.pageSize)){
  //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.API_KEY}&page=${this.state.page+1}&pageSize=${props.pageSize}`;
  //     let data = await this.fetchingData(url);
  //     console.log(data);
  //     this.setState({
  //       page : this.state.page+1,
  //       articles:data.articles,
  //       loading:false
  //     });
  //   }

  // }

  

  const fetchMoreData = async () =>{
    setPage(page+1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.API_KEY}&page=${page+1}&pageSize=${props.pageSize}`;
    let res=await fetch(url);
    let data = await res.json();
    setArticles(articles.concat(data.articles));
    setTotalResults(data.totalResults);
  }
    return (
      <>
        <h1 className="text-center">{`NewsApp - ${capitalizeFirstLetter(props.category)} |  Top Headlines`}</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row my-4">
              {articles.map((article) => {
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
          <button disabled={this.state.page>=Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark m-3" onClick={this.handleNextClick}>Next &rarr; </button>
        </div> */}
      </>
    );
}

News.defaultProps = {
  country:"in",
  pageSize:9,
  category:"general",
}

News.propTypes = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}

export default News;
