import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function ModalUi({passSize,headerText,body,onRoleUpdate}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState(passSize)

  const sizes = [passSize];


  const handleOpen = (size) => {
    setSize(size)
    onOpen();
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <Button color="success" size="sm" variant="flat" key={size} onPress={() => handleOpen(size)}>Update</Button>
        ))}  
      </div>
      <Modal 
        size={size} 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent>
     
          {(onClose) => (
            <>
              <ModalHeader className="light flex flex-col gap-1">
                {headerText}
              </ModalHeader>
              <ModalBody className="light">
                {body}
              </ModalBody>
              <ModalFooter>
                <Button className="light" color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className="light" color="success" variant="flat" onPress={()=>{ onRoleUpdate(), onClose() }}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
