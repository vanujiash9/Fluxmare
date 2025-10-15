Reorganize Fluxmare repository

What this does (dry-run by default)

- Moves selected top-level components from `src/components` into more logical folders under `src/pages`, `src/components/chat`, and `src/components/auth`.
- Adds directories if they don't exist.
- Does NOT change imports; after moving you will need to update import paths.

How to run

From the project root (`d:\Downloads\Fluxmare`):

PowerShell (dry-run):

    .\restructure_fluxmare.ps1

PowerShell (apply):

    .\restructure_fluxmare.ps1 -Apply

After applying

- Run a search for moved component names to update their import paths across the codebase.
- Run `npm install` (if needed) and `npm run dev` to start dev server and fix any import errors.
- Recommended: use VSCode's Rename/Refactor to update imports automatically, or run `rg "from \".*<ComponentName>\"" -n` to find references.

Notes

- This script is conservative: it only moves a small list of files defined in the script.
- If you want a different layout, edit `restructure_fluxmare.ps1` and adjust the mapping.
