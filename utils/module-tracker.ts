import fs from 'fs'
import path from 'path'

type ModuleStats = {
  passed: number
  failed: number
}

const RESULTS_FILE = path.resolve(
  process.cwd(),
  'test-results',
  'module-stats.json'
)

// ensure folder + file
function ensureFile() {
  const dir = path.dirname(RESULTS_FILE)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  if (!fs.existsSync(RESULTS_FILE)) {
    fs.writeFileSync(RESULTS_FILE, JSON.stringify({}))
  }
}

function readStats(): Record<string, ModuleStats> {
  ensureFile()
  return JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf-8'))
}

function writeStats(data: Record<string, ModuleStats>) {
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(data, null, 2))
}

//  record pass
export function recordPass(moduleName: string) {
  const stats = readStats()

  if (!stats[moduleName]) {
    stats[moduleName] = { passed: 0, failed: 0 }
  }

  stats[moduleName].passed++
  writeStats(stats)
}

//  record fail
export function recordFail(moduleName: string) {
  const stats = readStats()

  if (!stats[moduleName]) {
    stats[moduleName] = { passed: 0, failed: 0 }
  }

  stats[moduleName].failed++
  writeStats(stats)
}

//  per-module summary
export function printModuleSummary(moduleName: string) {
  const stats = readStats()[moduleName] || {
    passed: 0,
    failed: 0
  }

  console.log('\n==============================')
  console.log(`📦 ${moduleName} Summary`)
  console.log(`✅ Passed: ${stats.passed}`)
  console.log(`❌ Failed: ${stats.failed}`)
  console.log('==============================\n')
}

// global summary
export function printGlobalSummary() {
  const statsMap = readStats()

  console.log('\n========== GLOBAL API SUMMARY ==========')

  let totalPassed = 0
  let totalFailed = 0

  for (const [module, stats] of Object.entries(statsMap)) {
    totalPassed += stats.passed
    totalFailed += stats.failed

    console.log(
      `${module.padEnd(20)} → Passed: ${stats.passed}  Failed: ${stats.failed}`
    )
  }

  console.log('----------------------------------------')
  console.log(
    `TOTAL`.padEnd(20) +
      ` → Passed: ${totalPassed}  Failed: ${totalFailed}`
  )
  console.log('========================================\n')
}