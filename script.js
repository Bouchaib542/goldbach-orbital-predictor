function loglog(x) {
  return Math.log(Math.log(x));
}

// Test simple de primalité (adapté aux petits E <= 10^6)
function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  const sqrt = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= sqrt; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function predictGap() {
  const input = document.getElementById("inputE").value;
  const E = Number(input);

  if (isNaN(E) || E <= 2 || E % 2 !== 0) {
    alert("Please enter a valid even number greater than 2.");
    return;
  }

  // Calcul de la prédiction brute
  const sqrtE = Math.sqrt(E);
  const logE = Math.log(E);
  const loglogE = loglog(E);

  const delta_pred = sqrtE * (loglogE / logE);

  // Correction (fonction de dérive simulée)
  const oscillation = 1 + 0.01 * Math.sin(logE);
  const delta_corr = delta_pred * oscillation;

  // Affichage des valeurs
  document.getElementById("predicted").textContent = delta_pred.toFixed(10);
  document.getElementById("corrected").textContent = delta_corr.toFixed(10);

  // Recherche du noyau orbital autour de p = E - δ_corrigée
  const centerP = Math.round(E - delta_corr);
  const rayon = Math.ceil(delta_corr / 2);
  const minP = centerP - rayon;
  const maxP = centerP + rayon;

  const pairList = document.getElementById("pairList");
  pairList.innerHTML = "";

  let found = 0;
  for (let p = minP; p <= maxP; p++) {
    const q = E - p;
    if (isPrime(p) && isPrime(q)) {
      const li = document.createElement("li");
      li.textContent = `p = ${p}, q = ${q}`;
      pairList.appendChild(li);
      found++;
    }
  }

  if (found === 0) {
    const li = document.createElement("li");
    li.textContent = "No valid (p, q) found in the predicted orbital range.";
    pairList.appendChild(li);
  }
}
