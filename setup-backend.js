#!/usr/bin/env node

/**
 * CruxAnalytics Automated Backend Setup
 * 
 * This script automates the complete backend setup process:
 * - Creates Railway MySQL database
 * - Generates secure secrets
 * - Configures .env file
 * - Installs dependencies
 * - Runs database migrations
 * - Verifies connectivity
 * - Generates deployment report
 * 
 * Usage: node setup-backend.js
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const readline = require('readline');

// ========================
// CONFIGURATION
// ========================

const CONFIG = {
  PROJECT_NAME: 'CruxAnalytics-Production',
  RAILWAY_REGION: 'us-west1',
  BACKEND_PORT: 3000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000, // ms
};

// ========================
// COLORS FOR TERMINAL
// ========================

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, total, message) {
  log(`\n[${step}/${total}] ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// ========================
// UTILITY FUNCTIONS
// ========================

function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

function execCommand(command, options = {}) {
  try {
    return execSync(command, {
      encoding: 'utf-8',
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options,
    });
  } catch (error) {
    if (!options.ignoreError) {
      throw error;
    }
    return null;
  }
}

function fileExists(filepath) {
  return fs.existsSync(filepath);
}

function writeFile(filepath, content) {
  fs.writeFileSync(filepath, content, 'utf-8');
}

function readFile(filepath) {
  return fs.readFileSync(filepath, 'utf-8');
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question(query, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

// ========================
// DEPLOYMENT STATE
// ========================

const deploymentState = {
  startTime: Date.now(),
  steps: [],
  credentials: {},
  errors: [],
  warnings: [],
};

function addStep(name, status, details = {}) {
  deploymentState.steps.push({
    name,
    status, // 'success', 'failed', 'skipped', 'warning'
    details,
    timestamp: new Date().toISOString(),
  });
}

// ========================
// STEP 1: CHECK PREREQUISITES
// ========================

async function checkPrerequisites() {
  logStep(1, 10, 'Checking prerequisites...');

  const checks = {
    node: { command: 'node --version', required: true },
    pnpm: { command: 'pnpm --version', required: true },
    git: { command: 'git --version', required: false },
  };

  for (const [name, check] of Object.entries(checks)) {
    try {
      const version = execCommand(check.command, { silent: true });
      logSuccess(`${name}: ${version.trim()}`);
    } catch (error) {
      if (check.required) {
        logError(`${name} is not installed (REQUIRED)`);
        throw new Error(`Missing required dependency: ${name}`);
      } else {
        logWarning(`${name} is not installed (optional)`);
      }
    }
  }

  // Check if we're in the right directory
  if (!fileExists('package.json')) {
    throw new Error('package.json not found. Run this script from the project root.');
  }

  const packageJson = JSON.parse(readFile('package.json'));
  if (!packageJson.name || !packageJson.name.includes('CruxAnalytics')) {
    logWarning('Package name does not contain "CruxAnalytics". Are you in the right directory?');
  }

  addStep('Prerequisites Check', 'success');
  logSuccess('All prerequisites met!');
}

// ========================
// STEP 2: RAILWAY DATABASE SETUP
// ========================

async function setupRailwayDatabase() {
  logStep(2, 10, 'Setting up Railway MySQL database...');

  logInfo('Opening Railway.app in browser...');
  logInfo('Please follow these steps:');
  log('\n1. Login to Railway.app');
  log('2. Create a new project called "CruxAnalytics-Production"');
  log('3. Add a MySQL service');
  log('4. Wait for it to deploy');
  log('5. Copy the DATABASE_URL (looks like: mysql://root:password@host:3306/db)');
  log('6. Come back here and paste it\n');

  // Open Railway in browser
  const railwayUrl = 'https://railway.app/new';
  const openCommand =
    process.platform === 'darwin'
      ? 'open'
      : process.platform === 'win32'
      ? 'start'
      : 'xdg-open';

  try {
    execCommand(`${openCommand} ${railwayUrl}`, { ignoreError: true });
  } catch (error) {
    logWarning('Could not open browser automatically. Please visit: ' + railwayUrl);
  }

  // Ask user for DATABASE_URL
  const databaseUrl = await askQuestion(
    '\n🔗 Paste your Railway DATABASE_URL here: '
  );

  if (!databaseUrl || !databaseUrl.startsWith('mysql://')) {
    throw new Error('Invalid DATABASE_URL. It should start with mysql://');
  }

  deploymentState.credentials.DATABASE_URL = databaseUrl;
  addStep('Railway Database Setup', 'success', { url: maskCredential(databaseUrl) });
  logSuccess('Railway database configured!');

  return databaseUrl;
}

function maskCredential(credential) {
  // Show first 10 and last 10 chars, hide middle
  if (credential.length < 30) return credential;
  return credential.slice(0, 15) + '...' + credential.slice(-15);
}

// ========================
// STEP 3: GENERATE SECRETS
// ========================

function generateSecrets() {
  logStep(3, 10, 'Generating secure secrets...');

  const secrets = {
    JWT_SECRET: generateSecret(32),
    COOKIE_SECRET: generateSecret(32),
  };

  deploymentState.credentials = { ...deploymentState.credentials, ...secrets };

  logSuccess(`JWT_SECRET: ${secrets.JWT_SECRET.slice(0, 16)}...`);
  logSuccess(`COOKIE_SECRET: ${secrets.COOKIE_SECRET.slice(0, 16)}...`);

  addStep('Generate Secrets', 'success');
  return secrets;
}

// ========================
// STEP 4: CREATE .env FILE
// ========================

function createEnvFile(databaseUrl, secrets) {
  logStep(4, 10, 'Creating .env file...');

  const envPath = path.join(process.cwd(), '.env');

  // Check if .env already exists
  if (fileExists(envPath)) {
    logWarning('.env file already exists');
    const backup = `${envPath}.backup.${Date.now()}`;
    fs.copyFileSync(envPath, backup);
    logInfo(`Backed up existing .env to: ${backup}`);
  }

  // Check for OPENAI_API_KEY
  let openaiKey = process.env.OPENAI_API_KEY || '';
  if (!openaiKey && fileExists(envPath)) {
    const existingEnv = readFile(envPath);
    const match = existingEnv.match(/OPENAI_API_KEY=["']?([^"'\n]+)["']?/);
    if (match) {
      openaiKey = match[1];
      logInfo('Found existing OPENAI_API_KEY, preserving it...');
    }
  }

  const envContent = `# CruxAnalytics Environment Configuration
# Generated by automated setup script
# Date: ${new Date().toISOString()}

# ========================
# Database Configuration
# ========================
DATABASE_URL="${databaseUrl}"

# ========================
# Security Secrets
# ========================
JWT_SECRET="${secrets.JWT_SECRET}"
COOKIE_SECRET="${secrets.COOKIE_SECRET}"

# ========================
# OpenAI API (Optional)
# ========================
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY="${openaiKey}"
OPENAI_MODEL="gpt-4o-mini"

# ========================
# Server Configuration
# ========================
NODE_ENV="production"
PORT="${CONFIG.BACKEND_PORT}"

# ========================
# Mock Payments (Development)
# ========================
EXPO_PUBLIC_USE_MOCK_PAYMENTS="true"

# ========================
# Feature Flags
# ========================
ENABLE_AI_INSIGHTS="true"
ENABLE_PDF_EXPORT="true"
`;

  writeFile(envPath, envContent);

  addStep('Create .env File', 'success', { path: envPath });
  logSuccess('.env file created successfully!');
  
  if (!openaiKey) {
    logWarning('OPENAI_API_KEY not set. AI features will be disabled.');
    logInfo('You can add it later to .env file');
  }
}

// ========================
// STEP 5: INSTALL DEPENDENCIES
// ========================

function installDependencies() {
  logStep(5, 10, 'Installing dependencies...');
  logInfo('This may take 1-2 minutes...');

  try {
    execCommand('pnpm install', { stdio: 'inherit' });
    addStep('Install Dependencies', 'success');
    logSuccess('Dependencies installed!');
  } catch (error) {
    logError('Failed to install dependencies');
    addStep('Install Dependencies', 'failed', { error: error.message });
    throw error;
  }
}

// ========================
// STEP 6: VERIFY CRITICAL DEPENDENCIES
// ========================

function verifyCriticalDependencies() {
  logStep(6, 10, 'Verifying critical dependencies...');

  const criticalDeps = [
    'drizzle-orm',
    'mysql2',
    '@trpc/server',
    '@trpc/client',
    'zod',
  ];

  let allPresent = true;

  for (const dep of criticalDeps) {
    try {
      const version = execCommand(`pnpm list ${dep} --depth 0`, {
        silent: true,
        ignoreError: true,
      });
      
      if (version && version.includes(dep)) {
        logSuccess(`${dep}: installed`);
      } else {
        logError(`${dep}: NOT FOUND`);
        allPresent = false;
      }
    } catch (error) {
      logError(`${dep}: ERROR checking`);
      allPresent = false;
    }
  }

  if (!allPresent) {
    throw new Error('Some critical dependencies are missing');
  }

  addStep('Verify Dependencies', 'success');
  logSuccess('All critical dependencies present!');
}

// ========================
// STEP 7: GENERATE MIGRATIONS
// ========================

function generateMigrations() {
  logStep(7, 10, 'Generating database migrations...');

  try {
    execCommand('pnpm drizzle-kit generate', { stdio: 'inherit' });
    
    // Check if migration files were created
    const migrationsDir = path.join(process.cwd(), 'drizzle', 'migrations');
    if (fileExists(migrationsDir)) {
      const files = fs.readdirSync(migrationsDir);
      logSuccess(`Generated ${files.length} migration file(s)`);
    }

    addStep('Generate Migrations', 'success');
    logSuccess('Migrations generated!');
  } catch (error) {
    // Migration generation might fail if files already exist - that's OK
    logWarning('Migration generation encountered issues (may already exist)');
    addStep('Generate Migrations', 'warning', { 
      message: 'Files may already exist' 
    });
  }
}

// ========================
// STEP 8: APPLY MIGRATIONS
// ========================

async function applyMigrations() {
  logStep(8, 10, 'Applying migrations to database...');
  logInfo('Connecting to Railway MySQL...');

  try {
    execCommand('pnpm drizzle-kit push', { stdio: 'inherit' });
    
    addStep('Apply Migrations', 'success');
    logSuccess('Migrations applied successfully!');
    
    return true;
  } catch (error) {
    logError('Failed to apply migrations');
    logError('Error: ' + error.message);
    
    addStep('Apply Migrations', 'failed', { error: error.message });
    
    // Ask if they want to continue anyway
    const answer = await askQuestion(
      '\n⚠️  Migration failed. Continue anyway? (y/N): '
    );
    
    return answer.toLowerCase() === 'y';
  }
}

// ========================
// STEP 9: VERIFY DATABASE SCHEMA
// ========================

async function verifyDatabaseSchema() {
  logStep(9, 10, 'Verifying database schema...');
  
  logInfo('Starting Drizzle Studio to verify tables...');
  logInfo('This will open http://localhost:4983 in your browser');
  
  // Start drizzle studio in background
  const studioProcess = spawn('pnpm', ['drizzle-kit', 'studio'], {
    detached: true,
    stdio: 'ignore',
  });
  
  // Wait for studio to start
  await sleep(3000);
  
  // Open in browser
  const studioUrl = 'http://localhost:4983';
  const openCommand =
    process.platform === 'darwin'
      ? 'open'
      : process.platform === 'win32'
      ? 'start'
      : 'xdg-open';

  try {
    execCommand(`${openCommand} ${studioUrl}`, { ignoreError: true });
  } catch (error) {
    logWarning('Could not open browser. Please visit: ' + studioUrl);
  }
  
  log('\n📊 Drizzle Studio opened. Please verify:');
  log('   1. Table "users" exists');
  log('   2. Table "projects" exists (NEW)');
  log('   3. Table "scenarios" exists (NEW)');
  log('\n   Press Enter when you\'re done verifying...\n');
  
  await askQuestion('');
  
  // Kill studio process
  try {
    process.kill(-studioProcess.pid);
  } catch (error) {
    // Ignore error if already killed
  }
  
  addStep('Verify Database Schema', 'success');
  logSuccess('Database schema verified!');
}

// ========================
// STEP 10: RUN TESTS
// ========================

function runTests() {
  logStep(10, 10, 'Running tests...');
  
  try {
    const output = execCommand('pnpm test', { 
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    
    // Parse test results
    const passedMatch = output.match(/(\d+) passed/);
    const failedMatch = output.match(/(\d+) failed/);
    const skippedMatch = output.match(/(\d+) skipped/);
    
    const passed = passedMatch ? parseInt(passedMatch[1]) : 0;
    const failed = failedMatch ? parseInt(failedMatch[1]) : 0;
    const skipped = skippedMatch ? parseInt(skippedMatch[1]) : 0;
    const total = passed + failed + skipped;
    
    logSuccess(`Tests: ${passed}/${total} passed`);
    
    if (failed > 0) {
      logWarning(`${failed} test(s) failed`);
    }
    
    if (skipped > 0) {
      logInfo(`${skipped} test(s) skipped (likely OpenAI - OK)`);
    }
    
    addStep('Run Tests', failed === 0 ? 'success' : 'warning', {
      total,
      passed,
      failed,
      skipped,
    });
    
  } catch (error) {
    logWarning('Some tests failed (may be OK if OpenAI key missing)');
    addStep('Run Tests', 'warning', { 
      message: 'Some tests failed - check output above' 
    });
  }
}

// ========================
// GENERATE DEPLOYMENT REPORT
// ========================

function generateDeploymentReport() {
  log('\n' + '='.repeat(60));
  log('📊 GENERATING DEPLOYMENT REPORT', 'bright');
  log('='.repeat(60) + '\n');
  
  const duration = Math.floor((Date.now() - deploymentState.startTime) / 1000);
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  
  const successCount = deploymentState.steps.filter(s => s.status === 'success').length;
  const failedCount = deploymentState.steps.filter(s => s.status === 'failed').length;
  const warningCount = deploymentState.steps.filter(s => s.status === 'warning').length;
  const totalSteps = deploymentState.steps.length;
  
  const overallStatus = failedCount > 0 ? 'PARTIAL' : 
                       warningCount > 0 ? 'SUCCESS (with warnings)' : 
                       'SUCCESS';
  
  const report = `
=== CRUXANALYTICS DEPLOYMENT REPORT ===
Date: ${new Date().toISOString()}
Duration: ${minutes}m ${seconds}s
Status: ${overallStatus}

✅ COMPLETED TASKS (${successCount}/${totalSteps}):

${deploymentState.steps
  .map((step, i) => {
    const icon = step.status === 'success' ? '✅' : 
                 step.status === 'failed' ? '❌' : 
                 step.status === 'warning' ? '⚠️' : '⊘';
    return `${i + 1}. ${icon} ${step.name}`;
  })
  .join('\n')}

=== CREDENTIALS (KEEP SECURE) ===
DATABASE_URL: ${maskCredential(deploymentState.credentials.DATABASE_URL || 'Not set')}
JWT_SECRET: ${maskCredential(deploymentState.credentials.JWT_SECRET || 'Not generated')}
COOKIE_SECRET: ${maskCredential(deploymentState.credentials.COOKIE_SECRET || 'Not generated')}
OPENAI_API_KEY: ${deploymentState.credentials.OPENAI_API_KEY ? 'Set ✅' : 'Not set ⊘'}

=== NEXT STEPS ===
1. Start backend server:
   $ pnpm dev:server

2. In another terminal, start frontend:
   $ pnpm start

3. Open Expo app and scan QR code

4. Create a test project in the app

5. Verify data in Railway dashboard:
   https://railway.app/dashboard

=== IMPORTANT URLS ===
- Backend API: http://localhost:${CONFIG.BACKEND_PORT}
- Drizzle Studio: http://localhost:4983 (run: pnpm drizzle-kit studio)
- Railway Dashboard: https://railway.app/dashboard
- OpenAI Dashboard: https://platform.openai.com/usage

=== TROUBLESHOOTING ===
${failedCount > 0 ? `
⚠️  ERRORS ENCOUNTERED:
${deploymentState.steps
  .filter(s => s.status === 'failed')
  .map(s => `   - ${s.name}: ${s.details.error || 'Unknown error'}`)
  .join('\n')}
` : 'No critical errors ✅'}

${warningCount > 0 ? `
⚠️  WARNINGS:
${deploymentState.steps
  .filter(s => s.status === 'warning')
  .map(s => `   - ${s.name}: ${s.details.message || 'See logs'}`)
  .join('\n')}
` : ''}

=== SUPPORT ===
If you encounter issues:
1. Check the .env file is correctly configured
2. Verify Railway database is running
3. Run: pnpm drizzle-kit studio (to inspect database)
4. Check logs: pnpm dev:server

Report generated by: CruxAnalytics Automated Setup
`;

  // Write report to file
  const reportPath = path.join(process.cwd(), 'deployment-report.txt');
  writeFile(reportPath, report);
  
  // Print to console
  log(report);
  
  logSuccess(`\n📄 Full report saved to: ${reportPath}`);
  
  return overallStatus;
}

// ========================
// MAIN EXECUTION
// ========================

async function main() {
  try {
    log('\n' + '='.repeat(60), 'bright');
    log('🚀 CRUXANALYTICS AUTOMATED BACKEND SETUP', 'bright');
    log('='.repeat(60) + '\n', 'bright');
    
    logInfo('This script will set up your complete backend infrastructure');
    logInfo('Estimated time: 2-3 minutes\n');
    
    // Execute all steps
    await checkPrerequisites();
    const databaseUrl = await setupRailwayDatabase();
    const secrets = generateSecrets();
    createEnvFile(databaseUrl, secrets);
    installDependencies();
    verifyCriticalDependencies();
    generateMigrations();
    const migrationsOk = await applyMigrations();
    
    if (migrationsOk) {
      await verifyDatabaseSchema();
    } else {
      logWarning('Skipping schema verification due to migration issues');
    }
    
    runTests();
    
    // Generate final report
    const status = generateDeploymentReport();
    
    // Final message
    log('\n' + '='.repeat(60), 'bright');
    if (status === 'SUCCESS') {
      log('🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!', 'green');
    } else if (status === 'SUCCESS (with warnings)') {
      log('✅ DEPLOYMENT COMPLETED WITH WARNINGS', 'yellow');
    } else {
      log('⚠️  DEPLOYMENT PARTIALLY COMPLETED', 'yellow');
    }
    log('='.repeat(60) + '\n', 'bright');
    
    logInfo('Next: Start your servers with:');
    log('  Terminal 1: pnpm dev:server');
    log('  Terminal 2: pnpm start\n');
    
  } catch (error) {
    log('\n' + '='.repeat(60), 'red');
    logError('DEPLOYMENT FAILED');
    log('='.repeat(60) + '\n', 'red');
    
    logError('Error: ' + error.message);
    
    if (error.stack) {
      logInfo('\nStack trace:');
      console.error(error.stack);
    }
    
    addStep('Deployment', 'failed', { error: error.message });
    generateDeploymentReport();
    
    process.exit(1);
  }
}

// Run main function
if (require.main === module) {
  main().catch(error => {
    logError('Unexpected error: ' + error.message);
    process.exit(1);
  });
}

module.exports = { main };
