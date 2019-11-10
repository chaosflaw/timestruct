export default class LinkedList {
  private _length: number
  private _head: Node | null
  private _tail: Node | null

  constructor() {
    this._length = 0
    this._head = null
    this._tail = null
  }

  get length() {
    return this._length
  }

  get head() {
    return this._head
  }

  get tail() {
    return this._tail
  }

  public exists(position: number) {
    return position > this._length || position < 1 || this._length === 0
  }

  public append(value) {
    let node = new Node(value, this._tail)

    if (this._length) {
      ;(this._tail as Node).next = node // if length is not 0, this._tail will always exist
      node.prev = this.tail
      this._tail = node
    } else {
      this._head = node
      this._tail = node
    }

    this._length++

    return node
  }

  public get(position: number) {
    if (!this.exists(position)) throw new Error('Non-existent node')

    let currentNode = this._head as Node, // this.head will always exist as we've already checked for length 0
      count = 1

    while (count < position) {
      currentNode = currentNode.next as Node // next will always exist as we never reach the tail
      count++
    }

    return currentNode
  }

  public remove(position: number) {
    if (!this.exists(position)) throw Error('Non-existent node')

    let nodeToRemove = this.get(position)

    // First node is removed
    if (position === 1) {
      let head = this._head as Node
      this._head = head.next // Move the head one unit forward

      // There was a second node; it's now the head, so set its prev to null
      if (this._head) this._head.prev = null
      // There was no second node; set the tail to null, as it's still referencing the previous head
      else this._tail = null

      // Remove last node
    } else if (position === this._length) {
      let tail = this._tail as Node
      this._tail = tail.prev // Move the tail one unit back
      ;(this._tail as Node).next = null // Dereference the deleted node
    } else {
      let beforeNodeToRemove = nodeToRemove.prev as Node
      let afterNodeToRemove = nodeToRemove.next as Node

      // Link the gap
      beforeNodeToRemove.next = afterNodeToRemove
      afterNodeToRemove.prev = beforeNodeToRemove
    }

    this._length--

    return nodeToRemove
  }
}

class Node {
  public value: any
  public next: Node | null
  public prev: Node | null

  constructor(value: any, prev: Node | null = null, next: Node | null = null) {
    this.value = value
    this.next = next
    this.prev = prev
  }
}
