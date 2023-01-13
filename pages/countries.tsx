import { supabase } from "../lib/supabaseClient"

type Country = {
    id: number
    name: string
}

const Countries = ({ countries }: { countries: Country[] }) => {
    console.log(countries);

    return (<div>hi</div>)
}

export async function getServerSideProps() {
    let { data } = await supabase.from('links').select()
    console.log(data);

    return {
        props: {
            countries: data
        },
    }
}

export default Countries

