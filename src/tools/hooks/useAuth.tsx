import React, { useState, useEffect } from 'react';
import useFilterChainAsync from '@/tools/hooks/useFilterChainAsync';

interface IParams {
  filters: Function[];
  initialPayload?: any;
}

const BaseFilter = async (payload, next) => {
  const bool = await next(payload);
  return {
    isAuthoried: bool,
  };
};

const useAuth = (params: IParams) => {
  const { filters, initialPayload } = params;
  const { result } = useFilterChainAsync({
    filters: [BaseFilter].concat(
      filters.map((filter) => {
        return async (payload, next) => {
          return await filter(payload, next);
        };
      }),
    ),
    initialPayload,
  });
  return { isAuthoried: result?.isAuthoried };
};

export default useAuth;
