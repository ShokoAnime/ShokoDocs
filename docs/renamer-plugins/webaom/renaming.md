---
title: Renaming Files | WebAOM Renamer
description: Information on how to use the WebAOM renamer for renaming files.
---

# Renaming Files

See [the WebAOM renaming section on the AniDB wiki](https://wiki.anidb.net/WebAOM#Move/rename_system), this page will
mainly highlight the differences from the WebAOM renamer as described there.

Note: The value of some tags will differ from WebAOM.

A script is composed of a list of rules evaluated from top to bottom. Each line may contain a statement or a IF
instruction + statement / FAIL.

`ELSE / IF ELSE` is not implemented.

`DO ADD 'part' / DO REPLACE 'toReplace' 'replacement'`

`part` may contain tags (with % prefix), `toReplace` and `replacement` may not.

`IF code([op]cond)[extraTests] statement / FAIL`

`code` is the single character test code.

`op` may be negate `!` or a numerical operator described in [Tests](#tests).

`cond` is the unquoted test condition.

`extraTests`: The test may be followed by any number of other tests prefixed by either `;` (AND) / `,` (OR). If the
first test and all AND tests are true, the result is true; else, if any OR test is true, the result is true.

`// <comment>`  
Text after a double forward slash are comments, these may be placed on their own line or at the end of a line.

## Statements

Missing: SET, RETURN

Added: REPLACE

### Tests

**Missing** Q, C, J, P, L.

Changed: U (Resolution Height), Z (Bit Depth).

Added: F (File Version), H (Episode type prefix), W (Resolution Width), M (Manually Linked: leave empty).

Numerical test operators were added: =, >=, \<=, \<, >.

### Tags

Missing: %epk, %gen, %inv, %md5/%MD5, %qua, %sha/%SHA.

Added: %dep (Deprecated), %grl (Group long name), %sna (Name of file on AniDB), %vdh (Video Height).
