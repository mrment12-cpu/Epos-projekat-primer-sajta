import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertTriangle, Wrench, Cpu, HardDrive, MonitorSpeaker, Fan, Battery, Box } from "lucide-react";
import Layout from "../components/Layout";

type Ecosystem = "intel" | "amd" | null;
type Category = "cpu" | "gpu" | "ram" | "motherboard" | "storage" | "psu" | "case" | "cooler";

interface Component {
  id: string;
  name: string;
  category: Category;
  ecosystem: Ecosystem | "both";
  price: number;
  socket?: string;
  tdp?: number;
  formFactor?: string;
  ramType?: string;
}

const components: Component[] = [
  // Intel CPUs
  { id: "i5-13400f", name: "Intel Core i5-13400F", category: "cpu", ecosystem: "intel", price: 22000, socket: "LGA1700", tdp: 148 },
  { id: "i7-13700k", name: "Intel Core i7-13700K", category: "cpu", ecosystem: "intel", price: 42000, socket: "LGA1700", tdp: 253 },
  { id: "i9-14900k", name: "Intel Core i9-14900K", category: "cpu", ecosystem: "intel", price: 65000, socket: "LGA1700", tdp: 253 },
  // AMD CPUs
  { id: "r5-7600", name: "AMD Ryzen 5 7600", category: "cpu", ecosystem: "amd", price: 24000, socket: "AM5", tdp: 65 },
  { id: "r7-7700x", name: "AMD Ryzen 7 7700X", category: "cpu", ecosystem: "amd", price: 38000, socket: "AM5", tdp: 105 },
  { id: "r9-7950x", name: "AMD Ryzen 9 7950X", category: "cpu", ecosystem: "amd", price: 60000, socket: "AM5", tdp: 170 },
  // Motherboards Intel
  { id: "b660m", name: "MSI PRO B660M-A", category: "motherboard", ecosystem: "intel", price: 14000, socket: "LGA1700", formFactor: "mATX", ramType: "DDR4" },
  { id: "z690", name: "ASUS ROG Strix Z690-A", category: "motherboard", ecosystem: "intel", price: 32000, socket: "LGA1700", formFactor: "ATX", ramType: "DDR5" },
  // Motherboards AMD
  { id: "b650m", name: "Gigabyte B650M DS3H", category: "motherboard", ecosystem: "amd", price: 16000, socket: "AM5", formFactor: "mATX", ramType: "DDR5" },
  { id: "x670e", name: "ASUS ROG Crosshair X670E", category: "motherboard", ecosystem: "amd", price: 45000, socket: "AM5", formFactor: "ATX", ramType: "DDR5" },
  // GPUs
  { id: "rtx4060", name: "NVIDIA RTX 4060 8GB", category: "gpu", ecosystem: "both", price: 38000, tdp: 115 },
  { id: "rtx4070", name: "NVIDIA RTX 4070 12GB", category: "gpu", ecosystem: "both", price: 62000, tdp: 200 },
  { id: "rx7800xt", name: "AMD RX 7800 XT 16GB", category: "gpu", ecosystem: "both", price: 55000, tdp: 263 },
  { id: "rtx4080", name: "NVIDIA RTX 4080 16GB", category: "gpu", ecosystem: "both", price: 130000, tdp: 320 },
  // RAM
  { id: "ddr4-16", name: "Corsair 16GB DDR4 3200MHz", category: "ram", ecosystem: "both", price: 5500, ramType: "DDR4" },
  { id: "ddr4-32", name: "Kingston 32GB DDR4 3600MHz", category: "ram", ecosystem: "both", price: 10000, ramType: "DDR4" },
  { id: "ddr5-16", name: "G.Skill 16GB DDR5 5600MHz", category: "ram", ecosystem: "both", price: 8000, ramType: "DDR5" },
  { id: "ddr5-32", name: "Corsair 32GB DDR5 6000MHz", category: "ram", ecosystem: "both", price: 15000, ramType: "DDR5" },
  // Storage
  { id: "ssd-500", name: "Samsung 970 EVO 500GB NVMe", category: "storage", ecosystem: "both", price: 6000 },
  { id: "ssd-1tb", name: "WD Black SN770 1TB NVMe", category: "storage", ecosystem: "both", price: 10000 },
  { id: "ssd-2tb", name: "Samsung 980 PRO 2TB NVMe", category: "storage", ecosystem: "both", price: 22000 },
  // PSU
  { id: "psu-550", name: "Corsair RM550x 550W 80+ Gold", category: "psu", ecosystem: "both", price: 9000, tdp: 550 },
  { id: "psu-750", name: "EVGA 750W 80+ Gold", category: "psu", ecosystem: "both", price: 12000, tdp: 750 },
  { id: "psu-850", name: "Seasonic 850W 80+ Gold", category: "psu", ecosystem: "both", price: 16000, tdp: 850 },
  // Cases
  { id: "case-matx", name: "NZXT H5 Flow mATX", category: "case", ecosystem: "both", price: 8000, formFactor: "mATX" },
  { id: "case-atx", name: "Corsair 4000D Airflow ATX", category: "case", ecosystem: "both", price: 10000, formFactor: "ATX" },
  { id: "case-atx2", name: "Fractal Pop XL ATX", category: "case", ecosystem: "both", price: 12000, formFactor: "ATX" },
  // Coolers
  { id: "cool-air", name: "DeepCool AK400", category: "cooler", ecosystem: "both", price: 4000, tdp: 220 },
  { id: "cool-aio", name: "NZXT Kraken 240 AIO", category: "cooler", ecosystem: "both", price: 12000, tdp: 350 },
  { id: "cool-aio2", name: "Arctic LF II 360 AIO", category: "cooler", ecosystem: "both", price: 15000, tdp: 400 },
];

