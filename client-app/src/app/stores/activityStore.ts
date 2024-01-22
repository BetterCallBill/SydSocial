import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

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
        return Array.from(this.activityRegister.values()).sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    }

    // bind loadActivities to class ActivityStore
    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();

            runInAction(() => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    // this.activities.push(activity);
                    this.activityRegister.set(activity.id, activity);
                })

                this.setLoadinginitial(false);
            })
        } catch (error) {
            console.log(error)
            this.setLoadinginitial(false);
        }
    }

    setLoadinginitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegister.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        
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
                if (this.selectedActivity?.id === id) {
                    this.cancelSelectedActivity();
                }
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