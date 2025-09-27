//--------------------------------------------------------------------------//

interface IGETPosts {
    id: number,
    title: string,
    body: string,
    userId: number
}

const GETRequest = async (): Promise<IGETPosts> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "GET",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
    });

    return await response.json() as IGETPosts;
}

//--------------------------------------------------------------------------//

interface IData {
    title: string,
    body: string,
    userId: number,
}

interface IPOSTResponse {
    id: number,
    title: string,
    body: string,
    userId: number,
}

const POSTRequest = async (data: IData): Promise<IPOSTResponse> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(data)
    });

    return await response.json() as IPOSTResponse;
}

//--------------------------------------------------------------------------//

interface IPUTPost {
    id: number,
    title: string,
    body: string,
    userId: number,
}

const PUTRequest = async (data: IPUTPost): Promise<IPUTPost> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(data)
    });

    return await response.json() as IPUTPost;
}

//--------------------------------------------------------------------------//

const PATCHRequest = async (id: number, title: string): Promise<IPUTPost> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ title })
    })

    return await response.json() as IPUTPost;
}

//--------------------------------------------------------------------------//

const DELETERequest = async (id: number): Promise<void> => {
    await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ id })
    });
}

//--------------------------------------------------------------------------//

const Main = async () => {
    console.log(`-----------\nGET REQUEST\n-----------`);
    console.log(await GETRequest());

    console.log(`\n-----------\nPOST REQUEST\n-----------`);
    console.log(await POSTRequest({ title: "123", body: "sdfsdfsd", userId: 4 }));

    console.log(`\n-----------\nPUT REQUEST\n-----------`);
    console.log(await PUTRequest({ title: "123", body: "sdfsdfsd", userId: 4, id: 12 }));

    console.log(`\n-----------\nPATCH REQUEST\n-----------`);
    console.log(await PATCHRequest(35, "sjklfd;js"));

    console.log(`\n-----------\nDELETE REQUEST\n-----------`);
    console.log(await DELETERequest(43));
}

Main();