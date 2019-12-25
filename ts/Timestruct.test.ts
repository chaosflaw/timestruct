import { expect } from 'chai'
import 'mocha'

import Timestruct from './Timestruct'
import Node from './Node'

describe('Timeline', () => {
  it('should allow adding and retrieving a value to and from a specific day', () => {
    let time = new Timestruct()

    let node, date

    date = new Date()
    time.set(date, 'test')
    node = time.get(date)
    expect(node && node.value).to.equal('test')

    date = new Date(1998, 11, 25)
    time.set(date, 'test')
    node = time.get(date)
    expect(node && node.value).to.equal('test')
  })

  it('allows creating a date on .get if it does not exist yet', () => {
    let time = new Timestruct()
    let node = time.get(new Date(), true)
    expect(node).to.exist.and.be.an.instanceOf(Node)
  })

  describe('set should order days correctly', () => {
    let time = new Timestruct()
    // hours and below are used purely to ensure that the timeline keeps entries stored by day and, as such, hours, minutes and seconds should be irrelevant
    let day1 = time.set(new Date(2019, 5, 23, 12, 56, 43), 'day1')
    let day3 = time.set(new Date(2019, 6, 13), 'day3')
    let day2 = time.set(new Date(2019, 5, 26, 12), 'day2')
    let day4 = time.set(new Date(2019, 7, 20, 13, 56), 'day4')

    it('previous', () => {
      expect(day1 && day1.prev).to.not.exist
      expect(day2 && day2.prev && day2.prev.value).to.equal('day1')
      expect(day3 && day3.prev && day3.prev.value).to.equal('day2')
      expect(day4 && day4.prev && day4.prev.value).to.equal('day3')
    })

    it('next', () => {
      expect(day1 && day1.next && day1.next.value).to.equal('day2')
      expect(day2 && day2.next && day2.next.value).to.equal('day3')
      expect(day3 && day3.next && day3.next.value).to.equal('day4')
      expect(day4 && day4.next).to.not.exist
    })
  })
})
