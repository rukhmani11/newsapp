import React from "react";
import NewsItem from "./NewsItem";
import { Component } from "react";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'



export class News extends Component {

  //   articles =
  // [
  //     {
  //     "source": {
  //     "id": null,
  //     "name": "Gizmodo.com"
  //     },
  //     "author": "Gordon Jackson and James Whitbrook",
  //     "title": "Could Billy Dee Williams Play a Part In the Lando Show?",
  //     "description": "Chris McQuarrie is already moving on to his next collaboration with Tom Cruise. Star Trek: Strange New Worlds’ musical episode reveals its song titles. Plus, Seth Rogen talks about his connection to the Teenage Mutant Ninja Turtles, and new set pictures from …",
  //     "url": "https://gizmodo.com/star-wars-lando-tv-show-disney-plus-billy-dee-williams-1850691795",
  //     "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/7368a569cb4c4cd96ca311ab7cdf19cd.png",
  //     "publishedAt": "2023-08-01T14:15:00Z",
  //     "content": "Chris McQuarrie is already moving on to his next collaboration with Tom Cruise. Star Trek: Strange New Worlds musical episode reveals its song titles. Plus, Seth Rogen talks about his connection to t… [+3629 chars]"
  //     },
  //     {
  //     "source": {
  //     "id": null,
  //     "name": "Android Central"
  //     },
  //     "author": "ted@byteddyk.com (Ted Kritsonis)",
  //     "title": "Beats Studio Buds Plus review: An overture to Android users",
  //     "description": "The Beats Studio Buds Plus give a lot of attention to Android users, placing more of an emphasis on audio and comfort to make things convenient.",
  //     "url": "https://www.androidcentral.com/accessories/audio/beats-studio-buds-plus-review",
  //     "urlToImage": "https://cdn.mos.cms.futurecdn.net/fKRdsnF7tdRqcKVFXHG37D-1200-80.jpg",
  //     "publishedAt": "2023-08-01T15:30:44Z",
  //     "content": "Beats continues to improve at making earbuds that also contribute to changing the brand's perception and reputation. The headphones have a longer lineage, but it's the earbuds that make things more i… [+8403 chars]"
  //     },
  //     {
  //     "source": {
  //     "id": null,
  //     "name": "Android Central"
  //     },
  //     "author": "ted@byteddyk.com (Ted Kritsonis)",
  //     "title": "Beats Studio Buds+ vs. Google Pixel Buds Pro: Which should you buy?",
  //     "description": "The Beats Studio Buds+ and Google Pixel Buds Pro both cater to Android users in effective ways, so it comes down to some key differences between them.",
  //     "url": "https://www.androidcentral.com/accessories/audibeats-studio-buds-plus-vs-google-pixel-buds-pro",
  //     "urlToImage": "https://cdn.mos.cms.futurecdn.net/8VTyDkyenSqcyqgphgy9E4-1200-80.jpg",
  //     "publishedAt": "2023-08-01T11:58:38Z",
  //     "content": "Hand it to Beats — it's extending more than an olive branch to Android users, and the Studio Buds+ is a good example with the features on offer. That's what makes the comparison with Google's Pixel B… [+5499 chars]"
  //     },

  //        ]

  
  constructor() {

    super();
    console.log("Hello I am a constractor from news component");
    this.state = {
      //articles: this.articles,
      articles: [],
      loading: false,
      page: 1,
    };
  }

  //life cycle method componentDidMount
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=e9b6659f86504d60af1ca9cfd8343fea&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  handlePrevClick = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=e9b6659f86504d60af1ca9cfd8343fea&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  }

  handleNextClick = async () => {
    console.log("Next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=e9b6659f86504d60af1ca9cfd8343fea&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">News Headling</h2>
        {this.state.loading &&<Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 50) : ""}
                  description={
                    element.description ? element.description.slice(0, 80) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="Container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
export default News;
