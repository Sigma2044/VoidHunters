<!-- In index.html im <head> Bereich -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
  const SUPABASE_URL = "https://twkafxfcfbkpbnorutky.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3a2FmeGZjZmJrcGJub3J1dGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTQzNDYsImV4cCI6MjA4NTIzMDM0Nn0.mwXgxHmJhXWCEliEPZDNzB9Qn0B3-2IScW9qBkoXsgI";

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
