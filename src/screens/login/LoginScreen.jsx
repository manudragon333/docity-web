import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


const styles = (theme) => ({
});

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
       
    }

    

    render() {
        return (
            <div >
               <p>Login Screen</p>
            </div>
        );
    }
}




const mapStateToProps = ({  }) => ({  });
const mapDispatchToProps = {
};

export default LoginScreen = connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles, { withTheme: true })(LoginScreen)));

