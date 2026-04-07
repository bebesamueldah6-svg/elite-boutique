"use client";
import { useState } from "react";

const produits = [
  { id: 1, nom: "Robe Kente Moderne", cat: "Femme", prix: 89000, icon: "👗", tag: "Nouveau" },
  { id: 2, nom: "Blazer Wax Premium", cat: "Femme", prix: 125000, icon: "🧥", tag: "Best Seller" },
  { id: 3, nom: "Ensemble Bogolan", cat: "Femme", prix: 78000, icon: "👘", tag: null },
  { id: 4, nom: "Chemise Adinkra", cat: "Homme", prix: 45000, icon: "👔", tag: "Nouveau" },
  { id: 5, nom: "Costume Bazin Riche", cat: "Homme", prix: 185000, icon: "🤵", tag: "Exclusif" },
  { id: 6, nom: "Pantalon Dashiki", cat: "Homme", prix: 55000, icon: "👖", tag: null },
  { id: 7, nom: "Sac Cuir Artisanal", cat: "Accessoires", prix: 65000, icon: "👜", tag: "Nouveau" },
  { id: 8, nom: "Collier Perles Or", cat: "Accessoires", prix: 28000, icon: "📿", tag: null },
  { id: 9, nom: "Écharpe Kente Soie", cat: "Accessoires", prix: 22000, icon: "🧣", tag: "Best Seller" },
];

const fmt = (p: number) => p.toLocaleString("fr-CI") + " FCFA";

type Produit = typeof produits[0];

export default function Home() {
  const [filtre, setFiltre] = useState("Tous");
  const [panier, setPanier] = useState<(Produit & { qte: number })[]>([]);
  const [panierOuvert, setPanierOuvert] = useState(false);
  const [toast, setToast] = useState("");

  const categories = ["Tous", "Femme", "Homme", "Accessoires"];
  const produitsFiltres = filtre === "Tous" ? produits : produits.filter((p) => p.cat === filtre);
  const totalPanier = panier.reduce((s, p) => s + p.qte, 0);
  const totalPrix = panier.reduce((s, p) => s + p.prix * p.qte, 0);

  const afficherToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const ajouterAuPanier = (produit: Produit) => {
    setPanier((prev) => {
      const existant = prev.find((p) => p.id === produit.id);
      if (existant) return prev.map((p) => p.id === produit.id ? { ...p, qte: p.qte + 1 } : p);
      return [...prev, { ...produit, qte: 1 }];
    });
    afficherToast(`${produit.nom} ajouté au panier !`);
    setPanierOuvert(true);
  };

  const changerQte = (id: number, delta: number) => {
    setPanier((prev) =>
      prev.map((p) => p.id === id ? { ...p, qte: p.qte + delta } : p).filter((p) => p.qte > 0)
    );
  };

  return (
    <main className="min-h-screen bg-white">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="font-serif text-2xl tracking-widest">ÉLITE</div>
        <div className="flex gap-6 text-sm text-gray-500 uppercase tracking-widest">
          {categories.slice(1).map((cat) => (
            <button key={cat} onClick={() => setFiltre(cat)} className={`hover:text-black transition-colors ${filtre === cat ? "text-black font-medium" : ""}`}>
              {cat}
            </button>
          ))}
        </div>
        <button onClick={() => setPanierOuvert(!panierOuvert)} className="text-sm uppercase tracking-widest border border-gray-200 px-4 py-2 hover:bg-gray-50 relative">
          Panier ({totalPanier})
        </button>
      </nav>

      {/* HERO */}
      <section className="text-center py-20 px-8 border-b border-gray-100">
        <p className="text-xs tracking-widest uppercase text-amber-600 mb-4">Nouvelle Collection 2025</p>
        <h1 className="font-serif text-5xl font-normal mb-6 leading-tight">L&apos;Art du Style<br />Redéfini</h1>
        <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
          Mode africaine rencontre élégance contemporaine. Des pièces uniques pour un vestiaire d&apos;exception.
        </p>
        <button onClick={() => setFiltre("Tous")} className="bg-black text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-amber-700 transition-colors">
          Découvrir →
        </button>
      </section>

      {/* FILTRES */}
      <div className="flex gap-3 px-8 py-4 border-b border-gray-100 flex-wrap">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setFiltre(cat)}
            className={`px-4 py-1.5 text-xs uppercase tracking-widest border transition-colors ${
              filtre === cat ? "bg-black text-white border-black" : "border-gray-200 text-gray-500 hover:border-gray-400"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="flex">
        {/* GRILLE PRODUITS */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-10">
            {produitsFiltres.map((p) => (
              <div key={p.id} className="group cursor-pointer">
                <div className="bg-gray-50 aspect-[3/4] flex items-center justify-center text-7xl mb-4 border border-gray-100 relative overflow-hidden">
                  {p.icon}
                  {p.tag && (
                    <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs px-2 py-1 uppercase tracking-widest">
                      {p.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{p.cat}</p>
                <p className="font-serif text-lg mb-2">{p.nom}</p>
                <p className="text-amber-700 font-medium mb-3">{fmt(p.prix)}</p>
                <button onClick={() => ajouterAuPanier(p)}
                  className="w-full border border-gray-200 py-2 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                  + Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PANIER LATÉRAL */}
        {panierOuvert && (
          <div className="w-80 border-l border-gray-100 flex flex-col sticky top-16 h-screen">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-serif text-lg">Mon Panier</h2>
              <button onClick={() => setPanierOuvert(false)} className="text-gray-400 hover:text-black text-xl">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {panier.length === 0 ? (
                <p className="text-gray-400 text-sm text-center mt-8">Votre panier est vide</p>
              ) : (
                panier.map((item) => (
                  <div key={item.id} className="flex gap-3 py-4 border-b border-gray-100">
                    <div className="w-14 h-18 bg-gray-50 flex items-center justify-center text-2xl flex-shrink-0 border border-gray-100">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-serif text-sm mb-1">{item.nom}</p>
                      <p className="text-amber-700 text-xs mb-2">{fmt(item.prix)}</p>
                      <div className="flex items-center gap-2">
                        <button onClick={() => changerQte(item.id, -1)} className="w-6 h-6 border border-gray-200 text-sm hover:bg-gray-50">−</button>
                        <span className="text-sm w-4 text-center">{item.qte}</span>
                        <button onClick={() => changerQte(item.id, 1)} className="w-6 h-6 border border-gray-200 text-sm hover:bg-gray-50">+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {panier.length > 0 && (
              <div className="p-5 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Sous-total</span>
                  <span className="font-medium">{fmt(totalPrix)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mb-4">
                  <span>Livraison Abidjan</span>
                  <span>2 000 FCFA</span>
                </div>
                <button className="w-full bg-black text-white py-3 text-xs uppercase tracking-widest hover:bg-amber-700 transition-colors">
                  Commander →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 text-sm z-50 rounded">
          {toast}
        </div>
      )}
    </main>
  );
}
