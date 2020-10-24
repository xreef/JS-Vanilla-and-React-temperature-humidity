import * as React from "react";
import PropTypes from 'prop-types';

import './style/termometerWidget.less';

const units = {
    Celcius: "°C",
    Fahrenheit: "°F"
};

const minAdj = 13;
const maxAdj = 20;

class TermometerWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: props.temperature,
            temperatureFormatted: this.getFormattedTemperature(props.temperature, props.unit),
            tempHeight: this.getHeightTemp(props.temperature),

            size: {}
        };

        this.container = React.createRef();
    }

    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", () => {
            this.setState({
                size: {
                    width: this.container.current.offsetWidth,
                    height: this.container.current.height,
                },
            });
        });
    }

    componentDidMount() {
        window.addEventListener("resize", () => {
            this.setState({
                size: {
                    width: this.container.current.offsetWidth,
                    height: this.container.current.height,
                },
            });
        });
        this.setState({
            size: {
                width: this.container.current.offsetWidth,
                height: this.container.current.height,
            },
        });
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.temperature !== this.state.temperature) {
            this.setTemperature(nextProps.temperature);
        }
    }

    getHeightTemp = (temperature) => ((temperature + maxAdj) - (this.props.minTemp + minAdj)) / ((this.props.maxTemp + maxAdj) - (this.props.minTemp + minAdj)) * 100 + "%";

    getFormattedTemperature = (temperature, unit) => temperature + units[unit];

    setTemperature = (temperature) => {
        this.setState(
            {
                temperature,
                temperatureFormatted: this.getFormattedTemperature(temperature, this.props.unit),
                tempHeight: this.getHeightTemp(temperature)
            }
        )
    };

    render() {
        const { height } = this.props;
        const { size } = this.state;
        let heightTermometer = (height && height !== 'auto') ? height : size.height;

        // styling
        const { temperatureFormatted, tempHeight } = this.state;
        // This function wont be re-rendered in case when the new state is same as previous
        return <div className="mischianti-termometer-container" style={{ width: '100%', textAlign: 'center' }}  ref={this.container}>
            <div className="mischianti-termometer" style={{ height: heightTermometer }}>
                <div
className="mischianti-termometer-temperature"
style={{ height: tempHeight }}
                     data-value={temperatureFormatted}
                />
                <div className="mischianti-termometer-graduations" />
            </div>
               </div>;
    }
}

TermometerWidget.propTypes = {
    minTemp: PropTypes.number.isRequired,
    maxTemp: PropTypes.number.isRequired,
    unit: PropTypes.oneOf(['Celcius', 'Fahrenheit']).isRequired,

    size: PropTypes.object,

    temperature: PropTypes.number
};

TermometerWidget.defaultProps = {
    minTemp: -20,
    maxTemp: 50,
    unit: 'Celcius',

    temperature: 0
};


export default TermometerWidget;
