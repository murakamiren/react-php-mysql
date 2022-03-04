import {
	Box,
	Button,
	Center,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	Table,
	TableCaption,
	Text,
	Th,
	Thead,
	Tr,
	useToast,
	VStack,
	Switch,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState, VFC } from "react";
import { testDataType } from "../types/testDataType";
import DataTable from "./components/table";

const App: VFC = () => {
	const [data, setData] = useState<testDataType[]>([]);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isLoad, setIsLoad] = useState<boolean>(false);
	const toast = useToast();
	const name = useRef<HTMLInputElement>(null);
	const age = useRef<HTMLInputElement>(null);
	const [isShowDelUser, setIsShowDelUser] = useState<boolean>(false);
	const [filterNum, setFilterNum] = useState<0 | 1>(1);

	const submitData = async () => {
		if (name.current !== null && age.current !== null) {
			if (name.current.value !== "" && age.current.value !== "") {
				// const ageToNum = Number(age.current.value);
				setIsSuccess(false);
				setIsLoad(true);
				const inputData = new FormData();
				inputData.set("name", name.current.value);
				inputData.set("age", age.current.value);
				const params = {
					method: "POST",
					body: inputData,
				};
				const res = await fetch("http://localhost:5000/post.php", params);
				const text = await res.text();
				console.log(text);
				if (text === "") {
					setIsLoad(false);
					setIsSuccess(true);
					toast({
						title: "テータ登録",
						description: "データの登録に成功しました",
						status: "success",
						duration: 3000,
						isClosable: true,
					});
					name.current.value = "";
					age.current.value = "";
				} else {
					setIsLoad(false);
					setIsSuccess(false);
					toast({
						title: "エラー",
						description: "データの登録に失敗しました",
						status: "error",
						duration: 3000,
						isClosable: true,
					});
				}
			}
		}
	};

	const fetchDataCallback = useCallback(async () => {
		const res = await fetch("http://localhost:5000/test.php");
		console.log(res);
		const json = await res.json();
		setData(json);

		console.log(json);
	}, [data]);

	useEffect(() => {
		if (isSuccess) {
			fetchDataCallback();
			console.log("get data");
		} else {
			//do nothing
		}
	}, [isSuccess]);

	useEffect(() => {
		isShowDelUser ? setFilterNum(0) : setFilterNum(1);
	}, [isShowDelUser]);

	return (
		<div>
			<Box px={4}>
				<Center mb={8}>
					<Heading as="h1" fontSize="2xl">
						Hello Vite + React + TypeScript + php + Mysql
					</Heading>
				</Center>
				<Text>
					<Button type="button" onClick={fetchDataCallback} colorScheme="messenger">
						fetch data
					</Button>
				</Text>
				<Text>
					削除されたユーザーも表示する
					<Switch onChange={() => setIsShowDelUser(!isShowDelUser)} ml={4} />
				</Text>
				<Heading as="h2" fontSize="xl">
					result
				</Heading>
				<Table variant="simple">
					<TableCaption>users data</TableCaption>
					<Thead>
						<Tr>
							<Th>id</Th>
							<Th>名前</Th>
							<Th>年齢</Th>
							<Th>作成日</Th>
						</Tr>
					</Thead>
					{data
						.filter((d) => d.is_active === 1 || d.is_active === filterNum)
						.map((usr) => (
							<DataTable key={usr.id} data={usr} setIsSuccess={setIsSuccess} />
						))}
				</Table>
				<Box w="full" mt={12}>
					<VStack spacing={2} w="full">
						<Heading as="h2" fontSize="xl" mb={4}>
							データ登録
						</Heading>
						<VStack justify="start" spacing={4} w="70%">
							<FormControl>
								<FormLabel htmlFor="name">name</FormLabel>
								<Input id="name" type="text" ref={name} placeholder="ex: 藤江諒" required />
								<FormHelperText>this name will be display name</FormHelperText>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="name">age</FormLabel>
								<Input id="age" type="number" ref={age} placeholder="ex: 20" required />
								<FormHelperText>what`s your age?</FormHelperText>
							</FormControl>
							<Button onClick={submitData} isLoading={isLoad} colorScheme="messenger">
								submit
							</Button>
						</VStack>
					</VStack>
				</Box>
			</Box>
		</div>
	);
};

export default App;
