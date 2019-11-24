export default class Node {
  public value: any
  public time: Date
  public next: Node | null
  public prev: Node | null

  constructor(value: any, time: Date, prev: Node | null = null, next: Node | null = null) {
    this.value = value
    this.next = next
    this.prev = prev
    this.time = time
  }
}
