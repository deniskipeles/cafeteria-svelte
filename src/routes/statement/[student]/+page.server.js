import PocketBase from 'pocketbase';

const url = 'https://bnet.fly.dev'
const client = new PocketBase(url);



/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    // fetch a paginated records list
    const filter = `created >= "2022-01-01 00:00:00" && student_id = "${params.student}"`
    let resultList = await client.records.getList('orders', 1, 50, {
        filter,
        sort: '-created',
    });
    // console.log(resultList)
    resultList = JSON.stringify(resultList)
    resultList = JSON.parse(resultList)

    return {
        history:resultList,
        url
    };
}