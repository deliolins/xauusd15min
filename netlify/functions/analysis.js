exports.handler = async function () {
  const apiKey = process.env.TWELVE_DATA_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "A variável TWELVE_DATA_API_KEY não foi configurada."
      })
    };
  }

  const params = new URLSearchParams({
    symbol: "XAU/USD",
    interval: "15min",
    outputsize: "40",
    apikey: apiKey
  });

  try {
    const response = await fetch(
      "https://api.twelvedata.com/time_series?" + params.toString(),
      { headers: { "Accept": "application/json" } }
    );

    const data = await response.json();

    if (!response.ok || data.status === "error") {
      return {
        statusCode: response.status || 502,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        },
        body: JSON.stringify({
          message: data.message || "Erro ao consultar os candles."
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=840"
      },
      body: JSON.stringify({
        symbol: data.meta?.symbol || "XAU/USD",
        interval: data.meta?.interval || "15min",
        values: data.values || []
      })
    };
  } catch {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Não foi possível conectar à API de candles."
      })
    };
  }
};
