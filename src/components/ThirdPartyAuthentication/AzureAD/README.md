### AAD使用说明


**顶层注入初始化**
```tsx
import { AzureAD } from "@/components/ThirdPartyAuthentication/AzureAD";
import { IAzureADService } from "@/components/ThirdPartyAuthentication/AzureAD/useAzureADService";

export const App = () => {
    return (
        <AzureAD
        scope={""}
        clientId=""
        tenantId=""
        >
        {(aadService: IAzureADService) => {
            return (
            <div>
                {!aadService.isAuthenticated && (
                <button onClick={aadService.login}>login</button>
                )}
                {aadService.account}
                {aadService.accessToken}
                {aadService.status}
            </div>
            );
        }}
        </AzureAD>
    );
  }
```

**底层组件读取**

```tsx
import { AzureADService } from '@/components/ThirdPartyAuthentication/AzureAD/useAzureADService';
const App = () => {
  const aadService = useContext(AzureADService);
  return (
    <div>
      {!aadService.isAuthenticated && (
        <button onClick={aadService.login}>login</button>
      )}
      {aadService.account}
      {aadService.accessToken}
      {aadService.status}
    </div>
  );
};

```

**react框架外读取token**

需先初始化
```ts
import { acquireAccessToken } from '@/components/ThirdPartyAuthentication/AzureAD/useAzureADService';

let token = await acquireAccessToken();

```