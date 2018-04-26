/**
 * Created by darav on 7/21/2017.
 */
/**
 * Created by darav on 7/21/2017.
 */
import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend} from 'recharts';
import moment from 'moment';
import axios from 'axios';
import './Analytic.css';


class Analytic extends Component{

    constructor () {
        super();
        this.state = {
            data: [

            ]
        };
    }
    getInitialState() {
        return {
            data:[]
        }
    }
    componentDidMount(){
        let self=this;
        let vin=this.props.match.params.vin;
        let filter = "last1day";
        let data=[] ;
        const readingUrl = 'http://localhost:8080/api/readings/'+ vin +'?filter='+filter;
        axios.get(readingUrl)
            .then(function (response) {
                console.log(response.data);
                response.data.map((coordinate, i) => {
                        const formattedDate = moment(coordinate.timestamp).format('YYYY-MM-DD HH:mm:ss');
                        data.push({timestamp:formattedDate,
                            engineRpm:coordinate.engineRpm,
                            speed:coordinate.speed,
                            engineHp:coordinate.engineHp,
                            fuelVolume:coordinate.fuelVolume});
                    }
                )
                self.setState({
                    data:data
                });
                console.log(self.state.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    render(){

    return (
        <div className="graph">

            <div><h3>Vehicle Analytics</h3></div>


            <ResponsiveContainer>
            <LineChart width={600} height={300} data={this.state.data}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="timestamp"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="engineRpm" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
            <ResponsiveContainer>
                <LineChart width={600} height={300} data={this.state.data}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="timestamp"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="speed" stroke="#82ca9d" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="engineHp" stroke="#ff0000" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="fuelVolume" stroke="#000000" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
    }
}
export default Analytic;