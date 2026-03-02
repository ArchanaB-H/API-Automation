import fs from 'fs'
import path from 'path'

async function globalSetup() {
  const file = path.resolve(
    process.cwd(),
    'test-results',
    'module-stats.json'
  )

  if (fs.existsSync(file)) {
    fs.unlinkSync(file)
  }
}

export default globalSetup