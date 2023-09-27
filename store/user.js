import { defineStore } from "pinia";

export const useGlobalStore = defineStore("user", {
  state: () => ({
    email: "email here",
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
    changeEmail(newEmail) {
      this.email = newEmail;
    },
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
      this.report.name = name;
    },
    setReportDescription(description) {
      this.report.description = description;
    },
    setReportDate(date) {
      this.report.date = date;
    },
    setImages(selectedImages) {
      this.report.images = selectedImages;
    },
    setLongitude(longitude) {
      this.report.longitude = longitude;
    },
    setLatitude(latitude) {
      this.report.latitude = latitude;
    },
    setTimestamp(timestamp) {
      this.report.timestamp = timestamp;
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
