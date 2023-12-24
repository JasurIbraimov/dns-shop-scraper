# DNS Shop Scraper

A web scraper using Puppeteer and Puppeteer Extra to collect information about products from the DNS Shop website.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Contributing](#contributing)

## Overview

This web scraper is built using Puppeteer and Puppeteer Extra to collect information about products from the DNS Shop website. It navigates through the product pages, intercepts network requests to filter unnecessary resources, and extracts product information.

## Features

- Scrapes product names and prices from the DNS Shop website.
- Blocks unnecessary requests to improve performance and reduce server load.
- Outputs scraped data to a CSV file.

## Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Puppeteer](https://pptr.dev/)
- [Puppeteer Extra](https://github.com/berstend/puppeteer-extra)
- [TypeScript](https://www.typescriptlang.org/)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JasurIbraimov/dns-scraper.git
   cd dns-shop-scraper
2. **Install dependencies:**
   ```bash
   npm run install

   
3. **Usage:**
To run the scraper and collect information about products from the DNS Shop website, use the following command:
   ```bash
   npm run start

   
## Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request.

