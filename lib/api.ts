export const api = {
  getUser: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
      cache: 'no-store', 
    });
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  },
};
