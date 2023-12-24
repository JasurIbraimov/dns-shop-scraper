// Импортирование библиотек
import puppeteerExtra from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";
import { Product } from "./types";

const BASE_URL =
  "https://www.dns-shop.ru/catalog/17a8d26216404e77/vstraivaemye-xolodilniki/"; // Путь для получения товаров
const OUTPUT_FILE = "products.csv"; // Путь конечного файла для сохранения товаров


let productsContent = "Наименование,Цена"; // Текст для записи в csv
let currentPage = 1; // Номер текущей страницы для парсинга

puppeteerExtra.use(stealthPlugin()); // Режим маскировки (чтобы не заметил сайт)

// Запуск экземпляра браузера Puppeteer
puppeteerExtra.launch().then(async (browser) => {
  const page = await browser.newPage(); // Создание нового экземпляра страницы в браузере Puppeteer.
  await page.setRequestInterception(true); // Включить перехват сетевых запросов, отправляемых браузером
  
  // Обработка сетевого запроса
  page.on("request", (req) => {
    const resourceType = req.resourceType(); // Получение типа ресурса
    if (
      resourceType === "image" ||
      resourceType === "stylesheet" ||
      resourceType === "font"
    ) {
      req.abort(); // Блокировать запросы на изображения, таблицы стилей и шрифты
    } else {
      req.continue(); // Разрешить скрипты и другие типы ресурсов
    }
  });

  // Обработка ответов на сетевые запросы
  page.on("response", async (response) => {
    const url = response.url(); // Извлечь URL-адрес ответа
    if (url.includes("product-buy")) { // Если адрес содержит товары для покупки
      const responseBody = await response.text(); // Получить ответ в виде текста
      try {
        const { data } = JSON.parse(responseBody); // Попытаться превратить его в javascript-объект
        const states = data.states as Product[]; // Получить массив продуктов
        states.forEach((product) => {
          // Для каждого продукта в массиве записать их наименование и текущую цену 
          productsContent += `\n${product.data.name},${product.data.price.current}`; 
        });
        currentPage++; // Перейти на следующую страницу
      } catch (error) {
        console.log(error)
      }
    }
  });

  while (currentPage <= 5) { // Пока не дойдем до 5 страницы с товарами
    await page.goto(`${BASE_URL}?p=${currentPage}`); // Перейти на текущую страницу
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Подождать 1 секунду (для предотвращения слишком большого количества запросов)
  }

  fs.writeFileSync(OUTPUT_FILE, productsContent); // Записать полученный результат в файл .csv

  await browser.close(); // Закрыть браузер
});
