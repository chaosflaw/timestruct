import Node from './Node'
import unpackYearMonthDate from './util/unpackYearMonthDate'

class Timestruct {
  /** Latest day in the timeline. */
  private _latest?: Node
  /** Earliest day in the timeline. */
  private _earliest?: Node
  /** Tree divided by year/month/day. Used for accessing nodes at specific dates with .get */
  private _tree: YearTree

  private _length: number

  constructor() {
    this._latest
    this._earliest
    this._tree = {}
    this._length = 0
  }

  /** Earliest node in the timeline */
  get earliest() {
    return this._earliest
  }

  /** Latest node in the timeline */
  get latest() {
    return this._latest
  }

  /** Adds a node to the end of the timeline and sets it as latest */
  private _append(node: Node): void {
    let latest = this._latest
    // set value in the day immediately following the head
    if (latest) {
      latest.next = node
      node.prev = latest
    }

    this._latest = node
  }

  /** Adds a node to the beginning of the timeline and sets it as earliest */
  private _prepend(node: Node): void {
    let earliest = this._earliest
    // set value in the day immediately following the head
    if (earliest) {
      earliest.prev = node
      node.next = earliest
    }

    this._earliest = node
  }

  /**
   * Initializes an empty object at the specified year and month, if they do not exist.
   * Guarantees that a month can be used.
   */
  private _createReferenceIfDoesNotExist(year: number, month: number) {
    if (!this._tree[year]) this._tree[year] = {}
    if (!this._tree[year][month]) this._tree[year][month] = {}
  }

  /**
   * Records a Node at a specified date in the tree. Overrides existing Node if it exists.
   * @param time - A Date object containing the date to record to.
   * @param node - The Node to record.
   */
  private _recordInTree(time: Date, node: Node): void {
    let { year, month, date } = unpackYearMonthDate(time)
    this._createReferenceIfDoesNotExist(year, month)
    this._tree[year][month][date] = node
  }

  public set(time: Date, value: any): Node {
    let node = new Node(value, time)

    if (!this._latest) {
      // If no nodes exist yet, set this node as the only one in the tree.
      this._latest = node
      this._earliest = node
      this._length++
    } else {
      let { year, month, date } = unpackYearMonthDate(time)
      let currentNode = this._tree[year] && this._tree[year][month] && this._tree[year][month][date]

      // If a node already exists at this location, replace it with the new one
      if (currentNode) {
        node.prev = currentNode.prev
        node.next = currentNode.next
        if (this._length === 1) {
          this._latest = node
          this._earliest = node
        }
      } else {
        // No node currently exists on this day. At this point we've already checked the tree structure and ensured only one node exists on each day.
        // This block is linked list logic.
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
        this._length++
      }
    }
    this._recordInTree(time, node)
    return node
  }

  public get(time: Date, { create }: { create: true } & GetOptions): Node
  public get(time: Date, { create }: { create: false } & GetOptions): Node | undefined
  public get(time: Date, { create }: GetOptions = {}): Node | undefined {
    let { year, month, date } = unpackYearMonthDate(time)
    let existingNode = (this._tree[year] && this._tree[year][month] && this._tree[year][month][date])
    if (!existingNode && create) existingNode = this.set(time, undefined)
    return existingNode
  }
}

export default Timestruct

type YearTree = {
  [year: number]: {
    [month: number]: {
      [day: number]: Node
    }
  }
}

interface GetOptions {
  /** Initialize a node if it does not exist yet. */
  create?: boolean
}