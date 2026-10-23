// Fundraiser Math engine: the items to sell for a goal, the share each seller takes, the boxes, and the profit. Exact integers, half-up on display only. No named constants; every number is the owner's own entry.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _pl(n, one, many) { return n + (n === 1 ? one : many); }
var _GOAL = "the goal must be from 0.01 to 1000000 dollars with at most two decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
var _COST = "the cost must be from 0.01 to 10000 dollars with at most two decimal places";
var _FIX = "the fixed costs must be from 0 to 1000000 dollars with at most two decimal places";
var _MORE = "the price must be more than the cost";
var _IT = "the items must be from 1 to 100000 with no decimal places";
var _SE = "the sellers must be from 1 to 1000 with no decimal places";
var _BX = "the items a box must be from 1 to 1000 with no decimal places";
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }

function unitsTruth(goal, price, cost) {
  var g = _p(goal, _GOAL, 7, 2, 1, 100000000), p = _p(price, _PRICE, 5, 2, 1, 1000000), c = _p(cost, _COST, 5, 2, 1, 1000000);
  if (p <= c) throw new Error(_MORE);
  var m = p - c, n = Math.floor((g + m - 1) / m), raised = n * m;
  return "To raise $" + _money(g) + " at $" + _money(m) + " an item ($" + _money(p) + " less $" + _money(c) + "), sell " + _pl(n, " item", " items") + ", raising $" + _money(raised) + " with $" + _money(raised - g) + " over.";
}
function splitTruth(items, sellers) {
  var n = _i(items, _IT, 6, 1, 100000), s = _i(sellers, _SE, 4, 1, 1000);
  return "The " + _pl(n, " item", " items") + " shared among " + _pl(s, " seller", " sellers") + " is " + Math.floor(n / s) + " each, with " + (n % s) + " left over.";
}
function boxTruth(items, per) {
  var n = _i(items, _IT, 6, 1, 100000), p = _i(per, _BX, 4, 1, 1000);
  var k = Math.floor((n + p - 1) / p), left = k * p - n;
  return "The " + _pl(n, " item", " items") + " in boxes of " + p + " take " + _pl(k, " box", " boxes") + ", leaving " + _pl(left, " space", " spaces") + " spare.";
}
function profitTruth(sold, price, cost, fixed) {
  var n = _i(sold, _IT, 6, 1, 100000), p = _p(price, _PRICE, 5, 2, 1, 1000000), c = _p(cost, _COST, 5, 2, 1, 1000000), f = _p(fixed, _FIX, 7, 2, 0, 100000000);
  var t = n * p - n * c - f;
  var tail = t < 0 ? "a loss of $" + _money(-t) : "$" + _money(t);
  return "The " + _pl(n, " item", " items") + " at $" + _money(p) + " with $" + _money(c) + " cost each and $" + _money(f) + " fixed costs leave " + tail + ".";
}
