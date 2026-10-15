export type ScheduleType =
    | "loan"
    | "supplementary"
    | "udi-rebate";

export interface ScheduleRow {
    term: number;
    dueDate: string;

    installment: number;

    principal?: number;
    interest?: number;

    beginningBalance?: number;
    endingBalance?: number;

    rebate?: number;
}

export interface ComputationSchedules {
    loan: ScheduleRow[];
    supplementary: ScheduleRow[];
    udiRebate: ScheduleRow[];
}