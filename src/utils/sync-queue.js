const syncQueue = (delay = 1000) => {
  const queue = []
  const pending = []

  const processDone = (r) => {
    queue.splice(queue.indexOf(r), 1)
    setTimeout(() => {
      if (pending.length && !queue.length) {
        const p = pending.shift()
        p.resolve(p.request())
      }
    }, delay)
  }

  return (fn) => (...params) => {
    const r = (() => {
      const get = fn(params)
      get.then(processDone.bind(get), processDone.bind(get))
      queue.push(get)
      return get
    })

    if (!queue.length) {
      return r()
    }

    const p = new Promise((resolve) => {
      pending.push({ request: r, resolve })
    })
    return p
  }
}

export default syncQueue
