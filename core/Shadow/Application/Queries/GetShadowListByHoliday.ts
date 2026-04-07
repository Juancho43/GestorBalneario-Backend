/**
 * Represents a query to retrieve a list of shadows associated with a specific holiday.
 */
export class GetShadowListByHoliday {
    /**
     * @param {string} holidayId The unique identifier of the holiday.
     * @example 'clyg1z2x3c000008l0g1h2d3e4'
     */
    constructor(public holidayId: string) {}
}