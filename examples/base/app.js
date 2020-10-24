import * as React from "react";
import {render} from "react-dom";

import { HumidityWidget,TermometerWidget } from "../../src/index"

import "./app.less";

class App extends React.Component {
    onClick = (value, e) => console.log('click', value, e)

    render() {
        return <div style={{width: '100%'}}>
            <HumidityWidget humidity={50} diameter={'auto'} animationRates={80} />
            <TermometerWidget temperature={30} height={200} />
        </div>
    }
}

render(<App />, document.getElementById('container'));
