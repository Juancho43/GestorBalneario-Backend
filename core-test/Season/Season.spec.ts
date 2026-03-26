import {SeasonMother} from "./SeasonMother";
import {UUID} from "../../core/common/Model/UUID";
import {Timestamps} from "../../core/common/Model/Timestamps";
import {SoftDelete} from "../../core/common/Model/SoftDelete";

describe('Season Domain Entity', () => {
    it('Should be created', () => {
        const startDate = new Date('2026-03-01')
        const endDate = new Date('2026-06-01')
        const season = SeasonMother.create(UUID.create(), startDate,endDate,Timestamps.create(),SoftDelete.empty());
        expect(season.startDate).toEqual(startDate);
        expect(season.endDate).toEqual(endDate);
    })

    it('Should not be created if the end date its before start date', () => {
        const startDate = new Date();
        const endDate = new Date('2020-03-01');
       expect(() => SeasonMother.create(UUID.create(),startDate,endDate,Timestamps.create(),SoftDelete.empty())).toThrow();
    })
})