import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Store, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    // --- ALTERAÇÃO AQUI ---
    // bg-transparent: Fundo transparente
    // backdrop-blur-sm: Desfoque leve (igual ao Header)
    // border-border/20: Borda sutil
    <footer className="bg-transparent backdrop-blur-sm border-t border-border/20 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Coluna 1: Marca e Sobre */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">TechStore</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sua loja definitiva de hardware e periféricos de alta performance. 
              Trazendo o futuro da tecnologia para o seu setup hoje.
            </p>
            
            <div className="flex space-x-2 pt-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary hover:bg-primary/10">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary hover:bg-primary/10">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary hover:bg-primary/10">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary hover:bg-primary/10">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Departamentos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Hardware</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Periféricos</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Computadores</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Monitores</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Kits Upgrade</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Atendimento */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Atendimento</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>(11) 4002-8922</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>suporte@techstore.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Av. Paulista, 1000 - SP</span>
              </li>
              <li className="pt-2">
                <Link to="/perfil" className="hover:text-primary transition-colors underline underline-offset-4">
                  Meus Pedidos
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Ofertas Exclusivas</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Cadastre-se para receber promoções e novidades em primeira mão.
            </p>
            <div className="flex flex-col space-y-2">
              <Input 
                placeholder="Seu melhor e-mail" 
                className="bg-background/30 border-input focus-visible:ring-primary backdrop-blur-sm" 
              />
              <Button className="w-full font-semibold">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border/40" />

        {/* Rodapé Inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; 2025 TechStore. Todos os direitos reservados.</p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Pagamento Seguro</span>
            </div>
            <div className="flex gap-1 opacity-70 grayscale hover:grayscale-0 transition-all">
               <div className="w-8 h-5 bg-slate-200 dark:bg-slate-800 rounded flex items-center justify-center font-bold text-[8px]">VISA</div>
               <div className="w-8 h-5 bg-slate-200 dark:bg-slate-800 rounded flex items-center justify-center font-bold text-[8px]">MC</div>
               <div className="w-8 h-5 bg-slate-200 dark:bg-slate-800 rounded flex items-center justify-center font-bold text-[8px]">PIX</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}