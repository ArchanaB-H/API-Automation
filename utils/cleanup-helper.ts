// utils/cleanup-helper.ts

export class CleanupHelper {
  private items: Array<() => Promise<any>> = []

  add(task: () => Promise<any>) {
    this.items.push(task)
  }

  async runAll(moduleName: string) {
    console.log(`🧹 Running cleanup for ${moduleName}`)

    for (const task of this.items.reverse()) {
      try {
        await task()
      } catch (err) {
        console.log(' Cleanup task failed:', err)
      }
    }

    this.items = []
  }
}