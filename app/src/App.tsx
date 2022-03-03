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
			<header>
				<p>Hello Vite + React + TypeScript + php + Mysql</p>
				<p>
					<button type="button" onClick={fetchData}>
						fetch data
					</button>
				</p>

				<p>result</p>
				{data.map((d) => (
					<div key={d.id}>
						<p>{d.id}</p>
						<p>{d.name}</p>
						<p>{d.age}</p>
						<p>{d.create_at}</p>
					</div>
				))}
			</header>
		</div>
	);
};

export default App;
