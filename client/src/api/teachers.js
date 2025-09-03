import http from "./http";
export const getTeachers = () => http.get("/teachers");
