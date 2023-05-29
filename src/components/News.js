import React,{Component} from "react";
import NewsItem from "./NewsItem";

class News extends Component{
    render(){
        return(
            <div className="container text-center">
                <h1 className='my-5'>NewsApp - Top Headlines</h1>
                    <div className="row my-4">
                        <div className="col-md-4">
                            <NewsItem title={"Cricket"} description={"lorm10"} imageUrl={"https://onecms-res.cloudinary.com/image/upload/s--OTUSeGpX--/fl_relative,g_south_east,l_one-cms:core:watermark:reuters,w_0.1/f_auto,q_auto/c_fill,g_auto,h_676,w_1200/v1/one-cms/core/2023-05-29t075825z_1_lynxmpej4s05l_rtroptp_3_nvidia-taiwan.jpg?itok=ltcdUb8V"}/>
                        </div>
                        <div className="col-md-4">
                            <NewsItem title={"Police"} description={"lorm100"} imageUrl={"https://images.moneycontrol.com/static-mcnews/2023/05/artificial-intelligence-rep-770x433.jpg"}/>
                        </div>
                        <div className="col-md-4">
                            <NewsItem title={"Sport"} description={"lorm9000"} imageUrl={"https://cdn.vox-cdn.com/thumbor/tLt-ZkmZ-KNeTKXNtri0LUVIy7c=/0x0:2040x1360/1200x628/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/24157082/quest2upclose.jpg"}/>
                        </div>
                    </div>
            </div>
        )
    }
}

export default News;