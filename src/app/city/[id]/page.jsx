export default async function cityList({ params }){
	const {id} = await params;
	return(<h1>City {params.id}</h1>)
}