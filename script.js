(function () {
  "use strict";

  let pool = [];
  let sorteados = [];

  const singleInput = document.getElementById("single-input");
  const bulkInput = document.getElementById("bulk-input");
  const poolCount = document.getElementById("pool-count");
  const poolDisplay = document.getElementById("pool-display");
  const btnSort = document.getElementById("btn-sort");
  const resultBox = document.getElementById("result-box");
  const sorteadosList = document.getElementById("sorteados-list");

  function norm(raw) {
    let s = raw.trim();
    if (!s) return "";
    if (!s.startsWith("@")) s = "@" + s;
    return s;
  }

  function existsInPool(value) {
    const lower = value.toLowerCase();
    return pool.some((p) => p.toLowerCase() === lower);
  }

  function addSingle() {
    const value = norm(singleInput.value);
    if (!value) return;
    if (!existsInPool(value)) pool.push(value);
    singleInput.value = "";
    singleInput.focus();
    render();
  }

  function addBulk() {
    bulkInput.value
      .split("\n")
      .map(norm)
      .filter(Boolean)
      .forEach((name) => {
        if (!existsInPool(name)) pool.push(name);
      });
    bulkInput.value = "";
    render();
  }

  function removeFromPool(index) {
    pool.splice(index, 1);
    render();
  }

  function clearPool() {
    pool = [];
    render();
  }

  function removeSorteado(index) {
    sorteados.splice(index, 1);
    renderSorteados();
  }

  function sortear() {
    if (!pool.length) return;
    const idx = Math.floor(Math.random() * pool.length);
    const chosen = pool.splice(idx, 1)[0];
    sorteados.unshift(chosen);

    resultBox.innerHTML = "";
    const label = document.createElement("span");
    label.className = "s-result-label";
    label.textContent = "🎉 Sorteado!";
    const name = document.createElement("span");
    name.className = "s-result-at";
    name.textContent = chosen;
    resultBox.append(label, name);

    render();
  }

  function render() {
    poolCount.textContent = "(" + pool.length + ")";
    btnSort.disabled = pool.length === 0;

    poolDisplay.innerHTML = "";
    if (!pool.length) {
      const empty = document.createElement("span");
      empty.className = "s-empty";
      empty.textContent = "Nenhum participante ainda";
      poolDisplay.appendChild(empty);
    } else {
      pool.forEach((name, i) => {
        const chip = document.createElement("div");
        chip.className = "s-chip";

        const icon = document.createElement("i");
        icon.className = "ti ti-user";
        icon.setAttribute("aria-hidden", "true");
        icon.style.fontSize = "13px";

        const label = document.createElement("span");
        label.textContent = name;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.title = "Remover " + name;
        removeBtn.setAttribute("aria-label", "Remover " + name);
        removeBtn.textContent = "×";
        removeBtn.addEventListener("click", () => removeFromPool(i));

        chip.append(icon, label, removeBtn);
        poolDisplay.appendChild(chip);
      });
    }

    renderSorteados();
  }

  function renderSorteados() {
    sorteadosList.innerHTML = "";
    if (!sorteados.length) {
      const empty = document.createElement("div");
      empty.className = "s-empty-side";
      empty.textContent = "Nenhum ainda";
      sorteadosList.appendChild(empty);
      return;
    }

    sorteados.forEach((name, i) => {
      const item = document.createElement("div");
      item.className = "s-sorteado-item";

      const num = document.createElement("span");
      num.className = "s-num";
      num.textContent = "#" + (i + 1);

      const label = document.createElement("span");
      label.style.flex = "1";
      label.style.margin = "0 6px";
      label.style.fontWeight = "600";
      label.textContent = name;

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "s-rm";
      removeBtn.title = "Remover " + name;
      removeBtn.setAttribute("aria-label", "Remover " + name + " da lista de sorteados");
      removeBtn.textContent = "×";
      removeBtn.addEventListener("click", () => removeSorteado(i));

      item.append(num, label, removeBtn);
      sorteadosList.appendChild(item);
    });
  }

  document.getElementById("btn-add-single").addEventListener("click", addSingle);
  document.getElementById("btn-add-bulk").addEventListener("click", addBulk);
  document.getElementById("btn-clear-pool").addEventListener("click", clearPool);
  btnSort.addEventListener("click", sortear);

  singleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSingle();
    }
  });

  render();
})();
