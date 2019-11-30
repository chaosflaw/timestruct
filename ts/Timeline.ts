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

  private _prepend(node: Node) {
    let earliest = this._earliest
    // set value in the day immediately following the head
    if (earliest) {
      earliest.prev = node
      node.next = earliest
    }

    this._earliest = node
  }

  public set(time: Date, value: any): Node {
    let node = new Node(value, time)
    if (!this._latest) {
      this._latest = node
      this._earliest = node
    } else {
      // case A.1: timestamp is later than the current head and becomes the new head
      if (node.time >= this._latest.time) this._append(node)
      // case A.2: timestamp is earlier than the current tail and becomes the new tail
      else if (this._earliest && node.time <= this._earliest.time) this._prepend(node)
      // case B: timestamp is anywhere in-between
      else {
        // follow previous until you reach a previous node which timestamp is earlier than time
        let current = this._latest
        while (current.prev && current.prev.time >= time) current = current.prev
        // if you find one, splice value onto that position
        if (current.prev) {
          let prev = current.prev
          prev.next = node
          node.prev = prev
          current.prev = node
          node.next = current
        } else this._prepend(node) // if no previous earlier node is found, then attach value as a new node to the tail
      }
    }
    return node
  }

  public get(time: Date) {}
}

export default Timeline
