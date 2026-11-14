/**
 * Datumsfeld als Textfeld TT.MM.JJJJ (testeurs naïfs du 2026-11-14, RECETTE §15.8) : das native Datumsfeld zeigte
 * auf manchen Telefonen « 04/01/2025 » (Monat zuerst), zwei von drei Testern lasen den 4. Januar, obwohl das
 * Beispiel « seit April 2025 » sagte. Regel der Factory : kein natives Datumsfeld. Angezeigt wird TT.MM.JJJJ,
 * darunter das Datum in Worten ; nur gültige Daten werden übernommen, sonst bleibt der letzte gültige Wert.
 */
import { useState } from 'react';
import { displayDate } from '../../lib/format';

interface Props { id: string; label: string; value: string; onChange: (v: string) => void; help?: string; className?: string; min?: string; max?: string; lang?: 'de' | 'en' }
const isIso = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && new Date(`${s}T00:00:00Z`).toISOString().slice(0, 10) === s;
/** ISO → TT.MM.JJJJ */
export const isoVersTexte = (iso: string) => (isIso(iso) ? iso.split('-').reverse().join('.') : '');
/** « 1.4.2025 », « 01.04.2025 », « 01/04/2025 », « 01-04-2025 », « 01042025 » → ISO (Tag zuerst) ; sonst null. */
export function texteVersIso(s: string): string | null {
  const t = s.trim();
  let m = /^(\d{1,2})[./\-\s](\d{1,2})[./\-\s](\d{4})$/.exec(t);
  if (!m) { const c = /^(\d{2})(\d{2})(\d{4})$/.exec(t); if (c) m = c; }
  if (!m) return null;
  const iso = `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
  return isIso(iso) ? iso : null;
}

export default function DateField({ id, label, value, onChange, help, className = '', min = '1950-01-01', max = '2040-12-31', lang = 'de' }: Props) {
  const [raw, setRaw] = useState<string | null>(null);
  const shown = raw ?? isoVersTexte(value);
  const parsed = raw === null ? (isIso(value) ? value : null) : texteVersIso(raw);
  const inRange = parsed !== null && parsed >= min && parsed <= max;
  const fehler = raw !== null && raw.trim() !== '' && (!parsed || !inRange);
  const format = lang === 'en' ? 'DD.MM.YYYY, e.g. 01.04.2025 for 1 April 2025' : 'TT.MM.JJJJ, z. B. 01.04.2025 für den 1. April 2025';
  const inWorten = parsed && inRange ? displayDate(parsed, lang === 'en' ? 'en-GB' : 'de-DE') : '';
  return (
    <div className={`grid grid-rows-subgrid row-span-3 content-start gap-y-0 ${className}`}>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-navy-700">{label}</label>
      <input id={id} type="text" inputMode="numeric" autoComplete="off" placeholder={lang === 'en' ? 'DD.MM.YYYY' : 'TT.MM.JJJJ'} value={shown}
        onChange={(e) => { const s = e.target.value.replace(/[^0-9./\-\s]/g, '').slice(0, 10); setRaw(s); const iso = texteVersIso(s); if (iso && iso >= min && iso <= max) onChange(iso); }}
        onBlur={() => { if (!fehler) setRaw(null); }}
        aria-invalid={fehler || undefined} aria-describedby={`${id}-help`}
        className="tabular-nums h-12 w-full self-start rounded-lg border border-navy-300 bg-white px-3 text-navy-900 placeholder:text-navy-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
      <p id={`${id}-help`} className={`mt-1 text-xs ${fehler ? 'font-medium text-amber-700' : 'text-navy-500'}`} role={fehler ? 'status' : undefined}>
        {fehler
          ? (lang === 'en' ? `Please type the date as ${format}.` : `Bitte als ${format} eingeben.`)
          : <>{inWorten && <span className="font-medium text-navy-700">= {inWorten}</span>}{inWorten && ' · '}{help ? `${help} · ` : ''}{lang === 'en' ? 'DD.MM.YYYY' : 'TT.MM.JJJJ'}</>}
      </p>
    </div>
  );
}
