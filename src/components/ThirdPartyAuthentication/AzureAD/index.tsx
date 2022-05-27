import { MsalProvider } from '@azure/msal-react';
import React from 'react';
import {
  useAzureADService,
  AzureADService,
  IAzureADServiceProps,
} from './useAzureADService';
import { msalInit, IMSALInitProps } from './config';

interface IAzureADProps extends IAzureADServiceProps, IMSALInitProps {}

const AzureADProvider: React.FC<IAzureADServiceProps> = (props) => {
  const aadService = useAzureADService(props);
  return (
    <AzureADService.Provider value={aadService}>
      {typeof props.children === 'function'
        ? props.children(aadService)
        : props.children}
    </AzureADService.Provider>
  );
};

export const AzureAD: React.FC<IAzureADProps> = (props) => {
  return (
    <MsalProvider instance={msalInit(props)}>
      <AzureADProvider {...props}>{props.children}</AzureADProvider>
    </MsalProvider>
  );
};
