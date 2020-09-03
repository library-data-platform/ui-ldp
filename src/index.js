import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';
import QueryBuilderPage from './routes/query-builder-page';
import ExamplePage from './routes/example-page';
import LogsPage from './routes/logs';
import Settings from './settings';
import { NavList, NavListItem } from '@folio/stripes-components'

/*
  STRIPES-NEW-APP
  This is the main entry point into your new app.
*/

class Ldp extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    showSettings: PropTypes.bool,
    stripes: PropTypes.shape({
      connect: PropTypes.func
    })
  };

  constructor(props) {
    super(props);

    this.connectedExamplePage = props.stripes.connect(ExamplePage);
  }

  render() {
    const {
      showSettings,
      match: {
        path
      }
    } = this.props;
    
    if (showSettings) {
      return <Settings {...this.props} />;
    }
    return (
      <div style={{ position: 'absolute', display: 'flex', height: '100%', width: '100%',  }}>
        <div style={{ width: 200, padding: 15, borderRight: '1px solid rgba(0,0,0,.2)' }}>
          <NavList>
            <Link to={`${path}`}><NavListItem>Query Builder</NavListItem></Link>
            <Link to={`${path}/examples`}><NavListItem>Tables</NavListItem></Link>
            <Link to={`${path}/logs`}><NavListItem>Logs</NavListItem></Link>
          </NavList>
        </div>
        <Switch>
          <Route
            path={path}
            exact
            component={QueryBuilderPage}
          />
          <Route
            path={`${path}/examples`}
            exact
            component={this.connectedExamplePage}
          />
          <Route
            path={`${path}/logs`}
            exact
            component={LogsPage}
          />
        </Switch>
      </div>
    );
  }
}

export default Ldp;
