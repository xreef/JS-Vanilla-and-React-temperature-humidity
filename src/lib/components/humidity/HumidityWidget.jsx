import * as React from "react";
// import * as ReactDOM from "react-dom";

import PropTypes from 'prop-types';
import './style/humidityWidget.less';


class HumidityWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            waterStyle: null,
            size: {}
        };

        this.textContainer = React.createRef();
        this.container = React.createRef();

        this.setHumidity(props.humidity);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.humidity !== this.state.count) {
            this.setHumidity(nextProps.humidity);
        }
    }

    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", () => {
this.setState({
            size: {
                width: this.container.current.offsetWidth,
                height: this.container.current.offsetHeight,
            },
        }); setTimeout(this.fitText.bind(this), 300)
});
    }

    componentDidMount() {
        this.fitText();
        window.addEventListener("resize", () => {
 this.setState({
            size: {
                width: this.container.current.offsetWidth,
                height: this.container.current.offsetHeight,
            },
        }); setTimeout(this.fitText.bind(this), 300)
});
        this.setState({
            size: {
                width: this.container.current.offsetWidth,
                height: this.container.current.offsetHeight,
            },
        });
    }

    componentDidUpdate() {
        this.fitText();
    }

    setHumidity = (percentage) => {
        let percent = this.state.count;

        const interval = setInterval(() => {
            if (Math.round(percent) > Math.round(percentage)) {
                percent--;
            } else {
                percent++;
            }

            this.setState({ count: percent, waterStyle: { transform: ('translate(0,' + (100 - percent) + '%)') } })

            if (Math.round(percent) === Math.round(percentage)) {
                this.setState({ count: percentage });
                clearInterval(interval);
            }
            this.fitText();
        }, this.props.animationRates);
    };

    fitText = () => {
        if (this.textContainer.current == null) return;
        // max font size in pixels
        const maxFontSize = 400;

        const margin = 10;

        // get the DOM output element by its selector
        const outputDiv = this.textContainer.current; // document.getElementById(outputSelector);
        const outputDomDiv = outputDiv; // ReactDOM.findDOMNode(outputDiv);
        // get element's width
        let width = outputDiv.clientWidth;
        // get content's width

        let contentWidth = outputDiv.scrollWidth;

        console.log('contentWidth, width', contentWidth, width);
        // get fontSize
        let fontSize = parseInt(window.getComputedStyle(outputDomDiv, null).getPropertyValue('font-size'), 10);
        // if content's width is bigger then elements width - overflow
        if (contentWidth > width) {
            fontSize = Math.ceil(fontSize * width / contentWidth, 10);
            fontSize = fontSize > maxFontSize ? fontSize = maxFontSize : fontSize - 1;
            outputDiv.style.fontSize = fontSize + 'px';
        } else {
            // content is smaller then width... let's resize in 1 px until it fits
            while (contentWidth === width && fontSize < maxFontSize) {
                fontSize = Math.ceil(fontSize) + 1;
                fontSize = fontSize > maxFontSize ? fontSize = maxFontSize : fontSize;
                outputDiv.style.fontSize = fontSize + 'px';
                // update widths
                width = outputDiv.clientWidth;
                contentWidth = outputDiv.scrollWidth;
                if (contentWidth > width) {
                    outputDiv.style.fontSize = fontSize - 1 + 'px';
                } else if (contentWidth < width) {
                        outputDiv.style.fontSize = fontSize + 1 + 'px';
                }
            }
        }
    }

    render() {
        const { diameter } = this.props;
        // styling
        const { size, count, waterStyle } = this.state;

        const sizeToGet = (size.height && size.height > 10) ? Math.min(size.height, size.width) : size.width;

        const diameterHumidity = (diameter && diameter !== 'auto') ? diameter : sizeToGet;

        // This function wont be re-rendered in case when the new state is same as previous
        return <div className="mischianti-humidity-container" ref={this.container}>
            <div className="mischianti-humidity" style={{ width: diameterHumidity, height: diameterHumidity }}>
                <svg
                    version="1.1"
                    // xmlns="http://www.w3.org/2000/svg"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    style={{ display: 'none' }}
                >
                    <symbol id="wave">
                        <path
                            d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"
                        />
                        <path
                            d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"
                        />
                        <path
                            d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"
                        />
                        <path
                            d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"
                        />
                    </symbol>
                </svg>
                <div className="mischianti-humidity-box" style={{ width: diameterHumidity, height: diameterHumidity }}>
                    <div className="percent" ref={this.textContainer}>
                        <div className="percent-text">
                            {count + '%'}
                        </div>
                    </div>
                    <div id="water" className="water" style={waterStyle}>
                        <svg viewBox="0 0 560 20" className="water_wave water_wave_back">
                            <use xlinkHref="#wave" />
                        </svg>
                        <svg viewBox="0 0 560 20" className="water_wave water_wave_front">
                            <use xlinkHref="#wave" />
                        </svg>
                    </div>
                </div>
            </div>
               </div>;
    }
}

HumidityWidget.propTypes = {
    humidity: PropTypes.number,
    animationRates: PropTypes.number,
    diameter: PropTypes.string
};

HumidityWidget.defaultProps = {
    humidity: 0,

    animationRates: 120,
    diameter: 'auto'
};

export default HumidityWidget;
