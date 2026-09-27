const countriesUrl = "https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital";

export default async function handler(request, response) {
  try {
    const upstream = await fetch(countriesUrl, { signal: AbortSignal.timeout(8000) });
    if (!upstream.ok) throw new Error(`Countries API returned ${upstream.status}`);

    const payload = await upstream.json();
    console.log("Country payload shape", { success: payload.success, dataIsArray: Array.isArray(payload.data), dataKeys: payload.data && typeof payload.data === "object" ? Object.keys(payload.data).slice(0, 12) : [], errors: payload.errors });
    const countries = Array.isArray(payload) ? payload : payload.data;
    if (!Array.isArray(countries)) throw new Error("Unexpected country payload");

    response.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    response.status(200).json(countries);
  } catch (error) {
    console.error("Unable to load countries", error);
    response.status(502).json({ error: "Unable to load countries" });
  }
}
