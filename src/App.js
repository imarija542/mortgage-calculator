import { useState } from "react";
import "./App.css";
import ilustracijaPrazno from "./assets/illustration-empty.svg";
import iconCalculator from "./assets/icon-calculator.svg";

export default function App() {
  const [iznos, setIznos] = useState("");
  const [rok, setRok] = useState("");
  const [kamata, setKamata] = useState("");
  const [tip, setTip] = useState("");
  const [rezultati, setRezultati] = useState(null);
  const [greske, setGreske] = useState({});

  const izracunaj = (e) => {
    e.preventDefault();
    let noveGreske = {};

    if (!iznos) noveGreske.iznos = "This field is required";
    if (!rok) noveGreske.rok = "This field is required";
    if (!kamata) noveGreske.kamata = "This field is required";
    if (!tip) noveGreske.tip = "This field is required";

    if (Object.keys(noveGreske).length > 0) {
      setGreske(noveGreske);
      setRezultati(null);
      return;
    }

    const P = parseFloat(iznos);
    const r = parseFloat(kamata) / 100 / 12;
    const n = parseInt(rok) * 12;

    let mjesecnaRata;
    if (tip === "repayment") {
      mjesecnaRata = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    } else {
      mjesecnaRata = P * r;
    }

    const ukupno = mjesecnaRata * n;

    setRezultati({
      rata: mjesecnaRata.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      ukupno: ukupno.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    });
    setGreske({});
  };

  const ocistiSve = () => {
    setIznos("");
    setRok("");
    setKamata("");
    setTip("");
    setRezultati(null);
    setGreske({});
  };

  return (
    <div className="container">
      <main className="calculator-card">
        <div className="form-section">
          <div className="form-header">
            <h1>Mortgage Calculator</h1>
            <button type="button" className="clear-btn" onClick={ocistiSve}>
              Clear All
            </button>
          </div>

          <form onSubmit={izracunaj}>
            <div className="input-block">
              <label>Mortgage Amount</label>
              <div className={`input-group ${greske.iznos ? "error" : ""}`}>
                <span className="symbol">£</span>
                <input
                  type="number"
                  value={iznos}
                  onChange={(e) => setIznos(e.target.value)}
                />
              </div>
              {greske.iznos && <p className="error-text">{greske.iznos}</p>}
            </div>

            <div className="row">
              <div className="input-block">
                <label>Mortgage Term</label>
                <div
                  className={`input-group reverse ${greske.rok ? "error" : ""}`}
                >
                  <input
                    type="number"
                    value={rok}
                    onChange={(e) => setRok(e.target.value)}
                  />
                  <span className="symbol">years</span>
                </div>
                {greske.rok && <p className="error-text">{greske.rok}</p>}
              </div>

              <div className="input-block">
                <label>Interest Rate</label>
                <div
                  className={`input-group reverse ${greske.kamata ? "error" : ""}`}
                >
                  <input
                    type="number"
                    step="0.01"
                    value={kamata}
                    onChange={(e) => setKamata(e.target.value)}
                  />
                  <span className="symbol">%</span>
                </div>
                {greske.kamata && <p className="error-text">{greske.kamata}</p>}
              </div>
            </div>

            <div className="input-block">
              <label>Mortgage Type</label>
              <div
                className={`radio-group ${tip === "repayment" ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  id="rep"
                  name="m-type"
                  value="repayment"
                  checked={tip === "repayment"}
                  onChange={(e) => setTip(e.target.value)}
                />
                <label htmlFor="rep">Repayment</label>
              </div>
              <div
                className={`radio-group ${tip === "interest-only" ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  id="io"
                  name="m-type"
                  value="interest-only"
                  checked={tip === "interest-only"}
                  onChange={(e) => setTip(e.target.value)}
                />
                <label htmlFor="io">Interest Only</label>
              </div>
              {greske.tip && <p className="error-text">{greske.tip}</p>}
            </div>

            <button type="submit" className="submit-btn">
              <img src={iconCalculator} alt="" />
              Calculate Repayments
            </button>
          </form>
        </div>

        <div className="results-section">
          {!rezultati ? (
            <div className="empty-state">
              <img src={ilustracijaPrazno} alt="" className="empty-img" />
              <h2>Results shown here</h2>
              <p>
                Complete the form and click "calculate repayments" to see what
                your monthly repayments would be.
              </p>
            </div>
          ) : (
            <div className="filled-state">
              <h2>Your results</h2>
              <p>
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click
                "calculate repayments" again.
              </p>
              <div className="result-display">
                <div className="monthly">
                  <span>Your monthly repayments</span>
                  <div className="price-big">£{rezultati.rata}</div>
                </div>
                <hr />
                <div className="total">
                  <span>Total you'll repay over the term</span>
                  <div className="price-small">£{rezultati.ukupno}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
