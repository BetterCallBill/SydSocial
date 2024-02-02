import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

interface Store {
    activityStore: ActivityStore,
    commonStore: CommonStore
}

export const store: Store = {
    // property
    activityStore: new ActivityStore(),
    commonStore: new CommonStore()
}

// react context
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}