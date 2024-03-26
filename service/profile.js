export const editProfile = async (form) => {
  try {
    const response = await fetch("/v1/workers/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    });
    const data = response.json();
    return data;
  } catch (error) {
    return Promise.reject(error.message || "terjadi error!");
  }
};
export const editExp = async (form) => {
  try {
    const response = await fetch("/v1/experience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    });
    const data = response.json();
    return data;
  } catch (error) {
    return Promise.reject(error.message || "terjadi error!");
  }
};
export const editImage = async (formData) => {
  try {
    const response = await fetch("/v1/workers/profile/photo", {
      method: "PUT",
      
      credentials: "include",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return Promise.reject(error.message || "terjadi error!");
  }
};
export const getExp = async () => {
  try {
    const response = await fetch("/v1/experience", {
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
export const deleteExp = async (id) => {
  try {
    const response = await fetch(`/v1/experience/${id}`, {
      method: "DELETE",
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
export const editProfileRecruiter = async (form) => {
  try {
    const response = await fetch("/v1/recruiters/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    });
    const data = response.json();
    return data;
  } catch (error) {
    return Promise.reject(error.message || "terjadi error!");
  }
};
