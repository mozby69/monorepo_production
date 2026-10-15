import type {
    PensionerClient,
} from "../types/ssp-domain.types";

export const clientMainFixtures: PensionerClient[] = [
    {
        id: 1,
        title: "Mr.",
        lastName: "Dela Cruz",
        firstName: "Juan",
        middleName: "Santos",
        suffix: null,
        nickname: "Juan",

        birthDate: "1955-06-15",
        birthPlace: "Bacolod City",

        addressId: 1,

        bankName: "Landbank",
        bankAccountNumber: "1234567890",

        gender: "Male",
        civilStatus: "Married",
        contactNumber: "09123456789",

        status: "Active",
        grouping: null,
        atmBranch: "Bacolod",

        plp: false,

        branchId: 1,
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
    },
];