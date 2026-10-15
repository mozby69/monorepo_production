import {
    TRANSACTION_TYPES,
    type TransactionType,
} from "@repo/shared";

type CashOutItem = {
    grossCashout: number;
    netCashOut: number;
    totalCashOut: number;
};

type CalculateNetCashOutParams = {
    transactionType: TransactionType;
    principalAmount: number;
    udi?: number;
    collectionFee?: number;
    processingFee?: number;
    loanProtectionFee?: number;
    icod?: number;
    supplementary?: number;
    activeLoanBalance?: number;
    udiRebate?: number;
    supplementaryCharge?: number;
    changeAmount?: number;
};

export function calculateNetCashOut({
    transactionType,
    principalAmount,
    udi = 0,
    collectionFee = 0,
    processingFee = 0,
    loanProtectionFee = 0,
    icod = 0,
    supplementary = 0,
    activeLoanBalance = 0,
    udiRebate = 0,
    supplementaryCharge = 0,
    changeAmount = 0,
}: CalculateNetCashOutParams): CashOutItem {
    let grossCashout = 0;
    let netCashOut = 0;
    let totalCashOut = 0;

    /**
     * CHANGE
     */
    if (
        transactionType ===
        TRANSACTION_TYPES.change
    ) {
        grossCashout =
            changeAmount;

        netCashOut =
            changeAmount -
            processingFee;

        totalCashOut =
            netCashOut;

        return {
            grossCashout:
                roundMoney(grossCashout),

            netCashOut:
                roundMoney(netCashOut),

            totalCashOut:
                roundMoney(totalCashOut),
        };
    }

    /**
     * Normal loan calculation
     */
    grossCashout =
        principalAmount -
        udi;

    netCashOut =
        grossCashout -
        collectionFee -
        processingFee -
        loanProtectionFee -
        icod;

    const baseTotalCashOut =
        netCashOut +
        supplementary;

    /**
     * RENEW
     */
    if (
        transactionType ===
        TRANSACTION_TYPES.renew
    ) {
        totalCashOut =
            baseTotalCashOut +
            udiRebate -
            activeLoanBalance -
            supplementaryCharge;
    }

    /**
     * NEW
     */
    else if (
        transactionType ===
        TRANSACTION_TYPES.new
    ) {
        totalCashOut =
            baseTotalCashOut;
    }

    /**
     * ADDITIONAL / RETURNEE /
     * TRANSFER / others
     *
     * Adjust later when their exact
     * business rules are finalized.
     */
    else {
        totalCashOut =
            baseTotalCashOut +
            udiRebate -
            supplementaryCharge;
    }

    return {
        grossCashout:
            roundMoney(grossCashout),

        netCashOut:
            roundMoney(netCashOut),

        totalCashOut:
            roundMoney(totalCashOut),
    };
}

function roundMoney(
    value: number
): number {
    return Math.round(
        value * 100
    ) / 100;
}