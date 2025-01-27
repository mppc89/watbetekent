export default async function fetchWord(slug = "") {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/words${slug ? `/${slug}` : ""}`;
    console.log("Fetching from:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} - ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("FetchWord error:", error);
    return [];
  }
}
