import * as React from "react";
import {render} from "react-dom";

import { HumidityWidget,TermometerWidget } from "../../src/index"

import "./app.less";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            temperature: 20,
            size: {}
        }

        setTimeout(this.setTemperature, 4000);
    }

    setTemperature = () => {
        this.setState(
            { temperature: Math.round((Math.random() * 700)-200)/10 }
        )
        setTimeout(this.setTemperature, 4000);
    }

    render() {
        return <div style={{width: '100%'}}>
            <TermometerWidget temperature={this.state.temperature} />
        </div>
    }
}

render(<App />, document.getElementById('container'));
