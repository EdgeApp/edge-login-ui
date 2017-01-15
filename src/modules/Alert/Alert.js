import React,{Component} from 'react'
import { connect } from 'react-redux'
import { closeAlert } from './Alert.action'

class Alert extends Component {

    componentWillReceiveProps(props) {
        if(props.alert.show) {
            setTimeout( () => {
                this.handleClose()
            }, props.alert.timeout)
        }
    }

    handleClose = () => {
        this.props.dispatch(closeAlert())
    }

    render() {
        return (
            <div className={`alerty alert light alert-dismissable text-center ${this.props.alert.status} ${this.props.alert.show ? 'visible' : ''}`}>
                <button type="button" className="close" onClick={this.handleClose}>×</button>
                <p>{this.props.alert.message}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        alert : state.alert
    }
}

export default connect(mapStateToProps) (Alert)
