const url = process.env.NEXT_PUBLIC_HIRE_JOB_URL;
import { cookies } from "next/headers";

const getCookie = async (name) => {
  return cookies().get(name)?.value ?? "";
};
// const getCookie = async (name) => {
//     const cookieData = cookies().get(name)?.value ?? "";
//     return new Promise((resolve) =>
//       setTimeout(() => {
//         resolve(cookieData);
//       }, 1000)
//     );
//   };
export const getRecruitersNotification = async () => {
    try {
      const token = await getCookie("token");
      const response = await fetch(`${url}/v1/hire/recruiters`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Cookie: `token=${token};path=/;expires=Session` } : {}),
        },
        credentials: "include",
        cache : "no-store"
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch notification data");
      }
      const data = await response.json();
      console.log(data);
      return data.data;
    } catch (error) {
      console.log("Error fetching recruiter notification data:", error.message);
    }
  };
export const getWorkersNotification = async () => {
    try {
      const token = await getCookie("token");
      const response = await fetch(`${url}/v1/hire/workers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Cookie: `token=${token};path=/;expires=Session` } : {}),
        },
        credentials: "include",
        cache : "no-store"
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch notification data");
      }
      const data = await response.json();
      console.log(data);
      return data.data;
    } catch (error) {
      console.error("Error fetching worker notification data:", error.message);
    }
  };