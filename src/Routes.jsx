import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiThemeProvider } from "@material-ui/core/styles";

import { 
  BrowserRouter as Router, 
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { 
  LoginScreen
} from "./screens";

const styles = (theme) => ({
    
});



class Routes extends Component {

    constructor(props){
      super(props);
      this.state = {
        
      }
    }
    componentDidMount(){
     
    }

    componentDidUpdate(prevProps, prevState, snapshot){
      
    }

    render() {
        return(
          <MuiThemeProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <React.Fragment>               
                    
                      <Router>
                        <Switch>
                            <Route exact path='/' component={LoginScreen} />
                        </Switch>
                    </Router>                    
                 
                </React.Fragment>
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        );
    }
}


Routes.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

const mapStateToProps = ({  }) => ({ });
const mapDispatchToProps = {
};

export default Routes = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme:true })(Routes));

