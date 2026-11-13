import { describe, it, expect } from 'vitest';
import * as M from './index';

describe('Kalender', () => {
  it('Ostern nach PTB', () => {
    expect(M.toIso(M.ostersonntag(2026))).toBe('2026-04-05');
    expect(M.toIso(M.ostersonntag(2027))).toBe('2027-03-28');
    expect(M.toIso(M.ostersonntag(2002))).toBe('2002-03-31');
  });
  it('BGH VIII ZR 206/04 : im Juni 2002 ist der 3. Werktag Dienstag, der 4. (Samstag zählt mit)', () => {
    expect(M.toIso(M.nterWerktag(2002, 6, 3, 'SH'))).toBe('2002-06-04');
  });
  it('Feiertage zählen nicht : 3. Werktag im Januar 2027 in Bayern (Neujahr Fr, Drei Könige Mi)', () => {
    // 1.1. Fr Feiertag, 2.1. Sa, 3.1. So, 4.1. Mo, 5.1. Di → dritter Werktag = 5. Januar
    expect(M.toIso(M.nterWerktag(2027, 1, 3, 'BY'))).toBe('2027-01-05');
    expect(M.toIso(M.nterWerktag(2027, 1, 3, 'BE'))).toBe('2027-01-05');
  });
  it('§ 188 Abs. 3 : 31. Januar plus ein Monat = letzter Februartag', () => {
    expect(M.toIso(M.plusMonate(M.fromIso('2027-01-31'), 1))).toBe('2027-02-28');
  });
});

describe('Miete § 573c', () => {
  it('Mieter, Zugang am 3. Werktag : Ende des übernächsten Monats', () => {
    const r = M.miete({ zugang: '2026-11-04', land: 'BE', wer: 'mieter' });
    expect(r.stichtag).toBe('2026-11-04');
    expect(r.rechtzeitig).toBe(true);
    expect(r.ende).toBe('2027-01-31');
  });
  it('Mieter, einen Tag zu spät : ein Monat später', () => {
    expect(M.miete({ zugang: '2026-11-05', land: 'BE', wer: 'mieter' }).ende).toBe('2027-02-28');
  });
  it('Vermieter nach sechs Jahren : sechs Monate', () => {
    const r = M.miete({ zugang: '2026-11-02', land: 'NW', wer: 'vermieter', ueberlassung: '2020-09-01' });
    expect(r.monate).toBe(6); expect(r.ende).toBe('2027-04-30');
  });
  it('Vermieter nach neun Jahren : neun Monate', () => {
    expect(M.miete({ zugang: '2026-11-02', land: 'NW', wer: 'vermieter', ueberlassung: '2017-01-01' }).monate).toBe(9);
  });
  it('Möbliertes Zimmer : bis zum 15. zum Monatsende', () => {
    expect(M.miete({ zugang: '2026-11-15', land: 'HH', wer: 'mieter', moebliert: true }).ende).toBe('2026-11-30');
    expect(M.miete({ zugang: '2026-11-16', land: 'HH', wer: 'mieter', moebliert: true }).ende).toBe('2026-12-31');
  });
});

describe('Arbeit § 622', () => {
  it('Arbeitnehmer : vier Wochen zum 15. oder Monatsende', () => {
    expect(M.arbeit({ zugang: '2026-11-17', beginn: '2020-01-01', wer: 'an', probezeit: false }).ende).toBe('2026-12-15');
    expect(M.arbeit({ zugang: '2026-11-18', beginn: '2020-01-01', wer: 'an', probezeit: false }).ende).toBe('2026-12-31');
  });
  it('Arbeitgeber, drei Jahre : ein Monat zum Monatsende', () => {
    const r = M.arbeit({ zugang: '2026-11-13', beginn: '2023-06-01', wer: 'ag', probezeit: false });
    expect(r.jahre).toBe(3); expect(r.ende).toBe('2026-12-31');
  });
  it('Arbeitgeber, zwölf Jahre : fünf Monate zum Monatsende', () => {
    expect(M.arbeit({ zugang: '2026-11-13', beginn: '2014-01-01', wer: 'ag', probezeit: false }).ende).toBe('2027-04-30');
  });
  it('Probezeit : zwei Wochen', () => {
    const r = M.arbeit({ zugang: '2026-11-13', beginn: '2026-09-01', wer: 'an', probezeit: true });
    expect(r.ende).toBe('2026-11-27'); expect(r.inProbezeit).toBe(true);
  });
  it('Probezeit über sechs Monate hinaus gilt nicht', () => {
    expect(M.arbeit({ zugang: '2026-11-13', beginn: '2026-01-01', wer: 'an', probezeit: true }).inProbezeit).toBe(false);
  });
  it('Vertragliche Frist drei Monate zum Quartalsende', () => {
    expect(M.arbeit({ zugang: '2026-11-13', beginn: '2020-01-01', wer: 'an', probezeit: false, vertrag: 'q3' }).ende).toBe('2027-03-31');
  });
  it('Klagefrist drei Wochen', () => {
    expect(M.arbeit({ zugang: '2026-11-13', beginn: '2020-01-01', wer: 'ag', probezeit: false }).klagefristBis).toBe('2026-12-04');
  });
});

