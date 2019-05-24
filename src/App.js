import React from "react";
import ReactJson from 'react-json-view';
import { Metaframe } from 'metaframe';

import metaFrameJson from '../static/metaframe.json';

export default class App extends React.Component {

  async load() {
    var metaframe = new Metaframe();
    this.setState({metaframe});

    metaframe.onInputs((inputs) => {
      console.log('editor inputs', inputs);
      Object.keys(inputs).forEach((inputKey) => {
        let val = inputs[inputKey];
        if (typeof(val) === 'string') {
          val = JSON.parse(val);
        } 
        this.setState({key:inputKey, json:val});
      })
    });
    await metaframe.ready;
  }

  componentDidMount() {
    this.load();
  }

  componentWillUnmount() {
    if (this.state.metaframe) {
      this.state.metaframe.dispose();
    }
  }

  // https://www.npmjs.com/package/react-json-view#onedit-onadd-and-ondelete-interaction
  onEdit = (e) => {
    this.setState({
      json: e.updated_src,
    });
    if (this.state.metaframe) {
      this.state.metaframe.setOutput(this.state.key || 'json', e.updated_src);
    } else {
      console.log('no metaframe, not outputitng');
    }
    return true;
  }
  // onAdd = (e) => {
  //   this.setState({
  //     json: e.updated_src
  //   });
  //   return true;
  // }
  // onDelete = (e) => {
  //   this.setState({
  //     json: e.updated_src
  //   });
  //   return true;
  // }

  render() {
    const json = (this.state && this.state.json) || metaFrameJson;
    // const json = metaFrameJson;
    return (
      <div className="App">
        <ReactJson
          src={json}
          name={false}
          displayObjectSize={false}
          displayDataTypes={false}
          sortKeys={true}
          defaultValue={'string'}
          onEdit={this.onEdit}
          onAdd={this.onEdit}
          onDelete={this.onEdit}
        />
      </div>
    );
  }
}
