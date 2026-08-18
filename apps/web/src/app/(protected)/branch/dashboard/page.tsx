"use client"

import Modal from "@/components/common/ModalHeader"
import { useDisclosure } from "@/hooks/useDisclosure"

export default function Sample() {
    const userModal = useDisclosure();
    const nesteduserModal = useDisclosure();

 

    const openModal = () => {
        userModal.open();
    }

    const closeModal = () => {
        userModal.close();
    }

    const openModal2 = () => {
        nesteduserModal.open();
    }

    const closeModal2 = () => {
        nesteduserModal.close();
    }

    return (
        <div>

            <button type="button" onClick={openModal}>dsfsd</button>

        
            <Modal onClose={closeModal} isOpen={userModal.isOpen} title="sdfsdf" size="lg">
                <div>
                    <div className="p-20">
                        <h2>lorem ipsum dolor</h2>
                        <button onClick={openModal2}
                         className="bg-green-800 p-4 text-white">Enter</button>
                    </div>
       
                </div>
            </Modal>
        


         <Modal onClose={closeModal2} isOpen={nesteduserModal.isOpen} title="enter">
            <div>sdfsdfsdfds</div>
            </Modal>
            

        </div>




    )
}