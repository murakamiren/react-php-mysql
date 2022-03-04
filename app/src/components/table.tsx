import { Dispatch, SetStateAction, useState, VFC } from "react";
import { Tbody, Td, Tr, Button, useDisclosure, useToast } from "@chakra-ui/react";
import { testDataType } from "../../types/testDataType";
import EditModal from "./editModal";
import { handleDeleteUser } from "../utils/handleDeleteUser";
import { handleRestoreUser } from "../utils/handleRestoreUser";

type dataTableProps = {
	data: testDataType;
	setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

const DataTable: VFC<dataTableProps> = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [isRestore, setIsRestore] = useState<boolean>(false);
	const toast = useToast();

	const handleDelete = async () => {
		props.setIsSuccess(false);
		setIsDeleting(true);

		const text = await handleDeleteUser(props.data.id);
		if (text === "") {
			toast({
				title: "ユーザ削除",
				description: `ユーザー:${props.data.name}の削除に成功しました`,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			setIsDeleting(false);
			props.setIsSuccess(true);
		}
	};

	const handleRestore = async () => {
		props.setIsSuccess(false);
		setIsRestore(true);

		const text = await handleRestoreUser(props.data.id);
		if (text === "") {
			toast({
				title: "ユーザ復元",
				description: `ユーザー:${props.data.name}の復元に成功しました`,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			props.setIsSuccess(true);
			setIsRestore(false);
		}
	};
	return (
		<>
			<Tbody>
				<Tr key={props.data.id}>
					<Td>{props.data.id}</Td>
					<Td>{props.data.name}</Td>
					<Td>{props.data.age}歳</Td>
					<Td>{props.data.create_at}</Td>
					<Td isNumeric>
						{props.data.is_active ? (
							<>
								<Button colorScheme="messenger" size="sm" onClick={onOpen} mr={4}>
									変更する
								</Button>
								<Button colorScheme="red" size="sm" onClick={handleDelete} isLoading={isDeleting}>
									削除する
								</Button>
							</>
						) : (
							<Button colorScheme="teal" size="sm" onClick={handleRestore} isLoading={isRestore}>
								復元する
							</Button>
						)}
						<EditModal isOpen={isOpen} onClose={onClose} selectedData={props.data} setIsSuccess={props.setIsSuccess} />
					</Td>
				</Tr>
			</Tbody>
		</>
	);
};

export default DataTable;
