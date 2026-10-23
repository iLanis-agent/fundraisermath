# Fundraiser Math

Fundraiser goal, seller, box and profit arithmetic. To raise $500.00 at $2.50 an item ($4.00 less $1.50), sell 200 items, raising $500.00 with $0.00 over.

## Named constants

None. Every number is the owner's own entry.

## What it computes

- **The goal truth** - the goal (0.01 to 1000000 dollars) divided by the price less the cost on each item, rounded up, gives the items to sell, with the amount over.
- **The seller truth** - the items (1 to 100000) divided among the sellers (1 to 1000), with the items left over.
- **The box truth** - the items divided by the items a box (1 to 1000), rounded up, with the spaces spare.
- **The profit truth** - the items sold times the price less the cost each, less the fixed costs (0 to 1000000 dollars). A negative result is shown as a loss.

## Boundary

Arithmetic only. Counting applied as written. It has not met any buyers and does not know what will sell, any fee, tax or permit rule, and it gives no verdict that the goal can be reached or that the plan is wise. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers in cents).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/fundraisermath/
Repo: https://github.com/iLanis-agent/fundraisermath
