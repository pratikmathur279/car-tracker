/**
 * Created by darav on 7/21/2017.
 */
import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
Table.propTypes = {
    tag: PropTypes.string,
    size: PropTypes.string,
    bordered: PropTypes.bool,
    striped: PropTypes.bool,
    inverse: PropTypes.bool,
    hover: PropTypes.bool,
    reflow: PropTypes.bool,
    responsive: PropTypes.bool
};
class Alert extends Component{

    constructor () {
        super();
        this.state={alerts:[]};

    }
    getInitialState() {
        return {
            alerts:[]
        }
    }
    componentDidMount(){
        let self=this;
        let vin=this.props.match.params.vin;
        const alertUrl = 'http://localhost:8080/api/alerts/'+ vin;
        axios.get(alertUrl)
            .then(function (response) {
                //console.log(response.data);
                self.setState({
                    alerts: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render(){
        return(
                    <div className="Alert">
                        <div><h3>Vehicle Alerts</h3></div>
                        <Table bordered responsive hover>
                            <thead>
                            <tr>
                                <th scope="row">Alert Id</th>
                                <th>Priority</th>
                                <th>Time Stamp</th>
                                <th>Reading Id</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.alerts.map((alert, i) =>
                                    <tr key={i}>
                                        <td>{alert.id}</td>
                                        <td>{alert.priority}</td>
                                        <td>{moment(alert.timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
                                        <td>{alert.reading.id}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>


            )
    };
}

export default Alert;