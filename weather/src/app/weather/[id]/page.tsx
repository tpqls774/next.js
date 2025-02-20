import WeatherInfo from "@/components/weather-info"
import { Suspense } from "react";

type IdType = Promise<{
    id: string;
}>

export default async function City(props: { params: IdType }) {
    const params = await props.params
    const id = params.id

    return (
        <Suspense fallback={<h1>Loading Weather Info</h1>}>
            <WeatherInfo id={id} />
        </Suspense>
    )
}
