// lib/api.ts
export const getuser = async ()=> {
    const res = await fetch("/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })

    if (!res.ok) throw new Error("Error fetching users")

    return res.json()

}

export const createUser = async (data: any) => {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error("Error creating user")

  return res.json()
}