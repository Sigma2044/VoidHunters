const menuBtn = document.getElementById("menuBtn");
const menuOverlay = document.getElementById("menuOverlay");

menuBtn.onclick = () => menuOverlay.style.display = "block";
menuOverlay.onclick = () => menuOverlay.style.display = "none";

const shopList = document.getElementById("shopList");
const addShopBtn = document.getElementById("addShop");

function loadShops() {
  const shops = JSON.parse(localStorage.getItem("shops") || "[]");
  shopList.innerHTML = "";
  shops.forEach(shop => {
    const div = document.createElement("div");
    div.className = "shop-card";
    div.innerHTML = `
      <strong>${shop.name}</strong><br>
      Besitzer: ${shop.owner}<br>
      Ort: ${shop.coords}
    `;
    shopList.appendChild(div);
  });
}

addShopBtn.onclick = () => {
  const name = document.getElementById("shopName").value;
  const owner = document.getElementById("shopOwner").value;
  const coords = document.getElementById("shopCoords").value;

  if (!name || !owner || !coords) return alert("Bitte alles ausfüllen!");

  const shops = JSON.parse(localStorage.getItem("shops") || "[]");
  shops.push({ name, owner, coords });
  localStorage.setItem("shops", JSON.stringify(shops));

  loadShops();
};

loadShops();
