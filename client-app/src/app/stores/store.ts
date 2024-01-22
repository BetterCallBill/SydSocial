import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    activityStore: ActivityStore
}

export const store: Store = {
    // property
    activityStore: new ActivityStore()
}

// react context
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}