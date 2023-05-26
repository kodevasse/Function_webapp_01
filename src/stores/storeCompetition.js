import { defineStore } from "pinia";
import { auth, db } from "@/js/firebase";
import {
  addDoc,
  deleteDoc,
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";
import { ref } from "vue";

export const useStoreCompetition = defineStore("storeCompetition", {
  state: () => {
    return {
      isParticipant: false,
      participants: [],
    };
  },
  actions: {
    async init() {
      const user = auth.currentUser;
      if (!user) return; // If there's no user (not authenticated), exit

      // Listen for real-time updates to participants
      const participantsRef = collection(db, "participants");
      onSnapshot(participantsRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            this.participants.push({
              ...change.doc.data(),
              id: change.doc.id,
            });

            // Check if the added participant is the current user
            if (change.doc.data().userId === user.uid) {
              this.isParticipant = true;
            }
          }
          if (change.type === "modified") {
            const index = this.participants.findIndex(
              (participant) => participant.id === change.doc.id
            );
            if (index !== -1) {
              this.participants[index] = {
                ...change.doc.data(),
                id: change.doc.id,
              };
            }
          }
          if (change.type === "removed") {
            this.participants = this.participants.filter(
              (participant) => participant.id !== change.doc.id
            );

            // Check if the removed participant is the current user
            if (change.doc.data().userId === user.uid) {
              this.isParticipant = false;
            }
          }
        });
      });
    },
    async joinCompetition() {
      const user = auth.currentUser;
      if (!user || this.isParticipant) return; // Exit if user doesn't exist or is already a participant

      try {
        await addDoc(collection(db, "participants"), {
          userId: user.uid,
          displayName: user.displayName,
          joinDate: new Date().toDateString(),
          score: 0, // default score
        });

        this.isParticipant = true;
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async quitCompetition() {
      const user = auth.currentUser;
      if (!user) return;

      const participantRef = collection(db, "participants");
      const participantQuery = query(
        participantRef,
        where("userId", "==", user.uid)
      );
      const participantSnapshot = await getDocs(participantQuery);

      if (!participantSnapshot.empty) {
        await deleteDoc(participantSnapshot.docs[0].ref);
        this.isParticipant = false;
      }
    },
  },
});
