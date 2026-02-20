import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Shield, Zap, ShoppingCart, MonitorSpeaker, BookOpen } from "lucide-react";
import Layout from "../components/Layout";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Cpu,
    title: "Pametni Konfigurator",
    description: "Izaberite komponente i proverite kompatibilnost u realnom vremenu. Zeleno znači kompatibilno, crveno znači problem.",
  },
  {
    icon: BookOpen,
    title: "AI Tutorijali",
    description: "Personalizovani video vodiči korak-po-korak za sklapanje vašeg računara — od otvaranja kućišta do prvog paljenja.",
  },
  {
    icon: ShoppingCart,
    title: "Marketplace",
    description: "Kupujte i prodajte komponente direktno sa drugim korisnicima. Sigurna C2C razmena na jednom mestu.",
  },
  {
    icon: Shield,
    title: "Garancija Kompatibilnosti",
    description: "Naša baza podataka garantuje 100% tačnost provere kompatibilnosti za sve popularne komponente.",
  },
  {
    icon: Zap,
    title: "Ušteda Vremena",
    description: "Više ne morate tražiti po internetu. Sve informacije i alati na jednom mestu.",
  },
  {
    icon: MonitorSpeaker,
    title: "Uporedi Cene",
    description: "Poredite troškove samostalnog sklapanja sa kupovinom gotovog računara i uštedite novac.",
  },
];

const stats = [
  { value: "500+", label: "Komponenata" },
  { value: "100%", label: "Tačnost" },
  { value: "24/7", label: "AI Podrška" },
  { value: "0 din", label: "Za Početak" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">Novo — AI Asistent za sklapanje</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Sklopi svoj računar
              <br />
              <span className="text-gradient-primary">samostalno i sigurno</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Izaberi ekosistem, proveri kompatibilnost komponenata i prati AI tutorijale korak po korak. Sve na jednom mestu.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/configurator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-primary"
              >
                Pokreni Konfigurator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/tutorials"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors"
              >
                Pogledaj Tutorijale
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-gradient-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Sve što vam <span className="text-gradient-primary">treba</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Od odabira komponenata do završne montaže — mi vas vodimo kroz svaki korak.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass glass-hover rounded-xl p-6 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary transition-shadow">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem CTA */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Izaberi svoj <span className="text-gradient-primary">ekosistem</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Započni odabirom Intel ili AMD platforme i pronađi idealne komponente.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link to="/configurator?eco=intel">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="rounded-xl p-8 text-center cursor-pointer glass glass-hover group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-intel mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-foreground">
                  I
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Intel</h3>
                <p className="text-sm text-muted-foreground">Core i3, i5, i7, i9 procesori i kompatibilne komponente</p>
              </motion.div>
            </Link>

            <Link to="/configurator?eco=amd">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="rounded-xl p-8 text-center cursor-pointer glass glass-hover group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-amd mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-foreground">
                  A
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">AMD</h3>
                <p className="text-sm text-muted-foreground">Ryzen 3, 5, 7, 9 procesori i kompatibilne komponente</p>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Spreman da <span className="text-gradient-primary">počneš</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Pridruži se hiljadama korisnika koji su uspešno sklopili svoj računar uz našu pomoć.
            </p>
            <Link
              to="/configurator"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-primary text-lg"
            >
              Započni Besplatno <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
