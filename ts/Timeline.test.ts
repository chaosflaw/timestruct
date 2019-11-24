import { expect } from 'chai'
import 'mocha'

import Timeline from './Timeline'

describe('Timeline', () => {
  it('should allow adding and retrieving a value to and from a specific day', () => {
    let time = new Timeline()
    time.set(new Date(), 'test')
    expect(time.get(new Date())).to.equal('test')
  })

  it('should allow accessing the next and previous days that contain a value', () => {
    let time = new Timeline()
    // hours and below are used purely to ensure that the timeline keeps entries stored by day and, as such, hours, minutes and seconds should be irrelevant
    time.set(new Date(2019, 5, 23, 12, 56, 43), 'day1')
    time.set(new Date(2019, 6, 13), 'day3')
    time.set(new Date(2019, 5, 26, 12), 'day2')
    time.set(new Date(2019, 7, 20, 13, 56), 'day4')

    let day1 = time.get(new Date(2019, 5, 23))
    expect(day1.next.value).to.equal('day2')

    let day4 = time.get(new Date(2019, 7, 20))
    expect(day4.prev.value).to.equal('day3')
  })
})
