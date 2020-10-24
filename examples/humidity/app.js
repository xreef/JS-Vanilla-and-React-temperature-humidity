import * as React from "react";
import {render} from "react-dom";

import { HumidityWidget, TermometerWidget } from "../../src/index"

import "./app.less";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            humidity: 50
        }

        setTimeout(this.setHumidity, 4000);
    }

    setHumidity = () => {
        this.setState(
            { humidity: Math.round(Math.random() * 1000)/10 }
        )
        setTimeout(this.setHumidity, 4000);
    }

    render() {
        return <div style={{ width: '100%' }}>
            <HumidityWidget humidity={this.state.humidity} diameter={150} animationRates={80} />
               </div>
    }
}

render(<App />, document.getElementById('container'));
