import React, { useEffect, useState } from "react";
import { getTeachers } from "../api/teachers";

export default function TeacherTable() {
  const [rows, setRows] = useState([]);
  useEffect(() => { getTeachers().then((r) => setRows(r.data)); }, []);
  return (
    <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>Email</th><th>Name</th><th>University</th><th>Gender</th><th>Year Joined</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((t) => (
          <tr key={t.id}>
            <td>{t.auth_user?.email}</td>
            <td>{t.auth_user?.first_name} {t.auth_user?.last_name}</td>
            <td>{t.university_name}</td>
            <td>{t.gender}</td>
            <td>{t.year_joined}</td>
            <td>{t.user?.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
