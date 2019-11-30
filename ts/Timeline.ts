import Node from './Node'
import unpackYearMonthDate from './util/unpackYearMonthDate'

class Timeline {
  /** Latest day in the timeline. */
  private _latest: Node | null
  /** Earliest day in the timeline. */
  private _earliest: Node | null
  /** Tree divided by year/month/day. Used for accessing nodes at specific dates with .get */
  private _tree: YearTree

  constructor() {
    this._latest = null
    this._earliest = null
    this._tree = {}
  }

  get earliest() {
    return this._earliest
  }

  get latest() {
    return this._latest
  }

  private _append(node: Node): void {
    let latest = this._latest
    // set value in the day immediately following the head
    if (latest) {
      latest.next = node
      node.prev = latest
    }

    this._latest = node
  }

  private _prepend(node: Node): void {
    let earliest = this._earliest
    // set value in the day immediately following the head
    if (earliest) {
      earliest.prev = node
      node.next = earliest
    }

    this._earliest = node
  }

  private _createReferenceIfDoesNotExist(year, month, date) {
    if (!this._tree[year]) this._tree[year] = {}
    if (!this._tree[year][month]) this._tree[year][month] = {}
    if (!this._tree[year][month][date]) this._tree[year][month][date] = []
  }

  private _recordAtCorrespondingTreeNode(time: Date, node: Node): void {
    let { year, month, date } = unpackYearMonthDate(time)
    this._createReferenceIfDoesNotExist(year, month, date)
    this._tree[year][month][date].push(node)
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
    this._recordAtCorrespondingTreeNode(time, node)
    return node
  }

  public get(time: Date): Node[] | undefined {
    let { year, month, date } = unpackYearMonthDate(time)
    return (this._tree[year] && this._tree[year][month] && this._tree[year][month][date]) || undefined
  }
}

export default Timeline

type YearTree = {
  [year: number]: {
    [month: number]: {
      [day: number]: Node[]
    }
  }
}
