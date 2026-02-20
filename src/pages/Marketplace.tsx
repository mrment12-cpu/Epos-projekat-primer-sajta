import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Tag, Clock, User, Filter } from "lucide-react";
import Layout from "../components/Layout";

interface Listing {
  id: number;
  title: string;
  price: number;
  location: string;
  condition: string;
  category: string;
  seller: string;
  timeAgo: string;
  image?: string;
}

const listings: Listing[] = [
  { id: 1, title: "RTX 3070 Ti 8GB — odlično stanje", price: 35000, location: "Beograd", condition: "Polovno", category: "GPU", seller: "Marko92", timeAgo: "Pre 2h" },
  { id: 2, title: "Ryzen 5 5600X sa kutijom", price: 12000, location: "Novi Sad", condition: "Polovno", category: "CPU", seller: "NikolaGamer", timeAgo: "Pre 5h" },
  { id: 3, title: "Corsair 32GB DDR4 3200 kit", price: 7500, location: "Niš", condition: "Novo", category: "RAM", seller: "TechShopNS", timeAgo: "Pre 1d" },
  { id: 4, title: "Samsung 970 EVO Plus 1TB", price: 8000, location: "Beograd", condition: "Polovno", category: "Storage", seller: "DarkLord", timeAgo: "Pre 3h" },
  { id: 5, title: "Corsair RM750x napajanje", price: 9000, location: "Kragujevac", condition: "Novo", category: "PSU", seller: "PCMajstor", timeAgo: "Pre 6h" },
  { id: 6, title: "NZXT H510 kućište crno", price: 5000, location: "Subotica", condition: "Polovno", category: "Case", seller: "RetroPC", timeAgo: "Pre 12h" },
  { id: 7, title: "MSI B550 Tomahawk matična", price: 11000, location: "Beograd", condition: "Polovno", category: "Motherboard", seller: "Stefan_IT", timeAgo: "Pre 8h" },
  { id: 8, title: "Noctua NH-D15 hladnjak", price: 7000, location: "Novi Sad", condition: "Kao novo", category: "Cooler", seller: "CoolMax", timeAgo: "Pre 1d" },
  { id: 9, title: "Intel Core i7-12700K", price: 28000, location: "Beograd", condition: "Polovno", category: "CPU", seller: "ProBuilder", timeAgo: "Pre 4h" },
];

const categories = ["Sve", "CPU", "GPU", "RAM", "Motherboard", "Storage", "PSU", "Case", "Cooler"];

const conditionColor: Record<string, string> = {
  "Novo": "text-success bg-success/10",
  "Kao novo": "text-primary bg-primary/10",
  "Polovno": "text-warning bg-warning/10",
};

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Sve");

  const filtered = listings.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "Sve" || l.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-gradient-primary">Marketplace</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Kupuj i prodaj komponente direktno sa drugim korisnicima. Sigurna C2C razmena.
            </p>
          </motion.div>

          {/* Search and filters */}
          <div className="glass rounded-xl p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Pretraži komponente..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary text-foreground text-sm border border-border/50 focus:border-primary/50 focus:outline-none transition-colors placeholder:text-muted-foreground"
                />
              </div>
              <button className="sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
                <Filter className="w-4 h-4" /> Filtriraj
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "bg-secondary text-muted-foreground hover:text-foreground border border-transparent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass glass-hover rounded-xl overflow-hidden cursor-pointer"
              >
                <div className="h-32 bg-secondary flex items-center justify-center">
                  <Tag className="w-8 h-8 text-muted-foreground/30" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${conditionColor[item.condition] || "text-muted-foreground bg-muted"}`}>
                      {item.condition}
                    </span>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{item.category}</span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-lg font-bold text-gradient-primary">{item.price.toLocaleString("sr-RS")} RSD</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{item.location}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{item.seller}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.timeAgo}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p>Nema rezultata za traženu pretragu.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Marketplace;
