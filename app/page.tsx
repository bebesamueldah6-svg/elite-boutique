export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="font-serif text-2xl tracking-widest">ÉLITE</div>
        <div className="flex gap-6 text-sm text-gray-500 uppercase tracking-widest">
          <a href="#" className="hover:text-black">Femme</a>
          <a href="#" className="hover:text-black">Homme</a>
          <a href="#" className="hover:text-black">Accessoires</a>
        </div>
        <button className="text-sm uppercase tracking-widest border border-gray-200 px-4 py-2 hover:bg-gray-50">
          Panier (0)
        </button>
      </nav>

      <section className="text-center py-24 px-8 border-b border-gray-100">
        <p className="text-xs tracking-widest uppercase text-amber-600 mb-4">Nouvelle Collection 2025</p>
        <h1 className="font-serif text-5xl font-normal mb-6">L'Art du Style<br/>Redéfini</h1>
        <p className="text-gray-500 max-w-md mx-auto mb-8">Mode africaine rencontre élégance contemporaine.</p>
        <button className="bg-black text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-amber-700">
          Découvrir →
        </button>
      </section>

      <section className="grid grid-cols-3 gap-8 px-8 py-12">
        {[
          { nom: "Robe Kente Moderne", cat: "Femme", prix: "89 000 FCFA", icon: "👗" },
          { nom: "Blazer Wax Premium", cat: "Femme", prix: "125 000 FCFA", icon: "🧥" },
          { nom: "Costume Bazin Riche", cat: "Homme", prix: "185 000 FCFA", icon: "🤵" },
        ].map((p, i) => (
          <div key={i} className="cursor-pointer group">
            <div className="bg-gray-50 aspect-[3/4] flex items-center justify-center text-6xl mb-4 border border-gray-100">
              {p.icon}
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{p.cat}</p>
            <p className="font-serif text-lg mb-2">{p.nom}</p>
            <p className="text-amber-700 font-medium mb-3">{p.prix}</p>
            <button className="w-full border border-gray-200 py-2 text-xs uppercase tracking-widest hover:bg-black hover:text-white">
              + Ajouter
            </button>
          </div>
        ))}
      </section>
    </main>
  )
}