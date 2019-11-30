import { expect } from 'chai'
import 'mocha'

import Timeline from './Timeline'

describe('Timeline', () => {
  it('should allow adding and retrieving a value to and from a specific day', () => {
    let time = new Timeline()
    time.set(new Date(), 'test')
    expect(time.get(new Date())).to.equal('test')
  })

  describe('order days correctly', () => {
    let time = new Timeline()
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
