Denne mappen brukes kun hvis vi self-hoster fontfiler.

Akkurat nå lastes Antarctican Headline via Adobe Typekit (ekstern stylesheet i `src/app/(frontend)/layout.tsx`).

Hvis du senere vil bytte tilbake til self-hosting:
- Legg `public/fonts/antarctican-headline.woff2` her
- Sett opp `@font-face` i `src/app/(frontend)/globals.css`

Nye lokale fonter for sakstitler:
- Legg `public/fonts/FranklinGothic-Heavy.woff2` her (for nyhetstitler)
- Legg `public/fonts/FranklinGothic-CondItalic.woff2` her (for leder/debatt)

Fontene er koblet i `src/app/(frontend)/globals.css` med `@font-face`.
Hvis filene mangler, brukes fallback-fonter automatisk.
