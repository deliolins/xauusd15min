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
    apikey: apiKey
  });

  try {
    const response = await fetch(
      "https://api.twelvedata.com/price?" + params.toString(),
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
          message: data.message || "Erro ao consultar o preço."
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=45"
      },
      body: JSON.stringify({ price: data.price })
    };
  } catch {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Não foi possível conectar à API de preço."
      })
    };
  }
};
