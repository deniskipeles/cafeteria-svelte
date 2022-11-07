// @ts-nocheck
import PocketBase from 'pocketbase';
// import { student } from '$lib/store/user';



const url = 'https://bnet.fly.dev'
const client = new PocketBase(url);



/** @type {import('../$types').PageLoad} */
export async function load({ params }) {
    // console.log(params)
    // fetch a paginated records list
    const filter = `created >= "2022-01-01 00:00:00" && student_id = "${params.student}"`
    const resultList = await client.records.getList('orders', 1, 50, {
        filter,
        sort: '-created',
    });

    // console.log(resultList)

    // alternatively you can also fetch all records at once via getFullList:
    // const records = await client.records.getFullList('food', 200 /* batch size */, {
    //     sort: '-created',
    // });

    return {
        history:resultList,
        url
    };
}