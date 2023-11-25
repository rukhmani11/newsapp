// class base componenet and function based component
import React, { Component } from 'react'
import { NavBar } from './components/NavBar'
import News from './components/News'
import NewsItem from './components/NewsItem'



export default class App extends  Component{
  render(){
  return (
    <div>
      <NavBar/>
      {/* //<NewsItem/> */}
      {/* <NewsItem/> */}
      <News propSize={5} country="in"/>


    </div>
  )

}}
