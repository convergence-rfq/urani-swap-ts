import { Modal } from "@mantine/core";
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface RoutingModalProps {
    opened: boolean;
    open: () => void;
    close: () => void;
  }
  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
export default function RoutingModal({opened,close}:RoutingModalProps){
    return(
        <Modal 
        opened={opened}
        onClose={() => {
          close();
        }} 
        centered
        size="lg"
        title="Routing"
        radius="lg"
        classNames={{
          content: "bg-[#313e4c] text-white token_select_modal",
          header: "bg-[#313e4c] sticky text-white token_select_modal_header",
          title: "font-bold text-xl text-white",
        }}>
            <div className="reactFlow-scroll w-full flex-1 rounded-2xl bg-[#171C22]" style={{ width: '100%', height: '300px' }}>
                <ReactFlow nodes={initialNodes} edges={initialEdges} />
            </div>

        </Modal>
    )
}