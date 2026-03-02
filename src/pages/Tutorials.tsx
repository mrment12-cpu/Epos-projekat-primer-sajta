import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, Star, Cpu, HardDrive, MonitorSpeaker, Cable, Fan, Wrench } from "lucide-react";
import Layout from "../components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  staggerContainer,
  fadeUp,
  fadeLeft,
  fadeRight,
  sectionHeading,
  viewportOnce,
} from "@/lib/animations";

import tutorialCpu from "@/assets/tutorial-cpu.jpg";
import tutorialRam from "@/assets/tutorial-ram.jpg";
import tutorialGpu from "@/assets/tutorial-gpu.jpg";
import tutorialCables from "@/assets/tutorial-cables.jpg";
import tutorialCooling from "@/assets/tutorial-cooling.jpg";
import tutorialFullbuild from "@/assets/tutorial-fullbuild.jpg";

const tutorials = [
  { icon: Cpu, title: "Kako instalirati procesor", description: "Korak-po-korak vodič za bezbedan montažu Intel i AMD procesora na matičnu ploču.", duration: "8 min", difficulty: "Početnik", views: "12.4k", videoSrc: "/videos/how-to-install-cpu.mp4", image: tutorialCpu },
  { icon: HardDrive, title: "Instalacija RAM memorije", description: "Naučite kako pravilno postaviti RAM module i aktivirati dual-channel režim.", duration: "5 min", difficulty: "Početnik", views: "9.8k", videoSrc: "/videos/which-slots-ram.mp4", image: tutorialRam },
  { icon: MonitorSpeaker, title: "Postavljanje grafičke karte", description: "Vodič za GPU instalaciju, napajanje i optimalno postavljanje u kućištu.", duration: "7 min", difficulty: "Srednji", views: "15.2k", videoSrc: "/videos/gpu-installation.mp4", image: tutorialGpu },
  { icon: Cable, title: "Cable Management", description: "Profesionalne tehnike za sakrivanje kablova i optimalan protok vazduha.", duration: "12 min", difficulty: "Napredni", views: "8.1k", videoSrc: "/videos/cable-management.mp4", image: tutorialCables },
  { icon: Fan, title: "Hlađenje i termalna pasta", description: "Pravilna aplikacija termalne paste i montaža vazdušnog i AIO hladnjaka.", duration: "10 min", difficulty: "Srednji", views: "11.3k", videoSrc: "/videos/cooling-thermal-paste.mp4", image: tutorialCooling },
  { icon: Wrench, title: "Kompletna montaža od A do Ž", description: "Celokupan vodič — od otvaranja kućišta do prvog pokretanja sistema.", duration: "25 min", difficulty: "Svi nivoi", views: "22.7k", videoSrc: "/videos/complete-build.mp4", image: tutorialFullbuild },
];

const difficultyColor: Record<string, string> = {
  "Početnik": "text-success bg-success/10",
  "Srednji": "text-warning bg-warning/10",
  "Napredni": "text-destructive bg-destructive/10",
  "Svi nivoi": "text-primary bg-primary/10",
};

const cardVariant = (i: number) => (i % 3 === 0 ? fadeLeft : i % 3 === 2 ? fadeRight : fadeUp);

const Tutorials = () => {
  const [activeVideo, setActiveVideo] = useState<{ title: string; src: string } | null>(null);

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={sectionHeading}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              AI <span className="text-gradient-primary">Tutorijali</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Personalizovani video vodiči za svaki korak montaže. Od otvaranja kućišta do prvog paljenja računara.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {tutorials.map((t, i) => (
              <motion.div
                key={i}
                variants={cardVariant(i)}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="glass glass-hover rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => {
                  if (t.videoSrc) setActiveVideo({ title: t.title, src: t.videoSrc });
                }}
              >
                <div className="relative h-44 bg-secondary overflow-hidden">
                  <motion.img
                    src={t.image}
                    alt={t.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/40 backdrop-blur-sm">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      className="w-14 h-14 rounded-full bg-primary flex items-center justify-center glow-primary"
                    >
                      <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                    </motion.div>
                  </div>
                  {t.videoSrc && (
                    <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider bg-primary/90 text-primary-foreground px-2 py-0.5 rounded">
                      Video
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor[t.difficulty]}`}>
                      {t.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" /> {t.duration}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5">{t.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 text-warning" />
                    <span>{t.views} pregleda</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Dialog */}
      <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-background border-border">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>{activeVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="p-4 pt-2">
            {activeVideo && (
              <video key={activeVideo.src} controls autoPlay className="w-full rounded-lg aspect-video bg-black" src={activeVideo.src} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Tutorials;
