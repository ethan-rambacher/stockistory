import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { PortfolioChart } from '@app/PortfolioChart/PortfolioChart';

const Dashboard: React.FunctionComponent = () => (
  <PageSection>
    <Title headingLevel="h1" size="lg">Portfolio</Title>
    <div style={{ height: '50%', width: '100%' }}>
      <PortfolioChart chartData={[
                    { name: 'AAPL', x: '2015', y: 2 },
                    { name: 'AAPL', x: '2016', y: 1 },
                    { name: 'AAPL', x: '2017', y: 7 },
                    { name: 'AAPL', x: '2018', y: 4 }
                ]}></PortfolioChart>
    </div>
  </PageSection>
)

export { Dashboard };
