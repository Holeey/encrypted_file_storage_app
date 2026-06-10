
export const registerUser = async (data: any) => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => ({ error: "Error creating user" }));
    throw new Error(payload.error ?? "Error creating user");
  }

  return response.json()
}

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({ error: "Login failed" }));
    throw new Error(payload.error ?? "Login failed");
  }

  return response.json();
};


export const uploadFile = async (data: { file: File }) => {
    const { file } = data;

    if (!file) return "No file selected.";
  
      const response = await fetch("/api/files/upload", {
        method: "POST",
        headers: {
          "content-type": "application/octet-stream",
          "x-filename": file.name,
        },
        body: file,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({ error: "Upload failed" }));
        throw new Error(payload.error ?? "Upload failed");
      }

      return response.json();
    }
  

// export const logoutUser = async () => {
//   const res = await fetch("/api/auth/logout", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//   });

//   if (!res.ok) {
//     const payload = await res.json().catch(() => ({ error: "Logout failed" }));
//     throw new Error(payload.error ?? "Logout failed");
//   }

//   return res.json();
// };