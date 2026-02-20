import { Link } from "react-router-dom";
import { Monitor, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/30">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Monitor className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-foreground">Računarski Servisi</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sve na jednom mestu — od odabira komponenata do sklapanja računara uz AI podršku.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Navigacija</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Početna</Link>
            <Link to="/configurator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Konfigurator</Link>
            <Link to="/tutorials" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tutorijali</Link>
            <Link to="/marketplace" className="text-sm text-muted-foreground hover:text-primary transition-colors">Marketplace</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Podrška</h4>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">FAQ</span>
            <span className="text-sm text-muted-foreground">Uslovi korišćenja</span>
            <span className="text-sm text-muted-foreground">Politika privatnosti</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Kontakt</h4>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-primary" /> info@racunarskiservisi.rs</span>
            <span className="text-sm text-muted-foreground flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-primary" /> +381 11 000 0000</span>
            <span className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-primary" /> Beograd, Srbija</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50 mt-8 pt-6 text-center">
        <p className="text-xs text-muted-foreground">© 2026 Računarski Servisi. Sva prava zadržana.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
