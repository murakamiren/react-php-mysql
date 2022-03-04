export const handleDeleteUser = async (id: number) => {
	const restoreData = new FormData();

	restoreData.set("id", id.toString());
	restoreData.set("is_active", "0");

	const params = {
		method: "POST",
		body: restoreData,
	};

	const res = await fetch("http://localhost:5000/is_active_users.php", params);
	const text = res.text();

	console.log(text);

	return text;
};
