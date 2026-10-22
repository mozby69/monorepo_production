├── packages/
│   │
│   ├── shared/                                             # Contracts shared by frontend and backend
│   │   ├── src/
│   │   │   ├── logic/                                    # Shared logic | rules | calculation
│   |   │   |   ├── calculations/
│   |   │   │   |    ├── applySupplementaryPayment.ts
│   |   │   |   |    ├── calculateCollectionFee.ts
│   |   │   │   |    ├── calculateComputationSlip.ts
│   |   │   |   |    ├── calculateICOD.ts
│   |   │   │   |    ├── calculateLoanProtectionFee.ts
│   |   │   |   |    ├── calculateNetCashOut.ts
│   |   │   │   |    ├── calculateProcessingFee.ts
│   |   │   |   |    ├── calculateRenewalBalance.ts
│   |   │   │   |    ├── calculateSLScheduleSpread.ts
│   |   │   |   |    ├── calculateSLToDeductCharge.ts
│   |   │   │   |    ├── calculateUDIAmount.ts
│   |   │   |   |    ├── calculateUDIRebateAmount.ts
│   |   │   |   |    ├── calculateUDIRebateSchedule.ts
|   |   |   |   |    ├── calculateChargePayment.ts - new
|   |   |   |   |    ├── calculateSelectedDeductions.ts - new
|   |   |   |   |    ├── calculatePreviousFeePayments - new
│   |   │   │   |    └── loanScheduleSpread.ts
│   |   │   |   |
│   |   │   |   |
│   |   │   |   ├── rules/
│   |   │   |   |    ├── allowedSLPercentage.ts
│   |   │   |   |    ├── canCalculateTransaction.ts
│   |   │   |   |    ├── getLoanEffectivityDate.ts
│   |   │   |   |    ├── getMaximumSLTerm.ts
│   |   │   |   |    ├── getMaximumTerm.ts
│   |   │   |   |    ├── getUDIEffectivityDate.ts
│   |   │   |   |    ├── getUDIRebateLookupDate.ts
│   |   │   |   |    ├── getWithdrawalDate.ts
│   |   │   │   |    └── isEligibleToTransact.ts
|   |   |   |   |
│   |   │   │   └── index.ts                                # Public logic exports 
|   |   |   |












computationSupplementaryCharges.manager.ts — we've already reviewed this file. It contains pure charge selection calculations and has no React or Prisma dependencies.

computationCollection.manager.ts — review collection settlement and paid-term logic.

computationRenewal.manager.ts — compare against your existing calculateRenewalBalance.ts.

computationSchedule.manager.ts — compare against existing schedule calculations.

computationEffectivity.manager.ts — check whether existing shared date rules already cover it.

computationSupplementary.manager.ts — separate fixture retrieval from business calculations.

computation.manager.ts — move the core orchestration once its dependencies are shared.


DeductionCode
Existing reusable master table
ICOD · COLL_FEE · PROC_FEE · LP_FEE


PenDeductionFeeItem
Calculated amount · Deducted amount · Outstanding balance
Each item references a DeductionCode


PenDeductionsFees
One deduction group per computation slip


PenLoan / SSPLoan
pen_deduct_id → PenDeductionsFees.id


Additional payment history
PenDeductionPayment | deduction payment ledger
References original fee item and paying transaction