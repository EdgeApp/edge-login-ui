// @flow

export type PeriodicTask = {
  // True once start is called, false after stop is called:
  +started: boolean,
  start(): void,
  stop(): void
}

/**
 * Schedule a repeating task, with the specified gap between runs.
 */
export function makePeriodicTask(
  task: () => Promise<void> | void,
  ms: number
): PeriodicTask {
  let running = false
  let timeout: $Call<typeof setTimeout, () => void, number> | void

  function done(): void {
    running = false
    if (!out.started) return
    timeout = setTimeout(run, ms)
  }

  function run(): void {
    if (!out.started) return
    if (running) return
    running = true
    try {
      const result = task()
      if (result == null) done()
      else result.then(done).catch(done)
    } catch (error) {
      done()
    }
  }

  const out = {
    started: false,

    start(): void {
      out.started = true
      run()
    },

    stop(): void {
      out.started = false
      if (timeout != null) clearTimeout(timeout)
    }
  }
  return out
}
