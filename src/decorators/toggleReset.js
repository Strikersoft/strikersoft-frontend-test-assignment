import React, {Component as ReactComponent} from 'react'

export default (OriginalComponent) => class WrappedComponent extends ReactComponent {
    state = {
        reset: false
    }

    render() {
        return <OriginalComponent {...this.props} {...this.state} toggleReset = {this.toggleReset} />
    }

    toggleReset = (ev) => {
        ev && ev.preventDefault && ev.preventDefault()
        this.setState({
            reset: !this.state.reset
        })
    }
    
}