---
title: Database Conversion
description: How to use Shoko.CLI to convert a supported SQL Server or MySQL/MariaDB database into SQLite.
---

# Database Conversion

`Shoko.CLI` includes a database conversion command for migrating a supported Shoko database into a freshly bootstrapped SQLite database.

## Supported Conversions

- SQL Server to SQLite
- MySQL/MariaDB to SQLite

## Command

```bash
dotnet /absolute/path/to/Shoko.CLI.dll \
  convert-db \
  --source-type mssql|mariadb \
  --source-connection-string "<connection-string>" \
  --target-file "/absolute/path/to/Shoko.sqlite" \
  [--overwrite]
```

## Examples

### SQL Server

```bash
dotnet /absolute/path/to/Shoko.CLI.dll \
  convert-db \
  --source-type mssql \
  --source-connection-string "Server=db.example.local,1433{\\INSTANCE_NAME};Database=shoko;User Id=shoko;Password=secret;TrustServerCertificate=True" \
  --target-file "/absolute/path/to/Shoko.sqlite" \
  --overwrite
```

### MySQL / MariaDB

```bash
dotnet /absolute/path/to/Shoko.CLI.dll \
  convert-db \
  --source-type mariadb \
  --source-connection-string "Server=db.example.local;Port=3306;Database=shoko;User ID=shoko;Password=secret;Default Command Timeout=3600;Allow User Variables=true" \
  --target-file "/absolute/path/to/Shoko.sqlite" \
  --overwrite
```

## Requirements

- The source database must already be upgraded to the schema version expected by the running Shoko build.
- Conversion is intended for same-version scenarios.
- The source database must be a Shoko database from a supported backend.
- The target file should point to a new SQLite database path.

## What the Converter Does

- Creates a fresh SQLite database using Shoko's own SQLite bootstrap and migration path.
- Keeps SQLite `Versions` metadata from the target bootstrap instead of copying it from the source database.
- Copies shared application tables and columns from the source database into the new SQLite database.
- Applies fallback values only where required by known schema drift.
- Verifies copied data table-by-table after migration.

## What the Converter Does Not Do

- It does not migrate Quartz job tables.
- It does not convert arbitrary cross-version database states.
- It does not preserve source backend `Versions` rows.
- It does not attempt to rescue unsupported stale schemas before conversion.

## Version Guard

Before bootstrapping the SQLite target, the converter checks the source database `Versions` table against the current backend migration level for the running Shoko build.

If the source database is not already at the expected migration level, conversion fails early with an error similar to:

```text
Unsupported source database version for MySQL/MariaDB. Found 161.6, expected 163.2 for this Shoko build.
Upgrade the source database with the matching Shoko Server build before conversion.
```

This is intentional. The converter is designed for supported, already-upgraded databases, not for repairing older schema states.

## Safety Notes

- Always convert from a backup or a database you can recreate.
- The converter bootstraps SQLite in an isolated temporary Shoko home so it does not intentionally reuse your live image or content directories.
- If the source database still contains legacy data that current cleanup migrations cannot safely resolve, startup or conversion should fail explicitly instead of silently dropping data.

## Output

A successful run prints:

- source table count
- target table count
- copied table count
- excluded control tables
- per-table copy progress
- per-table verification progress
- final output path
