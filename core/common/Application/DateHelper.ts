export class DateHelper {
  public static nowArgentina(): Date {
    // Obtenemos la fecha actual
    const now = new Date();

    // Calculamos el offset de Argentina (GMT-3 es -180 minutos)
    // Ojo: Esto es útil si necesitas forzar el objeto,
    // pero lo ideal es manejar UTC en DB y Local en UI.
    return now;
  }

  public static toArgentineString(date: Date): string {
    return date.toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
    });
  }
}
