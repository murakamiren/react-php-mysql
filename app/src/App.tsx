import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	HStack,
	Input,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useRef, useState, VFC } from "react";
import { testDataType } from "../types/testDataType";

const App: VFC = () => {
	const [data, setData] = useState<testDataType[]>([]);
	const [isSuccess, setIsSuccess] = useState<boolean>();
	const name = useRef<HTMLInputElement>(null);
	const age = useRef<HTMLInputElement>(null);

	const submitData = async () => {
		if (name.current !== null && age.current !== null) {
			if (name.current.value !== "" && age.current.value !== "") {
				// const ageToNum = Number(age.current.value);
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
					setIsSuccess(true);
				} else {
					setIsSuccess(false);
				}
			}
		}
	};

	const fetchData = async () => {
		const res = await fetch("http://localhost:5000/test.php");
		console.log(res);
		const json = await res.json();
		setData(json);

		console.log(json);
	};

	return (
		<div>
			<Box px={4}>
				<Heading as="h1">Hello Vite + React + TypeScript + php + Mysql</Heading>
				<Text>
					<Button type="button" onClick={fetchData} colorScheme="facebook">
						fetch data
					</Button>
				</Text>
				<Heading as="h2">result</Heading>
				{data.map((d) => (
					<Box key={d.id}>
						<HStack spacing={4}>
							<Text>id: {d.id}</Text>
							<Text>name: {d.name}</Text>
							<Text>age: {d.age}</Text>
							<Text>create at: {d.create_at}</Text>
						</HStack>
					</Box>
				))}
				<Box w="70%" mt={24}>
					<VStack justify="start" spacing={4}>
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
						<Button onClick={submitData}>submit</Button>
						{isSuccess && <Text>データ登録成功しました！</Text>}
					</VStack>
				</Box>
			</Box>
		</div>
	);
};

export default App;
