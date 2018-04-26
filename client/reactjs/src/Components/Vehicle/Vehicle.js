/**
 * Created by darav on 7/18/2017.
 */
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './react-bootstrap-table-all.min.css';
import './bootstrap.css'
import axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';
import mapImg from './map.png';
import analyticsImg from './analytics.png';
import './Vehicle.css';


Table.propTypes = {
// Pass in a Component to override default element
    tag: PropTypes.string,
    size: PropTypes.string,
    bordered: PropTypes.bool,
    striped: PropTypes.bool,
    inverse: PropTypes.bool,
    hover: PropTypes.bool,
    reflow: PropTypes.bool,
    responsive: PropTypes.bool
};

class Vehicle extends Component {
    constructor () {
        super();
        this.state = {vehicles: [],alerts:[],incre: 0,};
    }
    getInitialState() {
        return {
            vehicles: [],
            alerts:[]
        }
    }
    componentDidMount(){
        let self=this;
        const vehicleUrl = "http://localhost:8080/api/vehicles";
        axios.get(vehicleUrl)
            .then(function (response) {
                //console.log(response.data);
                self.setState({
                    vehicles: response.data
                });

            })
            .catch(function (error) {
                console.log(error);
            });
        const alertUrl = "http://localhost:8080/api/alerts";
        axios.get(alertUrl)
            .then(function (response) {
                self.successFn(response);
                //console.log(self.state.alerts);
                self.calculate();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    successFn(response) {
        var vehicles=[];
        var res=[];

        for(var v in response.data){
            vehicles.push(response.data[v].vin);
        }
        for(var v1 in vehicles){
            var count=0;
            for(var v2 in vehicles) {
                if (vehicles[v1] === vehicles[v2]) {
                    count++;
                }
            }
            var element={};
            element.vin=vehicles[v1];
            element.highAlerts=count;
            res.push(element);
        }
        this.setState({
            alerts:res
        });
    }
    calculate() {
        let vehicles=this.state.vehicles;
        let alerts=this.state.alerts;
        for(var vehicle in vehicles){
            var flag=0;
            for(var alert in alerts){
                if(vehicles[vehicle].vin===alerts[alert].vin){
                    flag=1;
                    /*this.setState({
                        vehicles[vehicle].highAlerts:this.state.alerts[alert].highAlerts
                    });*/
                    vehicles[vehicle].highAlerts=alerts[alert].highAlerts;
                }
            }
            if(!flag){
                vehicles[vehicle].highAlerts=0;
            }
        }
        this.setState({
            vehicles:vehicles
        });
        //console.log(this.state.vehicles);
    }
    activeFormatter(cell,row){
        return '<a></a>';
}
    render() {
        return (
                <div className="Vehicle">
                    <div><h3>Vehicle Details</h3></div>
                        <Table bordered responsive hover >
                            <thead>
                                <tr>
                                    <th >Vin</th>
                                    <th>Vehicle Location in Last 30 minutes</th>
                                    <th>Analytics</th>
                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Year</th>
                                    <th>Red Line Rpm</th>
                                    <th>Max fuel Volumn</th>
                                    <th>Last Service Date</th>
                                    <th onClick={() =>
                                    {
                                        console.log("Clicked");
                                        this.setState({incre: this.state.incre + 1})
                                    }}>High Alerts Last 2 Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.vehicles.sort((a,b)=>{
                                    if (this.state.incre % 2)
                                        return parseInt(a.highAlerts, 10) - parseInt(b.highAlerts, 10);
                                    else
                                        return parseInt(b.highAlerts, 10) - parseInt(a.highAlerts, 10);
                                    })
                                    .map((vehicle, i) =>
                                    <tr key={i}>
                                        <td><a href={"/alerts/"+vehicle.vin}> {vehicle.vin}</a></td>
                                        <td>
                                            <a href={"/map/"+vehicle.vin}><img src={mapImg}/></a>
                                        </td>
                                        <td>
                                            <a href={"/analytics/"+vehicle.vin}><img src={analyticsImg}/></a>
                                        </td>
                                        <td>{vehicle.make}</td>
                                        <td>{vehicle.model}</td>
                                        <td>{vehicle.year}</td>
                                        <td>{vehicle.redlineRpm}</td>
                                        <td>{vehicle.maxFuelVolume}</td>
                                        <td>{moment(vehicle.lastServiceDate).format('YYYY-MM-DD HH:mm:ss')}</td>
                                        <td>{vehicle.highAlerts}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                </div>

        );
    }
}
export default Vehicle;
