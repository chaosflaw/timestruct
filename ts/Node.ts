export default class Node {
  public value: any
  public next: Node | null
  public prev: Node | null
  constructor(value: any, prev: Node | null = null, next: Node | null = null) {
    this.value = value
    this.next = next
    this.prev = prev
  }
}
