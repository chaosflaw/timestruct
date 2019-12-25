export default class Node {
  public value: any
  public time: Date
  public next?: Node
  public prev?: Node

  constructor(value: any, time: Date, prev?: Node, next?: Node) {
    this.value = value
    this.next = next
    this.prev = prev
    this.time = time
  }
}
