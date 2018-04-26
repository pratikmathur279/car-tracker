/**
 * Created by darav on 7/21/2017.
 */

import React, { Component } from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import axios from 'axios';

const coords = {
    lat: 51.5258541,
    lng: -0.08040660000006028
};

const params = {v: '3.exp', key: 'AIzaSyCXLpoBVlrVtPMS6Fa44_Y9MkXXeSDSDA4'};

class Map extends Component{

    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true
        });
    }

    onDragEnd(e) {
        console.log('onDragEnd', e);
    }

    onCloseClick() {
        console.log('onCloseClick');
    }

    onClick(e) {
        console.log('onClick', e);
    }
    constructor () {
        super();
        this.state = {
            latitude: [],
            longitude:[]
        };
    }
    getInitialState() {
        return {
            latitude: [],
            longitude:[]
        }
    }
    componentDidMount(){
        let self=this;
        let vin=this.props.match.params.vin;
        let lat=[];
        let log=[];
        const readingUrl = 'http://localhost:8080/api/readings/'+ vin;
        axios.get(readingUrl)
            .then(function (response) {
                console.log(response.data);
                response.data.map((coordinate, i) =>{
                        lat.push(coordinate.latitude),
                    log.push(coordinate.longitude)}
                )
                self.setState({
                    latitude:lat,
                    longitude:log
                });
                console.log(self.state.longitude[0]);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    render() {
        return (
            <div >
                <div><h3>Vehicle Location</h3></div>
                <Gmaps
                    width={'800px'}
                    height={'600px'}
                    lat={41.8781}
                    lng={87.6298}
                    zoom={2}
                    loadingMessage={'Loading'}
                    params={params}
                    onMapCreated={this.onMapCreated}>
                    {this.state.latitude.map((coordinate,i)=>
                    <Marker key={i}
                        lat={coordinate}
                        lng={this.state.longitude[i]}
                        draggable={true}
                        onDragEnd={this.onDragEnd} />
                    )}
                </Gmaps>
            </div>
        );
    }
}
export default Map;