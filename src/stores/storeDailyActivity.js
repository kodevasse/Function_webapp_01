import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/js/firebase";

let dailyActivityCollectionRef = collection(db, "dailyActivity");

export const useStoreDailyActivity = defineStore("storeDailyActivity", {
  state: () => ({
    activities: [],
  }),
  actions: {
    init() {
      this.fetchActivities();
    },
    async fetchActivities() {
      const querySnapshot = await getDocs(dailyActivityCollectionRef);
      let activities = [];
      querySnapshot.forEach((doc) => {
        activities.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      this.activities = activities;
    },
    async getActivity(userId, date) {
      if (!(date instanceof Date)) {
        throw new Error("date should be an instance of Date");
      }

      const dateString = date.toISOString().split("T")[0];
      const activity = this.activities.find(
        (activity) => activity.userId === userId && activity.date === dateString
      );

      return (
        activity || {
          // Add an 'id' property so that it's consistent with the format of an existing activity
          id: null,
          userId,
          date: dateString,
          littleExercise: false,
          bigExercise: false,
          completedRoutine: false,
        }
      );
    },

    async addActivity(userId, date, activity) {
      const dateString = date.toISOString().split("T")[0]; // Ensure we only store date part
      await addDoc(dailyActivityCollectionRef, {
        userId,
        date: dateString,
        ...activity,
      });
      this.fetchActivities(userId);
    },
    async updateActivity(activityId, activity) {
      const activityRef = doc(dailyActivityCollectionRef, activityId);
      await setDoc(activityRef, activity, { merge: true });
      this.fetchActivities(activity.userId);
    },
  },

  getters: {
    getScore: (state) => (userId) => {
      return state.activities
        .filter((activity) => activity.userId === userId)
        .reduce((score, activity) => {
          return (
            score +
            (activity.littleExercise ? 0.5 : 0) +
            (activity.bigExercise ? 1.5 : 0) +
            (activity.completedRoutine ? 1 : 0)
          );
        }, 0);
    },
    getScores: (state) => {
      const userIds = [
        ...new Set(state.activities.map((activity) => activity.userId)),
      ]; // get unique userIds
      let scores = {};
      userIds.forEach((userId) => {
        scores[userId] = state.activities
          .filter((activity) => activity.userId === userId)
          .reduce((score, activity) => {
            return (
              score +
              (activity.littleExercise ? 0.5 : 0) +
              (activity.bigExercise ? 1.5 : 0) +
              (activity.completedRoutine ? 1 : 0)
            );
          }, 0);
      });
      return scores;
    },
  },
});