const categoryInfo: { key: Category; label: string; icon: any }[] = [
  { key: "cpu", label: "Procesor", icon: Cpu },
  { key: "motherboard", label: "Matična ploča", icon: MonitorSpeaker },
  { key: "gpu", label: "Grafička karta", icon: MonitorSpeaker },
  { key: "ram", label: "RAM memorija", icon: HardDrive },
  { key: "storage", label: "Skladište", icon: HardDrive },
  { key: "psu", label: "Napajanje", icon: Battery },
  { key: "case", label: "Kućište", icon: Box },
  { key: "cooler", label: "Hladnjak", icon: Fan },
];

function checkCompatibility(selected: Record<Category, Component | null>) {
  const issues: string[] = [];
  const cpu = selected.cpu;
  const mb = selected.motherboard;
  const ram = selected.ram;
  const psu = selected.psu;
  const gpu = selected.gpu;
  const cooler = selected.cooler;
  const pcCase = selected.case;

  if (cpu && mb && cpu.socket !== mb.socket) {
    issues.push(`Socket nekompatibilan: ${cpu.name} (${cpu.socket}) ≠ ${mb.name} (${mb.socket})`);
  }
  if (mb && ram && mb.ramType && ram.ramType && mb.ramType !== ram.ramType) {
    issues.push(`RAM tip nekompatibilan: ${mb.name} (${mb.ramType}) ≠ ${ram.name} (${ram.ramType})`);
  }
  if (mb && pcCase) {
    const mbFF = mb.formFactor;
    const caseFF = pcCase.formFactor;
    if (mbFF === "ATX" && caseFF === "mATX") {
      issues.push(`Matična ploča ${mb.name} (ATX) ne staje u kućište ${pcCase.name} (mATX)`);
    }
  }

  let totalTDP = 0;
  if (cpu?.tdp) totalTDP += cpu.tdp;
  if (gpu?.tdp) totalTDP += gpu.tdp;
  totalTDP += 80; // other components

  if (psu && psu.tdp && totalTDP > psu.tdp) {
    issues.push(`Napajanje nedovoljno: potrebno ~${totalTDP}W, odabrano ${psu.tdp}W`);
  }

  if (cpu && cooler && cpu.tdp && cooler.tdp && cpu.tdp > cooler.tdp) {
    issues.push(`Hladnjak možda neadekvatan za TDP procesora (${cpu.tdp}W > ${cooler.tdp}W kapacitet)`);
  }

  return issues;
}

