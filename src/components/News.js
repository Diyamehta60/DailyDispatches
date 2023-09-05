import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'

export class News extends Component {
    static defaultProps={
        country:"in",
        pageSize:8,
        category:'general'

    }
    static propType={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page:1
        }
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=e8aee70f01384948b49819f8ecfaf543&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true}); 
        let data=await fetch(url)
    let parseData=await data.json();
    this.setState({articles:parseData.articles,totalResults:parseData.totalResults, loading:false})
    }

    handleNextClick=async()=>{
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults / 10))){
            let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=e8aee70f01384948b49819f8ecfaf543&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});    
            let data=await fetch(url)
                let parseData=await data.json();
                this.setState({
                    page:this.state.page + 1,
                    articles:parseData.articles,
                    loading:false
                    
                })   
    }
    }
    handlepreClick=async()=>{
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=e8aee70f01384948b49819f8ecfaf543&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true}); 
        let data=await fetch(url)
        let parseData=await data.json();
        this.setState({
            page:this.state.page - 1,
            articles:parseData.articles,
            loading:false
        })

    }

    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center' style={{margin:'40px 0px;'}}>DailyDispatches-top  headlines</h2>
                {this.state.loading && <Spinner/>}
                <div className='row'>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title? element.title.slice(0,48):""} description={element.description? element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div  className='container d-flex justify-content-between'>
                <button type="button" disabled={this.state.page<=1} onClick={this.handlepreClick}  class="btn btn-dark mx-2">&larr;previous</button>
                <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults / 10)} onClick={this.handleNextClick} class="btn btn-dark mx-2">next &rarr;</button>

                </div>
            </div>
        )
    }
}


export default News
