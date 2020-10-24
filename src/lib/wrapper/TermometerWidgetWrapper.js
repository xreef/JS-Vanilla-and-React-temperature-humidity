import BaseWrapper from './BaseWrapper'

import React/* , { lazy, Suspense } */ from 'react'
import {render} from 'react-dom';

// const HumidityWidget = lazy(() => import('../components/HumidityWidget'));
import TermometerWidget from '../components/termometer/TermometerWidget'

class TermometerWidgetWrapper extends BaseWrapper {
    constructor(
        container,
        temperature = 0,
        height = 'auto',
        unit = 'Celcius',
        minTemp = -20,
        maxTemp = 60
    ) {
        super(container);
        this.container = container;
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
        this.unit = unit;
        this.temperature = temperature;
        this.height = height;
    }

    setTemperature(val) {
        this.temperature = val;
        this.draw();
    }

    draw() {
        this.reactElement = render(
                    <TermometerWidget minTemp={this.minTemp}
                                      maxTemp={this.maxTemp}
                                      unit={this.unit}
                                      temperature={this.temperature}
                                      height={this.height}
                    />,
            this.container
        );
    }
}
// <Suspense fallback={<div>Loading...</div>}></Suspense>
export default TermometerWidgetWrapper
