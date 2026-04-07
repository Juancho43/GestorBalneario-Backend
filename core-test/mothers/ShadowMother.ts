import {Shadow} from "../../core/Shadow/Model/Shadow";
import {Coords} from "../../core/common/Model/Coords";
import {UUID} from "../../core/common/Model/UUID";
import {StringObject} from "../../core/common/Model/StringObject";
import {ShadowType} from "../../core/Shadow/Model/ValueObjects/ShadowType";
import {Timestamps} from "../../core/common/Model/Timestamps";
import {SoftDelete} from "../../core/common/Model/SoftDelete";

export class ShadowMother {
    static create(overrides: Partial<{
        id: UUID;
        season: UUID;
        identifier: StringObject;
        type: ShadowType;
        coords: Coords;
        timestamp: Timestamps;
        softDelete: SoftDelete;
    }> = {}): Shadow {
        // Definimos los valores por defecto "sensatos"
        const defaults = {
            id: overrides.id ?? UUID.create(),
            season: overrides.season ?? UUID.create(),
            identifier: overrides.identifier ?? StringObject.create('A-1'),
            type: overrides.type ?? ShadowType.create('Carpa'), // Asumiendo un enum o valor base
            coords: overrides.coords ?? Coords.create(0, 0),
            timestamp: overrides.timestamp ?? Timestamps.create(),
            softDelete: overrides.softDelete ?? SoftDelete.empty(),
        };

        return Shadow.create(
            defaults.id,
            defaults.season,
            defaults.identifier,
            defaults.type,
            defaults.coords,
            defaults.timestamp,
            defaults.softDelete
        );
    }
}