const Configurator = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialEco = searchParams.get("eco") as Ecosystem;
  const [ecosystem, setEcosystem] = useState<Ecosystem>(initialEco);
  const [selected, setSelected] = useState<Record<Category, Component | null>>({
    cpu: null, motherboard: null, gpu: null, ram: null, storage: null, psu: null, case: null, cooler: null,
  });

  const issues = useMemo(() => checkCompatibility(selected), [selected]);
  const totalPrice = useMemo(() => Object.values(selected).reduce((sum, c) => sum + (c?.price || 0), 0), [selected]);

  const filteredComponents = (cat: Category) =>
    components.filter(c => c.category === cat && (c.ecosystem === "both" || c.ecosystem === ecosystem));

  if (!ecosystem) {
    return (
      <Layout>
        <section className="py-20 min-h-[80vh] flex items-center">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Izaberi svoj <span className="text-gradient-primary">ekosistem</span>
              </h1>
              <p className="text-muted-foreground">Ovo je prvi korak — svi dalji predlozi biće prilagođeni tvom izboru.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {(["intel", "amd"] as const).map(eco => (
                <motion.button
                  key={eco}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setEcosystem(eco)}
                  className={`rounded-xl p-10 text-center glass glass-hover ${eco === "intel" ? "hover:border-blue-500/40" : "hover:border-red-500/40"}`}
                >
                  <div className={`w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center text-3xl font-extrabold text-foreground ${eco === "intel" ? "bg-gradient-intel" : "bg-gradient-amd"}`}>
                    {eco === "intel" ? "I" : "A"}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{eco === "intel" ? "Intel" : "AMD"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {eco === "intel" ? "Core i3, i5, i7, i9" : "Ryzen 3, 5, 7, 9"}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Component Picker */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">Konfigurator</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ekosistem: <span className={`font-semibold ${ecosystem === "intel" ? "text-blue-400" : "text-red-400"}`}>{ecosystem === "intel" ? "Intel" : "AMD"}</span>
                    <button onClick={() => { setEcosystem(null); setSelected({ cpu: null, motherboard: null, gpu: null, ram: null, storage: null, psu: null, case: null, cooler: null }); }} className="ml-3 text-xs text-primary hover:underline">Promeni</button>
                  </p>
                </div>
              </div>

              {categoryInfo.map(({ key, label, icon: Icon }) => (
                <div key={key} className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-foreground text-sm">{label}</h3>
                    {selected[key] && (
                      <span className="ml-auto text-xs text-success flex items-center gap-1">
                        <Check className="w-3 h-3" /> Odabrano
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                    {filteredComponents(key).map(comp => {
                      const isSelected = selected[key]?.id === comp.id;
                      return (
                        <button
                          key={comp.id}
                          onClick={() => setSelected(prev => ({ ...prev, [key]: isSelected ? null : comp }))}
                          className={`text-left p-3 rounded-lg border transition-all text-sm ${
                            isSelected
                              ? "border-primary/50 bg-primary/10"
                              : "border-border/50 hover:border-primary/30 hover:bg-secondary/50"
                          }`}
                        >
                          <p className={`font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>{comp.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{comp.price.toLocaleString("sr-RS")} RSD</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <div className="lg:w-80 shrink-0">
              <div className="sticky top-20 space-y-4">
                <div className="glass rounded-xl p-5">
                  <h3 className="font-bold text-foreground mb-4">Tvoja konfiguracija</h3>
                  <div className="space-y-2">
                    {categoryInfo.map(({ key, label }) => (
                      <div key={key} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{label}</span>
                        <span className={selected[key] ? "text-foreground font-medium" : "text-muted-foreground/50"}>
                          {selected[key] ? selected[key]!.name.split(" ").slice(0, 3).join(" ") : "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border/50 mt-4 pt-4 flex justify-between items-center">
                    <span className="font-semibold text-foreground">Ukupno</span>
                    <span className="text-xl font-bold text-gradient-primary">{totalPrice.toLocaleString("sr-RS")} RSD</span>
                  </div>
                </div>

                {/* Compatibility */}
                <div className="glass rounded-xl p-5">
                  <h3 className="font-bold text-foreground mb-3">Kompatibilnost</h3>
                  <AnimatePresence mode="wait">
                    {issues.length > 0 ? (
                      <motion.div key="issues" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        {issues.map((issue, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                            <span className="text-destructive/90">{issue}</span>
                          </div>
                        ))}
                      </motion.div>
                    ) : Object.values(selected).some(v => v) ? (
                      <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-success">
                        <Check className="w-4 h-4" />
                        <span>Sve komponente su kompatibilne!</span>
                      </motion.div>
                    ) : (
                      <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Izaberi komponente za proveru</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {totalPrice > 0 && (
                  <div className="glass rounded-xl p-5">
                    <h3 className="font-bold text-foreground mb-3">Uporedi</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tvoja konfiguracija</span>
                        <span className="text-foreground font-semibold">{totalPrice.toLocaleString("sr-RS")} RSD</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gotov računar (prosek)</span>
                        <span className="text-foreground font-semibold">{Math.round(totalPrice * 1.35).toLocaleString("sr-RS")} RSD</span>
                      </div>
                      <div className="flex justify-between border-t border-border/50 pt-2">
                        <span className="text-success font-medium">Ušteda</span>
                        <span className="text-success font-bold">{Math.round(totalPrice * 0.35).toLocaleString("sr-RS")} RSD</span>
                      </div>
                    </div>
                  </div>
                )}

                {Object.values(selected).every(v => v !== null) && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={issues.length > 0}
                    onClick={() => navigate("/tutorials")}
                    className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Wrench className="w-5 h-5" />
                    Započni sklapanje
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Configurator;
