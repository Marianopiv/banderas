const countriesUrl =
  "https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital";

export default async function handler(request, response) {
  try {
    const upstream = await fetch(countriesUrl, {
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) {
      throw new Error(`Countries API returned ${upstream.status}`);
    }

    const countries = await upstream.json();
    console.log("Country payload", {
      isArray: Array.isArray(countries),
      keys: Object.keys(countries).slice(0, 8),
    });
    if (!Array.isArray(countries)) {
      throw new Error("Countries API returned an unexpected response");
    }

    response.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    response.status(200).json(countries);
  } catch (error) {
    console.error("Unable to load countries", error);
    response.status(502).json({ error: "Unable to load countries" });
  }
}
