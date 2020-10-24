import BaseWrapper from './BaseWrapper'

import React/* , { lazy, Suspense } */ from 'react'
import {render} from 'react-dom';

// const HumidityWidget = lazy(() => import('../components/HumidityWidget'));
import HumidityWidget from '../components/humidity/HumidityWidget'

class HumidityWidgetWrapper extends BaseWrapper {
    constructor(
        container,
        humidity = 0,
        diameter = 'auto',
        animationRates = 120
    ) {
        super(container);
        this.container = container;
        this.humidity = humidity;
        this.animationRates = animationRates;
        this.diameter = diameter;
    }

    setHumidity(val) {
        this.humidity = val;
        this.draw();
    }

    draw() {
        this.reactElement = render(
                    <HumidityWidget humidity={this.humidity} animationRates={this.animationRates} diameter={this.diameter} />,
            this.container
        );
    }
}
// <Suspense fallback={<div>Loading...</div>}></Suspense>
export default HumidityWidgetWrapper
