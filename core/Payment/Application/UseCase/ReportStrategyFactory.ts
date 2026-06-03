import { CsvReportStrategy } from "./Reports/CsvReportStrategy";
import {JsonReportStrategy} from "./Reports/JsonReport";
import {ReportStrategy} from "./Reports/ReportStrategy";
import {HtmlReportStrategy} from "./Reports/HtmlReportStrategy";

export class ReportStrategyFactory {
    private readonly strategies: Record<string, ReportStrategy>;

    constructor() {
        this.strategies = {
            csv: new CsvReportStrategy(),
            json: new JsonReportStrategy(),
            imprimir: new HtmlReportStrategy(),
        };
    }

    getStrategy(format: string): ReportStrategy {
        return this.strategies[format] || this.strategies['json'];
    }
}