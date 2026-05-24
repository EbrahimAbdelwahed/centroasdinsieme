# Handoff: setup memorie Jimdo

Data: 2026-05-24

## Cosa e' stato fatto

E' stata creata la struttura `dev/` per gestire piani, handoff e memorie del progetto.

File aggiunti:

- `dev/README.md`
- `dev/memorie/jimdo-import-design.md`
- `dev/piani/2026-05-24-sistema-memorie-jimdo.md`
- `dev/handoff/2026-05-24-setup-memorie-jimdo.md`

## Decisioni importanti

Per i futuri design da importare in Jimdo, assumere Jimdo Creator come target tecnico solo dopo verifica dell'account.

Se il progetto e' su Jimdo Website Builder / Dolphin, non implementare codice custom HTML/CSS per importazione: Dolphin non supporta quel flusso.

## Prossimi passi suggeriti

- Confermare con il cliente se l'account e' Jimdo Creator o Dolphin.
- Se e' Creator, iniziare a definire blocchi HTML/CSS statici con classi prefissate `.siga-*`.
- Se e' Dolphin, pianificare una ricostruzione con blocchi nativi o valutare migrazione.
