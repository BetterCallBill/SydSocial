import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
export default class ActivityStore {
    activityRegister = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        console.log(this.activityRegister)
        return Array.from(this.activityRegister.values()).sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    }

    // bind loadActivities to class ActivityStore
    loadActivities = async () => {
        console.log("firstfirstfirstfirstfirstfirstfirst")
        this.setLoadinginitial(true);
        try {
            const activities = await agent.Activities.list();

            runInAction(() => {
                activities.forEach(activity => {
                    this.setActivity(activity);
                })

                this.setLoadinginitial(false);
            })
        } catch (error) {
            console.log(error);
            this.setLoadinginitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.setLoadinginitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoadinginitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadinginitial(false);
            }
        }
    }

    private getActivity = (id: string) => {
        return this.activityRegister.get(id);
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegister.set(activity.id, activity);
    }

    setLoadinginitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegister.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error)

            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;

        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegister.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;

        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegister.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}