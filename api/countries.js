const countriesUrl = "https://countries.dev/countries?fields=name,flags,region,population,capital";

export default async function handler(request, response) {
  try {
    const upstream = await fetch(countriesUrl, { signal: AbortSignal.timeout(8000) });
    if (!upstream.ok) throw new Error(`Countries API returned ${upstream.status}`);

    const payload = await upstream.json();
    if (!Array.isArray(payload)) throw new Error("Unexpected country payload");
    const countries = payload.map((country) => ({
      name: { common: country.name },
      flags: country.flags,
      region: country.region,
      population: country.population,
      capital: country.capital ? [country.capital] : [],
    }));

    response.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    response.status(200).json(countries);
  } catch (error) {
    console.error("Unable to load countries", error);
    response.status(502).json({ error: "Unable to load countries" });
  }
}
