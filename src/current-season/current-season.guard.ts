import {CanActivate, ExecutionContext, Inject, Injectable} from '@nestjs/common';
import {GetActiveSeasonService} from "../seasons/services/get-active-season/get-active-season.service";

@Injectable()
export class CurrentSeasonGuard implements CanActivate {


  constructor(@Inject() private currentSeason: GetActiveSeasonService) {
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Acceso en minúsculas
    const headerId = request.headers['x-season'];
    if (!headerId) return false;
    const season = await this.currentSeason.get();
    return headerId === season.id.value;
  }
}

