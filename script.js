<!-- In index.html im <head> Bereich -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
  const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
  const SUPABASE_KEY = "YOUR_ANON_KEY";

  const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const menuBtn = document.getElementById("menuBtn");
  const menuOverlay = document.getElementById("menuOverlay");

  menuBtn.onclick = () => menuOverlay.style.display = "block";
  menuOverlay.onclick = () => menuOverlay.style.display = "none";

  async function loadShops() {
    const { data: shops, error } = await db
      .from("VoidHunters2")
      .select("*")
      .order("id", { ascending: true });

    const shopList = document.getElementById("shopList");
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

  document.getElementById("addShop").onclick = async () => {
    const name = document.getElementById("shopName").value;
    const owner = document.getElementById("shopOwner").value;
    const coords = document.getElementById("shopCoords").value;

    if (!name || !owner || !coords) {
      alert("Bitte alles ausfüllen!");
      return;
    }

    await db.from("VoidHunters2").insert([{ name, owner, coords }]);
    loadShops();
  };

  loadShops();
</script>
