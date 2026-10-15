import type {
    PensionerClient,
    PensionLoanInfo,
    LoanAccount,
} from "../types/ssp-domain.types";

import type {
    Pensioner,
    ActiveLoan,
    TransactionType,
    LoanStatus,
} from "../types/computationSlip.types";

const TRANSACTION_TYPES: TransactionType[] = [
    "NEW",
    "CLOSED_RENEW",
    "TRANSFER",
    "CHANGE_13TH_MONTH",
    "RETURNEE",
    "ADDITIONAL",
];

const LOAN_STATUSES: LoanStatus[] = [
    "ACTIVE",
    "CLOSED",
    "PAST_DUE",
];

export function mapPensionerToView(
    client: PensionerClient,
    pensionInfo: PensionLoanInfo | null
): Pensioner {
    const allowedStatuses = [
        "Active",
        "Inactive",
        "Pending",
    ] as const;

    const status = allowedStatuses.find(
        (value) => value === client.status
    );

    return {
        id: client.id,
        pensionerCode: String(client.id),

        firstName: client.firstName,
        lastName: client.lastName,
        middleName: client.middleName ?? undefined,

        birthDate: client.birthDate,
        bankName: client.bankName ?? "",

        actualPension:
            pensionInfo?.pensionAmount ?? 0,

        status: status ?? "Pending",
    };
}

export function mapLoanToView(
    loan: LoanAccount,
    context: {
        installment: number;
        paidTerms: number;
        supplementaryBalance: number;
        nextCollectionDate: string;
    }
): ActiveLoan {
    const transactionType = TRANSACTION_TYPES.find(
        (type) => type === loan.loanType
    );

    const loanStatus = LOAN_STATUSES.find(
        (status) => status === loan.loanStatus
    );

    if (!transactionType) {
        throw new Error(
            `Unsupported transaction type: ${loan.loanType}`
        );
    }

    if (!loanStatus) {
        throw new Error(
            `Unsupported loan status: ${loan.loanStatus}`
        );
    }

    return {
        id: loan.id,
        pensionerId: loan.clientId,

        accountNumber: loan.accountNo,
        transactionType,
        loanStatus,

        installment: context.installment,
        terms: loan.terms,
        paidTerms: context.paidTerms,

        principalAmount: loan.principalAmount,
        remainingBalance: loan.balanceAmount,

        supplementaryBalance:
            context.supplementaryBalance,

        effectivityDate:
            `${loan.yearEffectivity}-` +
            `${String(loan.monthEffectivity).padStart(2, "0")}-01`,

        transactionDate: loan.availmentDate,
        nextCollectionDate:
            context.nextCollectionDate,

        udi: loan.udiAmount,
    };
}