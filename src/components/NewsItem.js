import { render } from "@testing-library/react";
import React from "react";
import { Component } from "react";

export class NewsItem extends Component {
  
  render() {
    let { title, description, imageUrl , newsUrl } = this.props;

    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <img className="card-img-top" src={!imageUrl?"https://image.cnbcfm.com/api/v1/image/107279469-1690833961576-black-millennial-lady-using-laptop-wearing-eyeglas-2022-12-16-08-32-41-utc.jpg?v=1690900892&w=1920&h=1080":imageUrl} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default NewsItem;
