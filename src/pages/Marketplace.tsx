import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Clock, User, Filter, MessageCircle, Shield, ChevronRight } from "lucide-react";
import Layout from "../components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  staggerContainerFast,
  fadeUp,
  fadeLeft,
  fadeRight,
  sectionHeading,
  viewportOnce,
} from "@/lib/animations";

import imgGpu from "@/assets/marketplace-gpu.jpg";
import imgCpu from "@/assets/marketplace-cpu.jpg";
import imgRam from "@/assets/marketplace-ram.jpg";
import imgStorage from "@/assets/marketplace-storage.jpg";
import imgPsu from "@/assets/marketplace-psu.jpg";
import imgCase from "@/assets/marketplace-case.jpg";
import imgMotherboard from "@/assets/marketplace-motherboard.jpg";
import imgCooler from "@/assets/marketplace-cooler.jpg";

const categoryImages: Record<string, string> = {
  GPU: imgGpu, CPU: imgCpu, RAM: imgRam, Storage: imgStorage,
  PSU: imgPsu, Case: imgCase, Motherboard: imgMotherboard, Cooler: imgCooler,
};

interface Listing {
  id: number; title: string; price: number; location: string; condition: string;
  category: string; seller: string; timeAgo: string; description: string; specs: string[];
}

const listings: Listing[] = [
  { id: 1, title: "RTX 3070 Ti 8GB — odlično stanje", price: 35000, location: "Beograd", condition: "Polovno", category: "GPU", seller: "Marko92", timeAgo: "Pre 2h", description: "Grafička karta korišćena 14 meseci, nikada overklokirana. Kutija i garancija prisutni. Perfektna za 1440p gaming.", specs: ["8GB GDDR6X", "256-bit", "TDP 290W", "PCI-E 4.0"] },
  { id: 2, title: "Ryzen 5 5600X sa kutijom", price: 12000, location: "Novi Sad", condition: "Polovno", category: "CPU", seller: "NikolaGamer", timeAgo: "Pre 5h", description: "Procesor u odličnom stanju, korišćen sa stock hladnjakom. Idealan za budget gaming build.", specs: ["6 jezgara / 12 niti", "3.7GHz base / 4.6GHz boost", "AM4 socket", "TDP 65W"] },
  { id: 3, title: "Corsair 32GB DDR4 3200 kit", price: 7500, location: "Niš", condition: "Novo", category: "RAM", seller: "TechShopNS", timeAgo: "Pre 1d", description: "Potpuno nov, neotpakovan kit od 2x16GB. Corsair Vengeance LPX serija sa XMP profilom.", specs: ["2x16GB", "DDR4-3200", "CL16", "1.35V"] },
  { id: 4, title: "Samsung 970 EVO Plus 1TB", price: 8000, location: "Beograd", condition: "Polovno", category: "Storage", seller: "DarkLord", timeAgo: "Pre 3h", description: "NVMe SSD sa 95% health prema CrystalDiskInfo. Brzina čitanja do 3500MB/s.", specs: ["1TB NVMe", "M.2 2280", "3500/3300 MB/s", "TLC NAND"] },
  { id: 5, title: "Corsair RM750x napajanje", price: 9000, location: "Kragujevac", condition: "Novo", category: "PSU", seller: "PCMajstor", timeAgo: "Pre 6h", description: "Potpuno modularno napajanje, 80+ Gold sertifikacija. Idealno za mid-range do high-end buildove.", specs: ["750W", "80+ Gold", "Fully Modular", "135mm ventilator"] },
  { id: 6, title: "NZXT H510 kućište crno", price: 5000, location: "Subotica", condition: "Polovno", category: "Case", seller: "RetroPC", timeAgo: "Pre 12h", description: "Kućište u dobrom stanju, minimalni tragovi korišćenja. Kompaktno ATX kućište sa dobrim cable management-om.", specs: ["ATX Mid-Tower", "Tempered Glass", "2x fan uključena", "USB-C front panel"] },
  { id: 7, title: "MSI B550 Tomahawk matična", price: 11000, location: "Beograd", condition: "Polovno", category: "Motherboard", seller: "Stefan_IT", timeAgo: "Pre 8h", description: "Odlična matična ploča za Ryzen 5000 seriju. VRM odličnog kvaliteta, 2x M.2 slota.", specs: ["AM4 socket", "DDR4", "ATX", "PCIe 4.0"] },
  { id: 8, title: "Noctua NH-D15 hladnjak", price: 7000, location: "Novi Sad", condition: "Kao novo", category: "Cooler", seller: "CoolMax", timeAgo: "Pre 1d", description: "Vrhunski vazdušni hladnjak, korišćen samo mesec dana. Hladi i najjače procesore bez problema.", specs: ["Dual tower", "2x 140mm fan", "TDP do 250W", "165mm visina"] },
  { id: 9, title: "Intel Core i7-12700K", price: 28000, location: "Beograd", condition: "Polovno", category: "CPU", seller: "ProBuilder", timeAgo: "Pre 4h", description: "Moćan procesor za gaming i produktivnost. 12 jezgara hybrid arhitekture.", specs: ["12 jezgara (8P+4E)", "3.6GHz base / 5.0GHz boost", "LGA1700 socket", "TDP 125W"] },
];

