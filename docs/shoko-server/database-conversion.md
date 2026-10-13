---
title: Database Conversion
description: How to use Shoko.CLI to convert a supported SQL Server or MySQL/MariaDB database into SQLite.
---

# Database Conversion

`Shoko.CLI` includes a database conversion mode for migrating a supported Shoko database into a freshly bootstrapped SQLite database.

## Supported Conversions

- SQL Server to SQLite
- MySQL/MariaDB to SQLite

Reverse conversion is not supported.

## Command

```bash
Shoko.CLI --convert-db \
  [--source-type sqlserver|mysql] \
  [--source-connection-string "<connection-string>"] \
  [--target-file "/absolute/path/to/shoko.db3"] \
  [--overwrite]
```

## Default Behavior

- By default, conversion uses the database currently configured in `ServerSettings.Database` as the source.
- `--source-type` and `--source-connection-string` are optional overrides for advanced/manual conversions.
- `--target-file` is optional. If omitted, Shoko uses the normal SQLite database file path under the current Shoko home/data directory.

## Examples

### Use the currently configured Shoko database

```bash
Shoko.CLI --convert-db
```

### Use the currently configured Shoko database and write to a specific SQLite file

```bash
Shoko.CLI --convert-db --target-file /absolute/path/to/shoko.db3
```

### Override the source as MySQL / MariaDB

```bash
Shoko.CLI --convert-db \
  --source-type mysql \
  --source-connection-string "Server=db.example.local;Port=3306;Database=shoko;User ID=shoko;Password=secret;Default Command Timeout=3600;Allow User Variables=true"
```

### Override the source as SQL Server

```bash
Shoko.CLI --convert-db \
  --source-type sqlserver \
  --source-connection-string "Server=db.example.local,1433;Database=shoko;User Id=shoko;Password=secret;TrustServerCertificate=True"
```

## Requirements

- Stop Shoko Server before running conversion.
- Back up the existing database before running conversion.
- The source database must already be upgraded to the schema version expected by the running Shoko build.
- Conversion is intended for same-version scenarios.
- The source database must be a Shoko database from a supported backend.
- The resolved source database must be SQL Server or MySQL/MariaDB. SQLite cannot be used as the source.

## What the Converter Does

- Creates a fresh SQLite database using Shoko's own SQLite bootstrap and migration path.
- Keeps SQLite `Versions` metadata from the target bootstrap instead of copying it from the source database.
- Copies shared application tables and columns from the source database into the new SQLite database.
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

## Existing Target File Behavior

- If the resolved target SQLite file already exists, conversion fails by default.
- Use `--overwrite` to replace the existing target file.

## Safety Notes

- Always convert from a backup or a database you can recreate.
- The converter bootstraps SQLite in an isolated temporary Shoko home so it does not intentionally reuse your live image, config, or content directories.

## Output

A successful run prints:

- resolved target path
- source table count
- target table count
- copied table count
- excluded control tables
- per-table copy progress
- per-table verification progress
- final output path
