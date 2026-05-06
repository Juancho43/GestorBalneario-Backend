import {SeasonMother} from '../mothers/SeasonMother';
import {StringObject} from '../../core/common/Model/StringObject';
import {InvalidDatesError} from '../../core/common/Model/Errors/InvalidDates';

describe('Season Domain Entity', () => {
  it('Should be created', () => {
    const startDate = new Date('2026-03-01');
    const endDate = new Date('2026-06-01');
    const name = StringObject.create('Season 2026');
    const season = SeasonMother.create({
      name: name,
      startDate: startDate,
      endDate: endDate,
    });
    expect(season.startDate).toEqual(startDate);
    expect(season.endDate).toEqual(endDate);
  });

  it('Should not be created if the end date its before start date', () => {
    const startDate = new Date();
    const endDate = new Date('2020-03-01');
    const name = StringObject.create('Season 2026');
    expect(() =>
      SeasonMother.create({
        startDate: startDate,
        endDate: endDate,
        name: name,
      }),
    ).toThrow(InvalidDatesError);
  });
});
