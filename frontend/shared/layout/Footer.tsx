import Link from "next/link";

/**
 * РєРѕРјРїРѕРЅРµРЅС‚ РїС–РґРІР°Р»Сѓ СЃР°Р№С‚Сѓ
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
              Р’Р°С€ СЃРїРѕРєС–Р№РЅРёР№ РєРѕРјРїР°СЃ Сѓ СЃРІС–С‚С– РєР°СЂ'С”СЂРё. Р”РѕРїРѕРјР°РіР°С”РјРѕ СЃС‚СѓРґРµРЅС‚Р°Рј Р·РЅР°Р№С‚Рё СЃРІС–Р№ С€Р»СЏС… Р·Р° РґРѕРїРѕРјРѕРіРѕСЋ РЁР†.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-primary/60">РџСЂРѕРґСѓРєС‚</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-sm text-primary/60 hover:text-primary transition-colors">РњРѕР¶Р»РёРІРѕСЃС‚С–</Link></li>
                <li><Link href="/pricing" className="text-sm text-primary/60 hover:text-primary transition-colors">Р¦С–РЅРё</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-primary/60">РџС–РґС‚СЂРёРјРєР°</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-primary/60 hover:text-primary transition-colors">Р”РѕРєСѓРјРµРЅС‚Р°С†С–СЏ</Link></li>
                <li><Link href="#" className="text-sm text-primary/60 hover:text-primary transition-colors">РљРѕРЅС‚Р°РєС‚Рё</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary/60">
            В© {new Date().getFullYear()} Yatra. Р’СЃС– РїСЂР°РІР° Р·Р°С…РёС‰РµРЅС–.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-primary/60 hover:text-primary transition-colors">РџРѕР»С–С‚РёРєР° РєРѕРЅС„С–РґРµРЅС†С–Р№РЅРѕСЃС‚С–</Link>
            <Link href="#" className="text-xs text-primary/60 hover:text-primary transition-colors">РЈРјРѕРІРё РІРёРєРѕСЂРёСЃС‚Р°РЅРЅСЏ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

