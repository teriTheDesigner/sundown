import { defineStore } from "pinia";

export const useGlobalStore = defineStore("user", {
  state: () => ({
    email: "",
    userName: "",
    codeName: "",
    firstName: "",
    lastName: "",
    avatar: "",
    allReports: [],
    report: {
      id: null,
      name: "",
      description: "",
      date: "",
      images: [],
      longitude: "",
      latitude: "",
      timestamp: "",
    },
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
    setReportName(name) {
      console.log(name);
      this.report.name = name;
    },
    setReportDescription(description) {
      this.report.description = description;
    },

    setReportDate(date) {
      this.report.date = date;
    },
    addReport() {
      const newReportId = this.allReports.length + 1;

      const newReport = {
        id: newReportId,
        name: this.report.name,
        description: this.report.description,
        date: this.report.date,
        images: this.report.images,
        longitude: this.report.longitude,
        latitude: this.report.latitude,
        timestamp: this.report.timestamp,
      };

      this.allReports.push(newReport);

      this.report = {
        id: null,
        name: "",
        description: "",
        date: "",
        images: [],
        longitude: "",
        latitude: "",
        timestamp: "",
      };
    },
  },
});
