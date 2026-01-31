# Database Migration Guide

## Overview
This migration adds support for storing projects and scenarios in MySQL database instead of AsyncStorage.

## New Tables

### `projects`
Stores financial analysis projects with all their parameters and calculated results.

**Columns:**
- `id` VARCHAR(36) PRIMARY KEY - UUID
- `user_id` INT NOT NULL - Foreign key to users table
- `name` VARCHAR(255) NOT NULL - Project name
- `description` TEXT - Optional project description
- `initial_investment` INT NOT NULL - Initial investment amount
- `yearly_revenue` INT NOT NULL - Yearly revenue
- `operating_costs` INT NOT NULL - Operating costs
- `maintenance_costs` INT NOT NULL - Maintenance costs
- `project_duration` INT NOT NULL - Duration in months
- `discount_rate` INT NOT NULL - Discount rate percentage
- `revenue_growth` INT NOT NULL - Revenue growth percentage
- `best_case_multiplier` INT NOT NULL - Best case scenario multiplier
- `worst_case_multiplier` INT NOT NULL - Worst case scenario multiplier
- `results` JSON - Calculated financial results
- `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

**Indexes:**
- `user_id_idx` on `user_id`
- `created_at_idx` on `created_at`

### `scenarios`
Stores scenario snapshots for projects with different parameter adjustments.

**Columns:**
- `id` VARCHAR(36) PRIMARY KEY - UUID
- `project_id` VARCHAR(36) NOT NULL - Reference to projects table
- `name` VARCHAR(255) NOT NULL - Scenario name
- `sales_adjustment` INT NOT NULL DEFAULT 0 - Sales adjustment percentage
- `costs_adjustment` INT NOT NULL DEFAULT 0 - Costs adjustment percentage
- `discount_adjustment` INT NOT NULL DEFAULT 0 - Discount rate adjustment
- `is_base` INT NOT NULL DEFAULT 0 - Is this the base scenario (0 or 1)
- `results` JSON NOT NULL - Calculated scenario results
- `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP

**Indexes:**
- `project_id_idx` on `project_id`

## Running the Migration

### Step 1: Generate Migration Files
```bash
DATABASE_URL=mysql://user:password@host:3306/database npm run db:generate
```

This will create SQL migration files in `drizzle/migrations/`.

### Step 2: Review Migration
Review the generated SQL files to ensure they match the schema definition.

### Step 3: Apply Migration
```bash
DATABASE_URL=mysql://user:password@host:3306/database npm run db:push
```

Or manually run the migration SQL against your database.

## Manual Migration SQL

If you need to run the migration manually, here's the SQL:

```sql
-- Create projects table
CREATE TABLE IF NOT EXISTS `projects` (
  `id` VARCHAR(36) PRIMARY KEY,
  `user_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `initial_investment` INT NOT NULL,
  `yearly_revenue` INT NOT NULL,
  `operating_costs` INT NOT NULL,
  `maintenance_costs` INT NOT NULL,
  `project_duration` INT NOT NULL,
  `discount_rate` INT NOT NULL,
  `revenue_growth` INT NOT NULL,
  `best_case_multiplier` INT NOT NULL,
  `worst_case_multiplier` INT NOT NULL,
  `results` JSON,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `user_id_idx` (`user_id`),
  INDEX `created_at_idx` (`created_at`)
);

-- Create scenarios table
CREATE TABLE IF NOT EXISTS `scenarios` (
  `id` VARCHAR(36) PRIMARY KEY,
  `project_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `sales_adjustment` INT NOT NULL DEFAULT 0,
  `costs_adjustment` INT NOT NULL DEFAULT 0,
  `discount_adjustment` INT NOT NULL DEFAULT 0,
  `is_base` INT NOT NULL DEFAULT 0,
  `results` JSON NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `project_id_idx` (`project_id`)
);
```

## Data Migration

If you have existing data in AsyncStorage that needs to be migrated to the database:

1. Export existing projects using the export functionality in the app
2. Create a migration script to import the data via the new API
3. Verify the data was correctly migrated
4. Clear the old AsyncStorage data (optional)

## Rollback

To rollback this migration:

```sql
DROP TABLE IF EXISTS `scenarios`;
DROP TABLE IF EXISTS `projects`;
```

Note: This will delete all project and scenario data. Make sure to backup first!

## Verification

After running the migration, verify:

1. Tables are created: `SHOW TABLES LIKE 'projects';`
2. Indexes are in place: `SHOW INDEX FROM projects;`
3. Columns are correct: `DESCRIBE projects;`
4. Try creating a project through the API to test the integration
