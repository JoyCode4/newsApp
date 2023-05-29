import React, { Component } from "react";
import NewsItem from "./NewsItem";

class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
    };
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1d4c908b79e040ae8a0ca6bed20815dd";
    const res = await fetch(url);
    let data = await res.json();
    console.log(data.articles);
    this.setState({articles:data.articles});
    
  }
  render() {
    return (
      <div className="container text-center">
        <h1 className="my-5">NewsApp - Top Headlines</h1>
        
        <div className="row my-4">
        {this.state.articles.map((article) => {
          return (
            <div className="col-md-4"  key={article.url}>
            <NewsItem
                title={article.title?article.title.slice(0,45):""}
                description={article.description?article.description.slice(0,88):""}
                imageUrl={article.urlToImage?article.urlToImage:"https://nypost.com/wp-content/uploads/sites/2/2023/05/newspress-collage-27245877-1685245676865.jpg?quality=75&strip=all&1685231331&w=1024"}
                rm={article.url}
            />
          </div>
          )
        })}
        </div>
      </div>
    );
  }
}

export default News;
