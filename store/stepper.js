import { defineStore } from "pinia";

export const useSteps = defineStore("steps", {
  state: () => ({
    step: "",
    editMode: false,
  }),
  actions: {
    setStep(step) {
      this.step = step;
    },
    setEditMode(mode) {
      this.editMode = mode;
    },
  },
});