describe('Verbraucherverträge § 309 Nr. 9', () => {
  const base = { beginn: '2026-01-01', laufzeit: 24, abschluss: '2025-12-10', frist: 1, verlaengerung: 12 };
  it('rechtzeitig vor Ablauf der Erstlaufzeit', () => {
    const r = M.vertrag({ ...base, zugang: '2027-11-30' });
    expect(r.erstEnde).toBe('2027-12-31'); expect(r.ende).toBe('2027-12-31'); expect(r.regel).toBe('erst');
  });
  it('zu spät : danach monatlich kündbar', () => {
    const r = M.vertrag({ ...base, zugang: '2027-12-10' });
    expect(r.regel).toBe('monatlich'); expect(r.ende).toBe('2028-01-10');
  });
  it('Frist von drei Monaten wird auf einen Monat gekappt', () => {
    expect(M.vertrag({ ...base, frist: 3, zugang: '2027-11-15' }).fristGekappt).toBe(true);
  });
  it('Altvertrag : Verlängerung um ein Jahr', () => {
    const r = M.vertrag({ ...base, abschluss: '2021-05-01', beginn: '2021-06-01', frist: 3, zugang: '2026-11-13' });
    expect(r.regel).toBe('periode'); expect(r.ende).toBe('2027-05-31');
  });
});

describe('Versicherung § 11 VVG', () => {
  it('drei Monate zum Ende des Versicherungsjahres', () => {
    expect(M.versicherung({ zugang: '2026-09-30', ablauf: '2026-12-31', frist: 3 }).ende).toBe('2026-12-31');
    expect(M.versicherung({ zugang: '2026-10-02', ablauf: '2026-12-31', frist: 3 }).ende).toBe('2027-12-31');
  });
});

describe('Beträge', () => {
  it('Verzugszinsen 1.000 € für 184 Tage zu 6,52 %', () => {
    const r = M.verzugszinsen(1000, '2026-07-01', '2026-12-31', true);
    expect(r.teile[0].satz).toBeCloseTo(6.52); expect(r.summe).toBeCloseTo(32.87, 2);
  });
  it('Zinswechsel am 1. Juli 2026', () => {
    const r = M.verzugszinsen(1000, '2026-06-01', '2026-07-31', false);
    expect(r.teile.length).toBe(2); expect(r.teile[0].satz).toBeCloseTo(10.27); expect(r.teile[1].satz).toBeCloseTo(10.52); expect(r.pauschale).toBe(40);
  });
  it('Kaution drei Nettokaltmieten', () => { expect(M.kaution(750).max).toBe(2250); });
  it('Abfindung § 1a : mehr als sechs Monate zählen als Jahr', () => {
    expect(M.abfindung1a(4000, '2016-01-01', '2026-08-15')).toEqual({ jahre: 11, betrag: 22000 });
    expect(M.abfindung1a(4000, '2016-01-01', '2026-05-31').jahre).toBe(10);
  });
  it('Schenkung : Freibetrag Kind 400.000', () => {
    const r = M.schenkung(50000, 0, 'kind'); expect(r.freibetrag).toBe(400000); expect(r.ueber).toBe(0);
    expect(M.schenkung(30000, 0, 'geschwister').ueber).toBe(10000);
  });
  it('Zahl in Worten', () => {
    expect(M.inWorten(12500)).toBe('zwölftausendfünfhundert');
    expect(M.inWorten(1001)).toBe('eintausendeins');
    expect(M.inWorten(21)).toBe('einundzwanzig');
    expect(M.inWorten(1000000)).toBe('eine Million');
    expect(M.euroInWorten(1250.5)).toBe('eintausendzweihundertfünfzig Euro und fünfzig Cent');
  });
});
