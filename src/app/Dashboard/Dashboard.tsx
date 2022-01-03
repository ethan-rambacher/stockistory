import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { PortfolioChart } from '@app/PortfolioChart/PortfolioChart';

const Dashboard: React.FunctionComponent = () => (
  <PageSection>
    <Title headingLevel="h1" size="lg">Portfolio</Title>
    <div style={{ height: '50%', width: '100%' }}>
      <PortfolioChart chartData={ "AAPL" }></PortfolioChart>
    </div>
  </PageSection>
)

export { Dashboard };
