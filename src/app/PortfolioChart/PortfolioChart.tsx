import * as React from 'react';
import { Chart, ChartAxis, ChartGroup, ChartLine, ChartVoronoiContainer } from '@patternfly/react-charts';

type PortfolioData = {
    chartData: Array<Map<string, object>>
}

const PortfolioChart: React.FunctionComponent = ({ chartData }: PortfolioData) => (
    <Chart
        ariaDesc="Average number of pets"
        ariaTitle="Line chart example"
        containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.name}: ${datum.y}`} constrainToVisibleArea />}
        legendData={[{ name: 'Cats' }, { name: 'Dogs', symbol: { type: 'dash' } }, { name: 'Birds' }, { name: 'Mice' }]}
        legendOrientation="vertical"
        legendPosition="right"
        height={250}
        maxDomain={{ y: 10 }}
        minDomain={{ y: 0 }}
        padding={{
            bottom: 50,
            left: 50,
            right: 200, // Adjusted to accommodate legend
            top: 50
        }}
        width={600}
    >
        <ChartAxis tickValues={[2, 3, 4]} />
        <ChartAxis dependentAxis showGrid tickValues={[2, 5, 8]} />
        <ChartGroup>
            <ChartLine
                data={ chartData }
            />
            <ChartLine
                data={[
                    { name: 'Dogs', x: '2015', y: 2 },
                    { name: 'Dogs', x: '2016', y: 1 },
                    { name: 'Dogs', x: '2017', y: 7 },
                    { name: 'Dogs', x: '2018', y: 4 }
                ]}
                style={{
                    data: {
                        strokeDasharray: '3,3'
                    }
                }}
            />
        </ChartGroup>
    </Chart>
)

export { PortfolioChart };