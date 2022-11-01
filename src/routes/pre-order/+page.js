import PocketBase from 'pocketbase';

const url = 'https://bnet.fly.dev'
const client = new PocketBase(url);



/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    // fetch a paginated records list
    const resultList = await client.records.getList('food', 1, 50, {
        filter: 'created >= "2022-01-01 00:00:00"',
    });

    // console.log(resultList)

    // alternatively you can also fetch all records at once via getFullList:
    // const records = await client.records.getFullList('food', 200 /* batch size */, {
    //     sort: '-created',
    // });

    return {
        food_items:resultList,
        url
    };
}