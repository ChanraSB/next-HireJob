export const getWorkers = async ({
  limit,
  page,
  sort,
  sortBy,
  search,
} = {}) => {
  try {
    const response = await fetch(
      `/v1/workers/?limit=${limit}&page=${page}&search=${search}&sort=${sort}&sortBy=${sortBy}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      })
    if (!response.ok) {
      throw new Error( "Failed to fetch workers data");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching workers data:", error.message);
  }
};
export const getProfileWorkers = async () => {
  try {
    const response = await fetch("/v1/workers/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    console.log( "worker", data.data)
    return data.data;
  } catch (error) {
    return Promise.reject(error.message || "terjadi error!");
  }
};
export const getWorkerById = async (id) => {
  try {
    const response = await fetch(`/v1/workers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache : "no-store"
    });
    const data = await response.json();
    console.log( "worker", data.data)
    return data.data;
  } catch (error) {
    return Promise.reject(error.message || "terjadi error!");
  }
};
export const getSkillById = async (id) => {
  try {
    const response = await fetch(`/v1/skills/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    console.log( "worker", data.data)
    return data.data;
  } catch (error) {
    return Promise.reject(error.message || "terjadi error!");
  }
};
export const getSkillsWorkers = async (id) => {
  try {
    const response = await fetch(`/v1/skills/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    console.log(data.data)
    return data.data;
  } catch (error) {
    return Promise.reject(error.message || "terjadi error!");
  }
};