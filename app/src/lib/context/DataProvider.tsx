// Hooks
import { createContext, useEffect } from "react";

// Store
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { dataActions } from "../store/features/data";

// Client
import { FetchWeather } from "../client/api";

// Types
import { type ConditionsT } from "../types/data";

const ConditionsContext = createContext<ConditionsT | undefined>(undefined);

export const DataProvider = () => {
  const conditions: ConditionsT | undefined = useAppSelector(
    (state) => state.data.conditions
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      const weather = await FetchWeather();
      dispatch(dataActions.conditions(weather.current));
    };

    if (!conditions) {
      fetch();
    }
  }, [conditions, dispatch]);

  return <ConditionsContext.Provider value={conditions} />;
};
