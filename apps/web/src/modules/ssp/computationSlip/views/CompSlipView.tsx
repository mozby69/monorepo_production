"use client"

import { Plus } from "lucide-react";
import CompSlipList from "../components/Contents/ComputationSlipList";
import { useDisclosure } from "@/hooks/useDisclosure";
import { Button } from "@/components/ui/button";
import Modal from "@/components/common/ModalHeader";
import ComputationSlipContent from "../components/Modals/ComputationSlipContent";

export default function CompSlipView() {

    const compSlipModal = useDisclosure();

    return (
        <div className="min-h-full bg-[#F8F9F6] p-8">
            {/* Page heading */}
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.13em] text-[#929A93]">
                        Create and manage pension loan computations.
                    </p>

                    <h1 className="text-[24px] font-semibold tracking-tight text-[#26342F]">
                        Recent Computation Slips
                    </h1>

                    <p className="mt-1 text-[13px] text-[#929A93]">
                        Recently created pension loan computations.
                    </p>
                </div>

                <button
                    onClick={compSlipModal.open}
                    type="button"
                    className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-[#26342F] px-4 text-[12px] font-medium text-white transition-colors hover:bg-[#374B40]"
                >
                    <Plus size={16} />
                    New Computation
                </button>
            </div>

            <CompSlipList
                onSelect={(computation) => {
                    console.log("View:", computation);
                }}
                onEdit={(computation) => {
                    console.log("Edit:", computation);
                }}
            />


            {/* Computation Slip Modal */}
            <Modal
                isOpen={compSlipModal.isOpen}
                onClose={compSlipModal.close}
                title="New Computation Slip"
                size="xxl"
                footer={
                    <>
                        <Button
                            type="button"
                        // onClick={handleCloseComputation}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                        // onClick={handleCloseComputation}
                        // disabled={!selectedPensioner}
                        >
                            Save as Draft
                        </Button>

                        <Button
                            type="submit"
                            form="computation-slip-form"
                        // disabled={!selectedPensioner}
                        >
                            Continue
                        </Button>
                    </>
                }
            >
                {/* Computation Slip Modal Content */}
                <ComputationSlipContent
                // onCreate={handleSaveComputation}
                />
            </Modal>

        </div>
    )
}