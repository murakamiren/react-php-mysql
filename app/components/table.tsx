import { Dispatch, SetStateAction, useState, VFC } from "react";
import { Tbody, Td, Tr, Button, useDisclosure, useToast } from "@chakra-ui/react";
import { testDataType } from "../types/testDataType";
import EditModal from "./editModal";

type dataTableProps = {
	data: testDataType;
	setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

const DataTable: VFC<dataTableProps> = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const toast = useToast();

	const handleDelete = async () => {
		props.setIsSuccess(false);
		setIsDeleting(true);

		const deleteData = new FormData();
		deleteData.set("id", props.data.id.toString());
		deleteData.set("is_active", "0");

		console.log(deleteData.getAll);

		const params = {
			method: "POST",
			body: deleteData,
		};

		const res = await fetch("http://localhost:5000/delete_users.php", params);
		const text = await res.text();
		console.log(text);
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
	return (
		<>
			<Tbody>
				<Tr key={props.data.id}>
					<Td>{props.data.id}</Td>
					<Td>{props.data.name}</Td>
					<Td>{props.data.age}歳</Td>
					<Td>{props.data.create_at}</Td>
					<Td isNumeric>
						<Button colorScheme="messenger" size="sm" onClick={onOpen} mr={4}>
							変更する
						</Button>
						<Button colorScheme="red" size="sm" onClick={handleDelete} isLoading={isDeleting}>
							削除する
						</Button>
						<EditModal isOpen={isOpen} onClose={onClose} selectedData={props.data} setIsSuccess={props.setIsSuccess} />
					</Td>
				</Tr>
			</Tbody>
		</>
	);
};

export default DataTable;
