# OrangeHRM Login Automation

## Project Information
Automation Testing menggunakan Cypress pada fitur Login OrangeHRM Demo.

Website:
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

## Tools
- Cypress
- JavaScript
- Visual Studio Code
- Git
- GitHub

## Test Cases
Total Test Case : 14

### Positive Test
- Login valid
- Login dengan spasi di belakang username
- Login menggunakan username huruf kapital
- Login menggunakan tombol Enter

### Negative Test
- Username kosong
- Password kosong
- Username & Password kosong
- Password salah
- Username salah
- Username & Password salah
- Username karakter khusus
- Username spasi di depan
- Password huruf kapital
- Akses Dashboard tanpa login

## Folder Structure

```
cypress
│
├── e2e
│   └── login.cy.js
│
├── fixtures
│   └── loginData.json
│
├── support
│   ├── commands.js
│   └── e2e.js
│
├── cypress.config.js
├── package.json
└── README.md
```

## Installation

```bash
npm install
```

## Run Cypress

```bash
npx cypress open
```

atau

```bash
npx cypress run
```

## Result

✅ 14 Test Case Passed

<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/8bffefb7-3a7b-4ef8-b68e-9eb11e868a79" />


## Repository

https://github.com/mia-sumiati026/login-orangehrm-miasumiati
