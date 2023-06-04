import { useEffect, useReducer, useRef } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { RAPID_API_KEY } from '@env';

interface State<T> {
  data?: T;
  error?: Error;
}

type Cache<T> = { [endpoint: string]: T };

type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

export function useFetchJobs<T>(
  endpoint?: string,
  params?: AxiosRequestConfig['params']
): {
  refetch: (
    endpoint: string,
    params: AxiosRequestConfig['params']
  ) => Promise<void>;
  data?: T | undefined;
  error?: Error | undefined;
} {
  const cache = useRef<Cache<T>>({});

  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState };
      case 'fetched':
        return { ...initialState, data: action.payload };
      case 'error':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = async (
    endpoint: string,
    params: AxiosRequestConfig['params']
  ) => {
    dispatch({ type: 'loading' });

    // If a cache exists for this endpoint, return it
    if (cache.current[endpoint]) {
      dispatch({ type: 'fetched', payload: cache.current[endpoint] });
      return;
    }

    try {
      const response = await axios.get(
        `https://jsearch.p.rapidapi.com/${endpoint}`,
        {
          headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
          },
          params,
        }
      );
      if (response.status !== 200) {
        throw new Error(response.data.status);
      }

      const data = (await response.data.data) as T;
      cache.current[endpoint] = data;
      if (cancelRequest.current) return;

      dispatch({ type: 'fetched', payload: data });
    } catch (error) {
      if (cancelRequest.current) return;

      dispatch({ type: 'error', payload: error as Error });
    }
  };

  useEffect(() => {
    if (!endpoint) return;

    cancelRequest.current = false;

    fetchData(endpoint, params);

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
  }, [endpoint]);

  return { ...state, refetch: fetchData };
}
