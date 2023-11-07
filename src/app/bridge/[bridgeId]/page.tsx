'use client';
import * as React from 'react';
import BridgePageContainer from '../components/BridgePageContainer';

const BridgePage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  React.useEffect(() => {
    const { platform } = searchParams;

    if (platform) {
      localStorage.setItem('platform', platform as string);
    }
  }, []);

  return <BridgePageContainer />;
};

export default BridgePage;
