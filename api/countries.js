const countriesUrl =
  "https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital";

export default async function handler(request, response) {
  try {
    const upstream = await fetch(countriesUrl, {
      signal: AbortSignal.timeout(12000),
    });

    if (!upstream.ok) {
      throw new Error(`Countries API returned ${upstream.status}`);
    }

    const countries = await upstream.json();
    response.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    response.status(200).json(countries);
  } catch (error) {
    console.error("Unable to load countries", error);
    response.status(502).json({ error: "Unable to load countries" });
  }
}
