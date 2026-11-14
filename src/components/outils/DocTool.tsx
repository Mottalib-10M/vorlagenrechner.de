/**
 * Vorlagen-Generator : links die Felder, rechts das Ergebnis (Datum oder Betrag aus dem Motor),
 * darunter das fertige Dokument auf Deutsch, druckbar und kopierbar. Erste Darstellung = Vorgaben
 * und Tag des Builds (RECETTE §17.5) ; nichts wird gesendet, nichts in die Adresse geschrieben
 * (Namen und Anschriften gehören nicht in eine URL).
 */
import { Fragment, useMemo, useState } from 'react';
import { SPECS } from '../../lib/docs';
import type { DocOut, FieldDef, L, V } from '../../lib/docs/types';
import { Shell, Head, Rows, Note, MethodLink } from '../calc/kit';
import MentionExemple from '../calc/MentionExemple';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import TextField from '../ui/TextField';
import DateField from '../ui/DateField';

const T = <A,>(l: L, de: A, en: A) => (l === 'en' ? en : de);
const defaults = (fields: FieldDef[], today: string, preset: V = {}): V =>
  Object.fromEntries(fields.map((f) => [f.id, preset[f.id] ?? (typeof f.def === 'function' ? f.def(today) : f.def)]));

/** Gesetzesangaben « (§ 309 Nr. 9 BGB) » aus einem Satz lösen : der Satz bleibt lesbar, die Vorschrift steht darunter als Grundlage
 *  (testeurs naïfs du 2026-11-14 : Vorschriften in die Fußnote, nicht in den Satz). */
const REF = /\s*\(((?:§§?|Art\.|ss?\.|sections?)\s(?:[^()]|\([^()]*\))*)\)/g;
export function ohneVorschrift(s: string | undefined, refs: string[]): string | undefined {
  if (!s) return s;
  return s.replace(REF, (_, r: string) => { if (!refs.includes(r)) refs.push(r); return ''; });
}

function docText(d: DocOut): string {
  const out: string[] = [];
  if (d.from?.length) out.push(d.from.join('\n'), '');
  if (d.to?.length) out.push(d.to.join('\n'), '');
  if (d.ortDatum) out.push(d.ortDatum, '');
  out.push(d.title, '');
  for (const b of d.blocks) { if (b.h) out.push(b.h); out.push(...b.p, ''); }
  out.push(...d.sign);
  return out.join('\n');
}

