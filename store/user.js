import { defineStore } from "pinia";

export const useGlobalStore = defineStore("user", {
  state: () => ({
    email: "",
    userName: "",
    codeName: "",
    firstName: "",
    lastName: "",
    avatar: "",
    reports: [
      {
        id: "",
        name: "",
        description: "",
        date: "",
        images: "",
        longitude: "",
        latitude: "",
        timestamp: "",
      },
    ],
  }),
  actions: {
    setEmail(email) {
      this.email = email;
    },
    setUserName(userName) {
      this.userName = userName;
    },
    setCodeName(codeName) {
      this.codeName = codeName;
    },
    setFirstName(firstName) {
      this.firstName = firstName;
    },
    setLastName(lastName) {
      this.lastName = lastName;
    },
    setAvatar(avatar) {
      this.avatar = avatar;
    },
  },
});