const categories = ["Sve", "CPU", "GPU", "RAM", "Motherboard", "Storage", "PSU", "Case", "Cooler"];

const conditionColor: Record<string, string> = {
  "Novo": "text-success bg-success/10",
  "Kao novo": "text-primary bg-primary/10",
  "Polovno": "text-warning bg-warning/10",
};

const cardVariant = (i: number) => (i % 3 === 0 ? fadeLeft : i % 3 === 2 ? fadeRight : fadeUp);

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Sve");
  const [selectedItem, setSelectedItem] = useState<Listing | null>(null);

  const filtered = listings.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "Sve" || l.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={sectionHeading}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-10"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-gradient-primary">Marketplace</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Kupuj i prodaj komponente direktno sa drugim korisnicima. Sigurna C2C razmena.
            </p>
          </motion.div>

          {/* Search and filters */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="glass rounded-xl p-4 mb-6"
          >
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
          </motion.div>

          {/* Listings */}
          <motion.div
            variants={staggerContainerFast}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={cardVariant(i)}
                  layout
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="glass glass-hover rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="h-40 bg-secondary overflow-hidden relative">
                    <motion.img
                      src={categoryImages[item.category]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 text-xs text-primary-foreground bg-primary/80 backdrop-blur-sm px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ChevronRight className="w-3 h-3" /> Detalji
                    </div>
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
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-muted-foreground"
            >
              <p>Nema rezultata za traženu pretragu.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-background border-border">
          {selectedItem && (
            <>
              <div className="relative h-56 sm:h-64">
                <img src={categoryImages[selectedItem.category]} alt={selectedItem.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${conditionColor[selectedItem.condition]}`}>{selectedItem.condition}</span>
                    <span className="text-xs text-muted-foreground bg-secondary/80 backdrop-blur-sm px-2 py-0.5 rounded-full">{selectedItem.category}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">{selectedItem.title}</h2>
                </div>
              </div>
              <div className="p-5 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gradient-primary">{selectedItem.price.toLocaleString("sr-RS")} RSD</span>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{selectedItem.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{selectedItem.timeAgo}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Opis</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedItem.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Specifikacije</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedItem.specs.map((spec, i) => (
                      <div key={i} className="bg-secondary/50 rounded-lg px-3 py-2 text-sm text-foreground">{spec}</div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{selectedItem.seller}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Shield className="w-3 h-3" /> Verifikovan</p>
                    </div>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" /> Poruka
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                      Kontaktiraj
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Marketplace;
