XAUUSD COMMAND CENTER — FLUXO DUPLO

1. PREÇO
- Endpoint: Twelve Data /price
- Atualização no site: a cada 60 segundos
- Não chama Gemini
- Não altera o último alerta

2. ANÁLISE VISUAL
- Endpoint: Twelve Data /time_series
- Atualização: a cada 15 minutos
- Atualiza gráfico, tendência, volatilidade e medidores

3. IA / MAKE
- Continua no Make a cada 15 minutos
- Analisa candles no Gemini
- Aplica filtro de confiança
- Envia e-mail quando aprovado

PUBLICAÇÃO NO NETLIFY
1. Envie este ZIP.
2. Vá em Site configuration > Environment variables.
3. Crie TWELVE_DATA_API_KEY.
4. Cole sua chave da Twelve Data.
5. Faça novo deploy.

O bloco do último alerta ainda usa dados demonstrativos até ligarmos o Make ao painel.
