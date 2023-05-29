import React,{Component} from "react";
import NewsItem from "./NewsItem";

class News extends Component{
    render(){
        return(
            <div>
                News Component
                <NewsItem/>
            </div>
        )
    }
}

export default News;