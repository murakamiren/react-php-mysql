import {
	FormControl,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	VStack,
	FormLabel,
	Input,
	FormHelperText,
	Button,
	ModalFooter,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useRef, VFC } from "react";
import { testDataType } from "../types/testDataType";

type editModalProps = {
	isOpen: boolean;
	onClose: () => void;
	selectedData: testDataType;
	setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

const EditModal: VFC<editModalProps> = (props) => {
	const selectedName = useRef<HTMLInputElement>(null);
	const selectedAge = useRef<HTMLInputElement>(null);

	const handleUpdate = async () => {
		if (selectedName.current && selectedAge.current) {
			props.setIsSuccess(false);
			const updateData = new FormData();
			updateData.set("name", selectedName.current.value);
			updateData.set("age", selectedAge.current.value);
			updateData.set("id", props.selectedData.id.toString());

			const params = {
				method: "POST",
				body: updateData,
			};

			const res = await fetch("http://localhost:5000/update_users.php", params);
			const text = await res.text();

			console.log(text);
			if (text === "") {
				props.onClose();
				props.setIsSuccess(true);
			}
		}
	};

	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose} blockScrollOnMount={true} size="xl">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>ユーザー情報を変更する</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl>
						<VStack justify="start" spacing={4}>
							<FormControl>
								<FormLabel htmlFor="name">name</FormLabel>
								<Input
									id="name"
									type="text"
									ref={selectedName}
									placeholder={"現在の名前: " + props.selectedData.name}
									required
								/>
								<FormHelperText>this name will be display name</FormHelperText>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="name">age</FormLabel>
								<Input
									id="age"
									type="number"
									ref={selectedAge}
									placeholder={"現在の年齢: " + props.selectedData.age}
									required
								/>
								<FormHelperText>what`s your age?</FormHelperText>
							</FormControl>
						</VStack>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="messenger" mr={3} onClick={handleUpdate}>
						変更する
					</Button>
					<Button colorScheme="blackAlpha" onClick={props.onClose}>
						キャンセル
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default EditModal;
