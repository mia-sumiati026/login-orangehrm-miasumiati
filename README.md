# OrangeHRM Automation Testing with Cypress

Repository ini berisi hasil pembelajaran dan tugas Automation Testing menggunakan Cypress, mulai dari latihan, quiz, hingga Final Project.

## 📚 Daftar Isi

- Quiz 3
- Tugas 16
- Tugas 17
- Tugas 18
- Final Project

---

# 📌 Daftar Tugas

## Quiz 3

✅ 14 Test Case Passed - Quiz 3

<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/8bffefb7-3a7b-4ef8-b68e-9eb11e868a79" />

---

## Tugas 16

✅ 14 Test Case Passed - Tugas 16 Intercept

<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/0166f196-4d73-4bea-b3c3-fcc6413ff194" />

---

## Tugas 17

✅ 14 Test Case Passed - Tugas 17 POM

<img width="1600" height="900" alt="image" src="https://github.com/user-attachments/assets/36bb42b3-bf4f-44a6-9a06-f7f096bc9696" />

---

## Tugas 18

✅ 14 Test Case Passed - Tugas 18 API Automation by Cypress

<img width="1600" height="900" alt="image" src="https://github.com/user-attachments/assets/1d40cf71-d3c1-4cf7-9377-53096e4c5487" />

# 🚀 Final Project

## 📌 Project Overview

Project ini dibuat sebagai Final Project Automation Testing dengan tujuan mengotomatisasi pengujian beberapa fitur utama pada aplikasi OrangeHRM.

## 🛠️ Technology Stack

- Cypress
- JavaScript
- Node.js
- CommonJS
- Page Object Model (POM)
- cy.intercept()
- cy.readFile()

---

# ✅ Test Modules

## 1. Login

Total Test Case : **14**

Meliputi pengujian:

- Login dengan data valid
- Login dengan username tidak valid
- Login dengan password tidak valid
- Login dengan username dan password tidak valid
- Login menggunakan karakter khusus
- Login menggunakan spasi
- Login menggunakan huruf kapital
- Login menggunakan tombol Enter
- Forgot Password
- Validasi field kosong
- Verifikasi berhasil masuk ke Dashboard

---

## 2. Directory

Total Test Case : **10**

Meliputi pengujian:

- Pencarian data tanpa filter
- Reset filter
- Filter berdasarkan Job Title
- Filter berdasarkan Location
- Filter Job Title dan Location
- Reset setelah pencarian
- Input karakter khusus
- Input angka
- Input spasi
- Refresh halaman Directory

---

## 3. Recruitment

Total Test Case : **11**

Meliputi pengujian:

- Akses menu Recruitment
- Menambahkan Candidate
- Mencari Candidate
- Melihat Detail Candidate
- Shortlist Candidate
- Reject Candidate
- Menghapus Candidate
- Akses menu Vacancy
- Menambahkan Vacancy
- Mengubah Vacancy
- Menghapus Vacancy

---

# 📊 Test Summary

| Module | Total Test Case |
|---------|----------------:|
| Login | 14 |
| Directory | 10 |
| Recruitment | 11 |
| **Total** | **35** |

---

# ⚙️ Configuration

## Prerequisites

Pastikan telah menginstal:

- Node.js (v18 atau lebih baru disarankan)
- Git
- Visual Studio Code

---

## Install Dependency

Clone repository:

```bash
git clone https://github.com/mia-sumiati026/login-orangehrm-miasumiati.git
```

Masuk ke folder project:

```bash
cd login-orangehrm-miasumiati
```

Install dependency:

```bash
npm install
```

---

# ▶️ Running Test

## Membuka Cypress

```bash
npx cypress open
```

Pilih browser kemudian jalankan test yang diinginkan.

---

## Menjalankan Semua Test (Headless)

```bash
npx cypress run
```

---

## Menjalankan Test Tertentu

### Login

```bash
npx cypress run --spec "cypress/e2e/TugasFinal-MiaSumiati/login.cy.js"
```

### Directory

```bash
npx cypress run --spec "cypress/e2e/TugasFinal-MiaSumiati/directory.cy.js"
```

### Recruitment

```bash
npx cypress run --spec "cypress/e2e/TugasFinal-MiaSumiati/recruitment.cy.js"
```

---

# 🧩 Design Pattern

Project ini menerapkan:

- Page Object Model (POM)
- CommonJS Module
- Network Intercept menggunakan `cy.intercept()`
- Data Driven Testing menggunakan `cy.readFile()`

---


### Screenshot Final Project

✅ Fitur Login - 14 Test Case Passed

<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/ae60e9ae-c093-458d-8250-dd22f1b14b00" />

✅ Menu Directory - 10 Test Case Passed

<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/37c26a74-ed51-4147-8596-036673be0c67" />

✅ Menu Recruitment - 11 Test Case Passed

<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/cb04ec1d-e51f-4b03-8827-22878d548e84" />

---

# 👤 Author

**Mia Sumiati**

Final Project Automation Testing

Menggunakan Cypress untuk pengujian aplikasi OrangeHRM.
https://github.com/mia-sumiati026/login-orangehrm-miasumiati
