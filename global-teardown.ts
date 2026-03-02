import { printGlobalSummary } from './utils/module-tracker'

async function globalTeardown() {
  printGlobalSummary()
}

export default globalTeardown