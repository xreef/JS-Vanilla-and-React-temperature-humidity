import {unmountComponentAtNode} from 'react-dom'

export default class BaseWrapper {
    constructor(container){
        this.container = container;
        this.reactElement = null;
    }

    destroy() {
        this.container && unmountComponentAtNode(this.container);
        this.reactElement = null;
    }

}
