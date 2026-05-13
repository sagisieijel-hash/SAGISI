export default async function Home() {
  // Fetch Pokémon list from PokéAPI
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20",
    {
      cache: "no-store",
    }
  );

  const data = await response.json();

  // Fetch detailed Pokémon data
  const detailedPokemon = await Promise.all(
    data.results.map(async (pokemon: { url: string }) => {
      const res = await fetch(pokemon.url, {
        cache: "no-store",
      });

      return res.json();
    })
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-100 via-white to-slate-200 p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-red-600 uppercase tracking-widest drop-shadow-md">
          Pokédex
        </h1>

        <p className="text-slate-600 mt-4 text-lg">
          Powered by PokéAPI
        </p>
      </div>

      {/* Pokemon Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {detailedPokemon.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white rounded-3xl shadow-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-slate-200"
          >
            {/* Top Card */}
            <div className="bg-red-500 p-5 text-center text-white">
              <p className="font-bold text-sm tracking-wider">
                #{pokemon.id}
              </p>

              <h2 className="text-2xl font-black uppercase mt-1">
                {pokemon.name}
              </h2>
            </div>

            {/* Pokemon Image */}
            <div className="bg-slate-50 flex justify-center items-center py-6">
              <img
                src={
                  pokemon.sprites.other["official-artwork"]
                    .front_default
                }
                alt={pokemon.name}
                className="w-44 h-44 object-contain drop-shadow-xl"
              />
            </div>

            {/* Pokemon Info */}
            <div className="p-5 space-y-4">
              {/* Height & Weight */}
              <div className="grid grid-cols-2 gap-4">
                {/* Height */}
                <div className="bg-blue-100 rounded-2xl p-4 text-center">
                  <p className="text-blue-700 text-sm font-bold uppercase">
                    Height
                  </p>

                  <p className="text-slate-800 text-lg font-semibold mt-1">
                    {pokemon.height}
                  </p>
                </div>

                {/* Weight */}
                <div className="bg-green-100 rounded-2xl p-4 text-center">
                  <p className="text-green-700 text-sm font-bold uppercase">
                    Weight
                  </p>

                  <p className="text-slate-800 text-lg font-semibold mt-1">
                    {pokemon.weight}
                  </p>
                </div>
              </div>

              {/* Pokemon Types */}
              <div className="flex justify-center gap-2 flex-wrap">
                {pokemon.types.map(
                  (type: {
                    type: { name: string };
                  }) => (
                    <span
                      key={type.type.name}
                      className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                    >
                      {type.type.name}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}