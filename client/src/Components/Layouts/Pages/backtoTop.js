import React from 'react';
import { Icon } from 'antd';

class ScrollButton extends React.Component {
    constructor() {
        super();

        this.state = {
            intervalId: 0
        };
    }

    scrollStep = () => {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }

    scrollToTop = () => {
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({ intervalId: intervalId });
    }

    render() {
        return (
            <button
                title='Back to top'
                className='scroll-top-button'
                onClick={this.scrollToTop}>
                <Icon type="caret-up" />
            </button>
        )
    }
}

class Scroll extends React.Component {
    render() {
        return <ScrollButton scrollStepInPx="50" delayInMs="6" />
    }
}

export default Scroll;