export default async function fetchWord(slug = "") {
  try {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://watbetekent.vercel.app/api"
        : "http://localhost:3000/api";

    const url = `${apiUrl}/words${slug ? `/${slug}` : ""}`;
    console.log("Fetching from:", url);

    const res = await fetch(url, {
      method: "GET",
      next: {
        revalidate: 3600, // Cache for 1 hour instead of no-store
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} - ${res.statusText}`);
      return []; // Return empty array instead of null
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("FetchWord error:", error);
    return []; // Return empty array instead of null
  }
}
