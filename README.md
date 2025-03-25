# Kő Papír Olló

Ez egy modern [Next.js](https://nextjs.org) alapú Kő Papír Olló játék, TypeScript és Tailwind CSS használatával.

## Funkciók

-   🎮 Klasszikus Kő-Papír-Olló játékmenet
-   🎯 Pontszámok követése
-   🔄 Játékelőzmények mentése
-   🎆 Győzelmi animáció konfettivel
-   📱 Reszponzív design minden képernyőméretre
-   🌙 Modern, sötét téma gradiens háttérrel
-   🇭🇺 Magyar nyelvű felület

## Telepítés

Először klónozd a projektet:

```bash
git clone https://github.com/zkaskoo/rock-paper-scissors.git
cd rock-paper-scissors
```

Telepítsd a függőségeket:

```bash
npm install
# vagy
yarn install
# vagy
pnpm install
```

## Fejlesztés

Fejlesztői mód indítása:

```bash
npm run dev
# vagy
yarn dev
# vagy
pnpm dev
```

Nyisd meg a [http://localhost:3000](http://localhost:3000) címet a böngésződben a játék megtekintéséhez.

A játék a `src/components/Game.tsx` fájl módosításával személyre szabható.

## Build

Éles verzió elkészítése:

```bash
npm run build
npm run start
```

## Technológiák

-   [Next.js 15](https://nextjs.org/) - React framework
-   [TypeScript](https://www.typescriptlang.org/) - Statikus típusellenőrzés
-   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
-   [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) - Konfetti effektusok

## Struktúra

```
/src
  /app - Next.js App Router
  /components - React komponensek
  /types - TypeScript típusdefiníciók
  /utils - Segédfüggvények
/public - Statikus fájlok
```

## Telepítés Vercelen

A legegyszerűbb módja a Next.js alkalmazás telepítésének a [Vercel Platform](https://vercel.com/new) használata.

A Vercel telepítési dokumentációjában további részleteket találsz: [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Licenc

MIT

---

Készítette: Tóth Zoltán
