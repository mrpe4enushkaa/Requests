//--------------------------------------------------------------------------//
// РАЗДЕЛ: GET-запрос - получение данных с сервера

// Интерфейс описывает структуру данных поста, который мы получаем от сервера
interface IGETPosts {
    id: number,        // Уникальный идентификатор поста
    title: string,     // Заголовок поста
    body: string,      // Текст/содержание поста
    userId: number     // ID пользователя, которому принадлежит пост
}

// Функция для выполнения GET-запроса к API
const GETRequest = async (): Promise<IGETPosts> => {
    // Отправляем запрос на получение данных
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "GET", // Метод запроса - получение данных
        headers: { "Content-Type": "application/json; charset=UTF-8" }, // Указываем тип данных
    });

    // Преобразуем ответ в JSON и приводим к типу IGETPosts
    return await response.json() as IGETPosts;
}

//--------------------------------------------------------------------------//
// РАЗДЕЛ: POST-запрос - создание новых данных на сервере

// Интерфейс для данных, которые мы отправляем на сервер при создании
interface IData {
    title: string,     // Заголовок нового поста
    body: string,      // Текст нового поста
    userId: number,    // ID пользователя, создающего пост
}

// Интерфейс для ответа сервера после создания поста
interface IPOSTResponse {
    id: number,        // ID созданного поста (генерируется сервером)
    title: string,     // Заголовок поста
    body: string,      // Текст поста
    userId: number,    // ID пользователя
}

// Функция для создания нового поста
const POSTRequest = async (data: IData): Promise<IPOSTResponse> => {
    // Отправляем POST-запрос с данными нового поста
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "POST", // Метод запроса - создание данных
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(data) // Преобразуем объект в JSON-строку
    });

    // Возвращаем ответ сервера (созданный пост с ID)
    return await response.json() as IPOSTResponse;
}

//--------------------------------------------------------------------------//
// РАЗДЕЛ: PUT-запрос - полное обновление существующих данных

// Интерфейс для данных, необходимых для полного обновления поста
interface IPUTPost {
    id: number,        // ID поста, который нужно обновить
    title: string,     // Новый заголовок
    body: string,      // Новый текст
    userId: number,    // ID пользователя
}

// Функция для полного обновления поста
const PUTRequest = async (data: IPUTPost): Promise<IPUTPost> => {
    // PUT-запрос на конкретный пост (указываем ID в URL)
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, {
        method: "PUT", // Метод запроса - полное обновление
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(data) // Отправляем все данные поста
    });

    // Возвращаем обновленный пост
    return await response.json() as IPUTPost;
}

//--------------------------------------------------------------------------//
// РАЗДЕЛ: PATCH-запрос - частичное обновление данных

// Функция для частичного обновления поста (только заголовка)
const PATCHRequest = async (id: number, title: string): Promise<IPUTPost> => {
    // PATCH-запрос на обновление только указанных полей
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PATCH", // Метод запроса - частичное обновление
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ title }) // Отправляем только поле title
    })

    // Возвращаем обновленный пост
    return await response.json() as IPUTPost;
}

//--------------------------------------------------------------------------//
// РАЗДЕЛ: DELETE-запрос - удаление данных

// Функция для удаления поста
const DELETERequest = async (id: number): Promise<void> => {
    // Отправляем DELETE-запрос для удаления поста
    await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "DELETE", // Метод запроса - удаление
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ id }) // Указываем ID поста для удаления
    });
    // Функция возвращает Promise<void>, так как от сервера не ожидаем данных
}

//--------------------------------------------------------------------------//
// РАЗДЕЛ: Основная функция - демонстрация работы всех запросов

// Главная функция, которая выполняет все типы запросов по очереди
const Main = async () => {
    // Демонстрация GET-запроса
    console.log(`-----------\nGET REQUEST\n-----------`);
    console.log(await GETRequest());

    // Демонстрация POST-запроса (создание нового поста)
    console.log(`\n-----------\nPOST REQUEST\n-----------`);
    console.log(await POSTRequest({
        title: "123",
        body: "sdfsdfsd",
        userId: 4
    }));

    // Демонстрация PUT-запроса (полное обновление поста)
    console.log(`\n-----------\nPUT REQUEST\n-----------`);
    console.log(await PUTRequest({
        title: "123",
        body: "sdfsdfsd",
        userId: 4,
        id: 12
    }));

    // Демонстрация PATCH-запроса (частичное обновление)
    console.log(`\n-----------\nPATCH REQUEST\n-----------`);
    console.log(await PATCHRequest(35, "sjklfd;js"));

    // Демонстрация DELETE-запроса (удаление поста)
    console.log(`\n-----------\nDELETE REQUEST\n-----------`);
    console.log(await DELETERequest(43));
}

// Запускаем основную функцию
Main();