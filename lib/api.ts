export const api = {
  getUser: async () => {
    const res = await fetch(`${process.env.next_public_base_url}/api/users`, {
      cache: 'no-store', 
    });
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  },
};
