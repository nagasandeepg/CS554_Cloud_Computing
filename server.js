const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));

app.get('/convert', (req, res) => {
  const raw = req.query.lbs;
  const lbs = Number(raw);

  // Case 4 & 6: missing or NaN
  if (raw === undefined || Number.isNaN(lbs)) {
    return res.status(400).json({ error: 'Query param lbs is required and must be a number' });
  }

  // Case 5: negative
  if (lbs < 0) {
    return res.status(422).json({ error: 'lbs must be a non-negative, finite number' });
  }

  // Extra guard: Infinity
  if (!Number.isFinite(lbs)) {
    return res.status(400).json({ error: 'lbs must be finite' });
  }

  // Happy / Typical / Edge cases
  const kg = Math.round(lbs * 0.45359237 * 1000) / 1000; // 3 decimals
  return res.json({
    lbs,
    kg,
    formula: 'kg = lbs * 0.45359237'
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
