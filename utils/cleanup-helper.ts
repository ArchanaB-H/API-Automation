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
        console.log(' Cleanup executed successfully')
      } catch (err: any) {
        console.log(' Cleanup task failed:', err?.message || err)
      }
    }

    this.items = []
  }
}