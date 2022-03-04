import { Dispatch, SetStateAction, VFC } from "react";
import { Tbody, Td, Tr, Button, useDisclosure } from "@chakra-ui/react";
import { testDataType } from "../types/testDataType";
import EditModal from "./editModal";

type dataTableProps = {
	data: testDataType;
	setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

const DataTable: VFC<dataTableProps> = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Tbody>
				<Tr key={props.data.id}>
					<Td>{props.data.id}</Td>
					<Td>{props.data.name}</Td>
					<Td>{props.data.age}歳</Td>
					<Td>{props.data.create_at}</Td>
					<Td isNumeric>
						<Button colorScheme="messenger" size="sm" onClick={onOpen}>
							変更する
						</Button>
						<EditModal isOpen={isOpen} onClose={onClose} selectedData={props.data} setIsSuccess={props.setIsSuccess} />
					</Td>
				</Tr>
			</Tbody>
		</>
	);
};

export default DataTable;
