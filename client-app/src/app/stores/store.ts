import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
}

export const store: Store = {
    // property
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore()
}

// react context
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}