/** Zusammenfassung zwischen Ergebnis und Dokument : gleiches Markup wie Clamp.astro (ein <p>, Rest per Checkbox). */
export interface ResumeClamp { id: string; tete: string; suite: string; label: string }
export default function DocTool({ docId, lang, refDay, id, methodHref, preset, resume }: { docId: string; lang: L; refDay: string; id: string; methodHref?: string; preset?: V; resume?: ResumeClamp }) {
  const spec = SPECS[docId];
  const [v, setV] = useState<V>(() => defaults(spec.fields, refDay, preset));
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const set = (k: string) => (x: string) => { setV((o) => ({ ...o, [k]: x })); setTouched((o) => ({ ...o, [k]: true })); };
  const roh = useMemo(() => spec.result(v, lang), [v, lang, spec]);
  const { r, refs } = useMemo(() => {
    const refs: string[] = [];
    const r = { ...roh, sub: ohneVorschrift(roh.sub, refs), alert: ohneVorschrift(roh.alert, refs), hinweis: ohneVorschrift(roh.hinweis, refs), rows: roh.rows?.map(([a, b]) => [ohneVorschrift(a, refs)!, ohneVorschrift(b, refs)!] as [string, string]) };
    return { r, refs };
  }, [roh]);
  const exemple = typeof spec.exemple === 'function' ? spec.exemple(refDay) : spec.exemple;
  const doc = useMemo(() => (spec.doc ? spec.doc(v) : null), [v, spec]);
  const visible = spec.fields.filter((f) => !f.showIf || f.showIf(v));

  const groups: Array<{ title?: string; fields: FieldDef[] }> = [];
  for (const f of visible) {
    if (f.group || !groups.length) groups.push({ title: f.group?.[lang], fields: [] });
    groups[groups.length - 1].fields.push(f);
  }
  // Aide d'un champ de gauche dont le voisin de droite n'a pas d'aide : elle s'étend sur toute la rangée (check-layout n° 10).
  // Le champ date a toujours une aide (format et date en toutes lettres).
  const aAide = (f?: FieldDef) => !!f && (f.kind === 'date' || !!f.help);
  const large = new Set<string>();
  for (const g of groups) {
    let col = 0;
    g.fields.forEach((f, i) => {
      if (f.wide) { col = 0; return; }
      const next = g.fields[i + 1];
      if (col === 0 && aAide(f) && (!next || next.wide || !aAide(next))) large.add(f.id);
      col = col === 0 && !(next?.wide) ? 1 : 0;
    });
  }
  const field = (f: FieldDef) => {
    const fid = `${id}-${f.id}`, label = f.label[lang], help = f.help?.[lang], cls = f.wide ? 'sm:col-span-2' : large.has(f.id) ? 'aide-large' : '';
    if (f.kind === 'select') return <SelectField key={f.id} id={fid} label={label} help={help} value={v[f.id]} onChange={set(f.id)} options={(f.options ?? []).map((o) => ({ value: o.value, label: o.label[lang] }))} className={cls} />;
    if (f.kind === 'date') return <DateField key={f.id} id={fid} label={label} help={help} value={v[f.id]} onChange={set(f.id)} className={cls} lang={lang} />;
    if (f.kind === 'number') return <NumberField key={f.id} id={fid} label={label} help={help} value={Number(v[f.id]) || 0} onChange={(n) => set(f.id)(String(n))} unit={f.unit} min={f.min ?? 0} max={f.max} decimals={f.decimals ?? 0} className={cls} />;
    return <TextField key={f.id} id={fid} label={label} help={help} value={v[f.id]} onChange={set(f.id)} className={cls} />;
  };

  const form = (
    <>
      {groups.map((g, i) => (
        <fieldset key={i} className="space-y-3">
          {g.title && <legend className="mb-2 text-sm font-semibold uppercase tracking-wide text-navy-600">{g.title}</legend>}
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">{g.fields.map(field)}</div>
        </fieldset>
      ))}
    </>
  );
  const result = (
    <>
      <MentionExemple lang={lang} touched={touched} suppose={exemple[lang]} modifiables={spec.fields.length} />
      <Head label={r.label} value={r.value} sub={r.sub} />
      {r.alert && <p className="mt-3 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">{r.alert}</p>}
      {r.rows && <Rows rows={r.rows} />}
      {r.hinweis && <p className="mt-3 text-sm text-navy-700">{r.hinweis}</p>}
      {refs.length > 0 && <p className="mt-2 text-xs text-navy-500">{T(lang, 'Grundlage', 'Legal basis')}: {refs.join('; ')}</p>}
      {doc && <p className="mt-4 text-sm"><a href={`#${id}-dokument`} className="font-medium text-accent-700 underline">{T(lang, 'Zum fertigen Dokument', 'Go to the finished document')}</a></p>}
      <Note>{T(lang, 'Vorlage wie aus einem Formularhandbuch: keine Prüfung Ihres Einzelfalls, keine Rechtsberatung. Eingaben bleiben in Ihrem Browser.', 'A standard template, like a book of legal forms: no review of your individual case and no legal advice. What you type stays in your browser.')}</Note>
      <MethodLink href={methodHref} lang={lang} />
    </>
  );
  const clamp = resume ? (
    <div className="clamp mt-6">
      {resume.suite && <input type="checkbox" id={resume.id} className="clamp-toggle" />}
      <p className="text-navy-800"><span dangerouslySetInnerHTML={{ __html: resume.tete }} />{resume.suite && <span className="clamp-rest"> <span dangerouslySetInnerHTML={{ __html: resume.suite }} /></span>}</p>
      {resume.suite && <label htmlFor={resume.id} className="clamp-more">{resume.label} ▾</label>}
    </div>
  ) : null;
  const after = doc ? (
    <>{clamp}
    <div id={`${id}-dokument`} className="mt-6 scroll-mt-24">
      <div className="no-print mb-3 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => { document.body.classList.add('drucke-dokument'); window.print(); window.setTimeout(() => document.body.classList.remove('drucke-dokument'), 500); }} className="inline-flex h-12 items-center rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{T(lang, 'Drucken oder als PDF speichern', 'Print or save as PDF')}</button>
        <button type="button" onClick={() => { navigator.clipboard?.writeText(docText(doc)).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); }); }} className="inline-flex h-12 items-center rounded-lg border border-navy-300 bg-white px-5 font-semibold text-navy-900 hover:bg-navy-50">{copied ? T(lang, 'Kopiert', 'Copied') : T(lang, 'Text kopieren', 'Copy the text')}</button>
        <span className="text-sm text-navy-600">{T(lang, 'Leere Felder erscheinen als Linie zum Ausfüllen von Hand.', 'Empty fields print as a line to fill in by hand.')}{lang === 'en' ? ' The document is in German, as the other party expects.' : ''}</span>
      </div>
      <div className="dokument [overflow-wrap:anywhere] rounded-lg border border-navy-300 bg-white p-5 font-serif text-[0.95rem] leading-relaxed text-navy-900 shadow-sm sm:p-10" lang="de">
        {doc.from?.length ? <p className="mb-6 whitespace-pre-line text-sm">{doc.from.join('\n')}</p> : null}
        {doc.to?.length ? <p className="mb-6 whitespace-pre-line">{doc.to.join('\n')}</p> : null}
        {doc.ortDatum && <p className="mb-6 text-right">{doc.ortDatum}</p>}
        <p className="mb-4 text-lg font-bold">{doc.title}</p>
        {doc.blocks.map((b, i) => (
          <Fragment key={i}>
            {b.h && <p className="mt-4 font-bold">{b.h}</p>}
            {b.p.map((p, j) => <p key={j} className="mt-2">{p}</p>)}
          </Fragment>
        ))}
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {doc.sign.map((s, i) => <div key={i}><div className="h-10 border-b border-navy-500" /><p className="mt-1 text-sm">{s}</p></div>)}
        </div>
      </div>
    </div></>
  ) : undefined;
  return <Shell id={id} form={form} result={result} after={after} />;
}
