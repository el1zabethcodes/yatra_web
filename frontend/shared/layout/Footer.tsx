import Link from "next/link";

/**
 * компонент підвалу сайту
 */
export default function Footer() {
  return (
    <footer className="border-t border-surface/30 bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-4">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-primary"
            >
              Yatra
            </Link>
            <p className="text-sm text-primary/50 max-w-xs">
              Ваш спокійний компас у світі кар'єри. Допомагаємо студентам знайти свій шлях за допомогою ШІ.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-primary/60">Продукт</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-sm text-primary/60 hover:text-primary transition-colors">Можливості</Link></li>
                <li><Link href="/pricing" className="text-sm text-primary/60 hover:text-primary transition-colors">Ціни</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-primary/60">Підтримка</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-primary/60 hover:text-primary transition-colors">Документація</Link></li>
                <li><Link href="#" className="text-sm text-primary/60 hover:text-primary transition-colors">Контакти</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary/60">
            © {new Date().getFullYear()} Yatra. Всі права захищені.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-primary/60 hover:text-primary transition-colors">Політика конфіденційності</Link>
            <Link href="#" className="text-xs text-primary/60 hover:text-primary transition-colors">Умови використання</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

