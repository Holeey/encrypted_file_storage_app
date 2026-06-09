
export const createUser = async (data: any) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const payload = await res.json().catch(() => ({ error: "Error creating user" }));
    throw new Error(payload.error ?? "Error creating user");
  }

  return res.json()
}

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => ({ error: "Login failed" }));
    throw new Error(payload.error ?? "Login failed");
  }

  return res.json();
};

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
//};