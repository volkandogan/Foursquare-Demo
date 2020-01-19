import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class FoursquareMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            subdata: [],
            detail: '',
            adress: '',
            city: '',
            state: '',
            country: ''
        };
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        fetch("http://localhost:8000/api/getcategories")
            .then(res => res.json())
            .then(
                (result) => {

                    result['response']['categories'].map((datas2, index2) =>
                        this.setState({
                            data: [...this.state.data, datas2['name']]
                        })
                    )
                },
                (error) => {
                    console.log(error)
                }

            )
    }
    handleCheck(datasa) {
        this.setState({
            subdata: []
        })
        fetch("http://localhost:8000/api/getcategories")
            .then(res => res.json())
            .then(
                (result) => {

                    result['response']['categories'].map((datas2, index2) => {

                        if (datas2['name'] === datasa) {
                            datas2['categories'].map((datas3, index2) =>
                                this.setState({
                                    subdata: [...this.state.subdata, datas3['name']]
                                })

                            )
                        }
                    }
                    )
                },
                (error) => {
                    console.log(error)
                }

            )
    }
    handleGetDetail(category) {
        this.setState({
            detail: []
        })
        fetch("http://localhost:8000/api/explore/" + category)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result['response']['groups'][0]['items'][0]['venue']['location'])
                    this.setState({
                        detail: result['response']['groups'][0]['items'][0]['venue']['name'],
                        address: result['response']['groups'][0]['items'][0]['venue']['location']['address'],
                        city: result['response']['groups'][0]['items'][0]['venue']['location']['city'],
                        state: result['response']['groups'][0]['items'][0]['venue']['location']['state'],
                        country: result['response']['groups'][0]['items'][0]['venue']['location']['country'],

                    })
                },
                (error) => {
                    console.log(error)
                }

            )
    }
    getCat() {
        return (
            <div>
                <div className='ml-5'>Categories</div>
                <ul className="list-group">
                    {this.state.data.map((datas, index) =>
                        <li className="list-group-item" onClick={() => this.handleCheck(datas)} key={index}>{datas}</li>
                    )}
                </ul>
            </div>
        )
    }
    getsubCat() {
        return (
            <div>
                <div className='ml-5'>Sub Categories</div>
                <ul className="list-group">
                    {this.state.subdata.map((datas, index) =>
                        <li className="list-group-item" onClick={() => this.handleGetDetail(datas)} key={index}>{datas}</li>
                    )}
                </ul>
            </div>
        )
    }
    getDetail() {
        return (
            <div>
                <div className='ml-5'>Recommended Places</div>
                <div className='mr-5'>
                    <div>{this.state.detail}</div>
                    <div>{this.state.address}</div>
                    <div>{this.state.city}</div>
                    <div>{this.state.country}</div>
                </div>
            </div >
        )
    }
    render() {
        return (
            <div>
                <div className="row ml-5">
                    <div className="col-3">
                        {this.getCat()}
                    </div>
                    <div className="col-2">
                        {this.getsubCat()}
                    </div>
                    <div className="col-7">
                        {this.getDetail()}
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('FoursquareMain')) {
    ReactDOM.render(<FoursquareMain />, document.getElementById('FoursquareMain'));
}
