import { Box, Button, Center, Heading, HStack, Text } from "@chakra-ui/react";
import { useState, VFC } from "react";
import { testDataType } from "../types/testDataType";

const App: VFC = () => {
	const [data, setData] = useState<testDataType[]>([]);

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
			</Box>
		</div>
	);
};

export default App;
