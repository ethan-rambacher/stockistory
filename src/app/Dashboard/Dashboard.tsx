import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { PortfolioChart } from '@app/PortfolioChart/PortfolioChart';
import axios from 'axios'

type DashboardProps = any;

type DashboardState = {
  symbols: string[],
  //prices: { [key: string]: any[][] }
  data: any[][]
}

export default class Dashboard extends React.Component<DashboardProps, DashboardState> {
  state: DashboardState = {
    symbols: ["AAPL","F"],
    //prices: {}
    data: []
  };

  getData = (symbols) => {
    let url = "http://localhost:8000/prices/" + symbols.join(",");

    axios.get(url).then(res => {
        // data = {"AAPL": "csv,string,...", "VLCAX": "csv,string,..."}
        let data: {[key: string]: string} = res.data;
        this.setState((state) => {
            for (let symbol in data) {
                // split and remove last \n row
                let lines = data[symbol].split('\n').slice(0, -1);
                
                // iterate over all lines
                for (let i=0; i<lines.length; i++) {
                    const [datestr, close, div, wa] = lines[i].split(",");
                    const values = [parseFloat(close), parseFloat(div)]; // TODO: add more data here - contributions, equity, etc

                    if (i<state.data.length) {
                        // data array already initialized here
                        state.data[i][2][symbol] = values
                    } else {
                        const [y,m,d] = datestr.split("-").map((x) => parseInt(x,10));
                        const date = new Date(y,m-1,d);
                        const row = [date, parseInt(wa,10), {}];
                        row[2][symbol] = values;
                        state.data.push(row);
                    }
                }
                console.log("Got symbol data for " + symbol);
            }
            console.log(state.data);
            return {data: state.data}
        });
    }).catch(e => {
        console.log("Error fetching symbols " + symbols);
        console.log(e);
        this.setState((state) => {
            let p = state.data;
            symbols.map((s) => p[s] = []); // set data for all symbols to []
            return {data: p};
        });
    })
};

  componentDidMount() {
    this.getData(this.state.symbols);
    // this.setState({
    //   prices: {"AAPL": data}
    // })
  }

  render() {
    console.log("rendering dashboard now");
    console.log(this.state.data);
    return (
      <PageSection>
        <Title headingLevel="h1" size="lg">Portfolio</Title>
        <div style={{ height: '50%', width: '100%' }}>
          <PortfolioChart symbols={this.state.symbols} data={this.state.data}></PortfolioChart>
        </div>
      </PageSection>
    );
  }
}

export { Dashboard };
