import Node from './Node'

class Timeline {
  /** Latest day in the timeline. */
  private _latest: Node | null
  /** Earliest day in the timeline. */
  private _earliest: Node | null

  constructor() {
    this._latest = null
    this._earliest = null
  }

  get earliest() {
    return this._earliest
  }

  get latest() {
    return this._latest
  }

  private _append(node: Node) {
    let latest = this._latest
    // set value in the day immediately following the head
    if (latest) {
      latest.next = node
      node.prev = latest
    }

    this._latest = node
  }

  public set(time: Date, value: any): Node {
    let node = new Node(value, time)
    if (!this._latest) {
      this._latest = node
      this._earliest = node
    } else {
      // case A: timestamp is later than the current head and so it becomes the new head
      if (node.time > this._latest.time) this._append(node)
      // case B: timestamp is earlier than head
      else {
        // follow previous until you reach a previous node which timestamp is earlier than time
        let current = this._latest
        while (current.prev && current.prev.time >= time) current = current.prev
        // if you find one, splice value onto that position
        if (current.prev) {
          let prev = current.prev
          prev.next = node
          current.prev = node
        } else {
          // if no previous earlier node is found, then attach value as a new node to the tail
          current.prev = node
          node.next = current
          this._earliest = node
        }
      }
    }
    return node
  }

  public print() {
    let curr = this._latest
    let counter = 1
    while (curr) {
      console.log(`\n${counter++}`)
      console.log(curr)
      curr = curr.prev
    }
    console.log('----------')
  }

  // public get(time: Date) {}
}

export default Timeline
