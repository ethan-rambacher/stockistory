import * as React from 'react';
import { Chart, ChartAxis, ChartGroup, ChartLine, ChartVoronoiContainer } from '@patternfly/react-charts';
//import { VictoryZoomContainer } from 'victory-zoom-container';
import { scaleDiscontinuous, discontinuityRange } from 'd3fc-discontinuous-scale';

type PortfolioData = {
    symbols: string[]
    data: any[][]
}

type PortfolioState = {
    prices: { [key: string]: any[][] }
}

function selectN(list: any[], n: number) {
    // note: this returns APPROXIMATELY n evenly spaced items from `list`
    const k: number = Math.floor(list.length / n);
    return list.filter((_, index) => index % k == 0);
}

export default class PortfolioChart extends React.Component<PortfolioData, PortfolioState> {
    state: PortfolioState = {
        prices: {}
    };

    render() {
        console.log("rendering portfoliochart with props:");
        console.log(this.props.symbols);
        console.log(this.props.data);

        return (
            <Chart
                ariaDesc="Average number of pets"
                ariaTitle="Line chart example"
                containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum[0].toDateString()}`} constrainToVisibleArea />}
                legendData={this.props.symbols.map((s) => ({ name: s }))}
                legendOrientation="vertical"
                legendPosition="right"
                height={250}
                padding={{
                    bottom: 50,
                    left: 50,
                    right: 200, // Adjusted to accommodate legend
                    top: 50
                }}
                scale={{x: "time", y: "linear"}}
                width={600}
            >
                <ChartAxis fixLabelOverlap/>
                <ChartAxis dependentAxis showGrid orientation="left"/>
                <ChartGroup>
                    {/* <ChartLine key="A" data={[[2,2],[1,3],[3,4]]} x={0} y={1} />
                    <ChartLine key="B" data={[[1,3],[2,4],[1]]} x={0} y={1} /> */}
                    {
                        this.props.symbols.map((symbol) => {
                            return (
                                <ChartLine
                                    key={symbol}
                                    data={this.props.data}
                                    //labels={}
                                    x={0}
                                    y={(arr) => arr[2][symbol][0]}
                                />
                            )
                        })
                    }
                </ChartGroup>
            </Chart>
        )
    }
}

export { PortfolioChart };