import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from "./Fish";
import base from "../base";


class App extends React.Component {
    state = {
        fishes: {},
        order: {},
    };

    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)}) 
        }
    this.ref = base.syncState(`${params.storeId}/fishes`,{
        context: this,
        state: 'fishes'
    });
    }

    componentDidUpdate () {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
       base.removeBinding(this.ref);
    }

    addFish = fish => { 
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({fishes});  
    }

    loadSampleFishes = () => {
        console.log("loading fish")
        this.setState({fishes:sampleFishes});
    }

    addToOrder = key => {
        const order = { ...this.state.order };
        order[key] = order[key] + 1 || 1 ; 
        this.setState({ order }); 
     }

    render() {
        return (
        
        <div className="catch-of-the-day">
                 <div className="menu">
                <Header tagline="Fresh Food Market"/>
                <ul className="fishes">
                {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}
                </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order}/>
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/> 
                </div>)
    }

}

export default App;