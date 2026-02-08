# 🚀 CruxAnalytics

**Enterprise-grade financial diagnostic platform for business case analysis.**
Now Open Source and free for everyone.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Mobile-orange.svg)](https://expo.dev/)

---

## 📊 What is CruxAnalytics?

CruxAnalytics is a powerful financial engine designed for the strategic evaluation of business projects. Unlike traditional spreadsheets, Crux offers a modular structure based on world-class software engineering principles, allowing entrepreneurs, analysts, and innovation agencies to quantify the viability of their ideas with scientific precision.

The project was born under the premise of **"Clarity in Complexity"**, transforming raw financial data into actionable insights through industry-standard metrics and now-liberated proprietary methodologies.

---

## 🎯 Why was it created?

This project was developed to solve three critical problems in business analysis:

1.  **Lack of Standards**: Automating the calculation of complex metrics (such as IRR through iterative algorithms) to avoid human error.
2.  **Efficiency Invisibility**: Introducing **Vanguard Metrics** (OFI, TFDI, SER) to measure problems that traditional balance sheets often ignore, such as the cost of manual processes or the financial drag of technical debt.
3.  **Local Predictive Analysis**: Creating a tool that allows for scenario simulations (Best/Worst case) privately, without sensitive data leaving the user's infrastructure.

---

## 🛠️ How does it work?

### Modular Architecture (DDD)
CruxAnalytics uses an architecture based on **Domain-Driven Design (DDD)**, which clearly separates "business intelligence" from "technology":

*   **Domain Layer**: Contains pure calculations (ROI, NPV, IRR). It is the heart of the system and does not depend on any database or interface.
*   **Application Layer**: Manages use cases, such as comparing two different scenarios or generating a narrative diagnosis.
*   **Infrastructure Layer**: Handles persistence (MySQL with Drizzle ORM), communication (tRPC), and PDF report generation.

### Guest Mode (Frictionless)
To maximize utility, the application implements an automatic **"Guest Mode"**. This allows any user to start creating and saving projects immediately without registering, using a default user ID in the backend.

---

## 📊 Included Metrics

### 1. Standard Financials
*   **ROI (Return on Investment)**: Percentage profitability of capital.
*   **NPV (Net Present Value)**: Value of future flows discounted to the present.
*   **IRR (Internal Rate of Return)**: Intrinsic profitability calculated with precision using the Newton-Raphson algorithm.
*   **Payback Period**: Exact time in months to recover the investment.

### 2. Vanguard Metrics (Proprietary)
*   **OFI (Operational Friction Index)**: Quantifies how much money the company loses by having manual processes instead of automated ones.
*   **TFDI (Tech-Debt Drag)**: Measures the direct economic impact of maintaining old systems or poorly written code.
*   **SER (Strategic Efficiency Ratio)**: Evaluates whether the company's growth is sustainable relative to its burn rate.

---

## 📦 Tech Stack

CruxAnalytics uses a modern and professional stack:

*   **Frontend**: React Native with **Expo SDK 54**. Allows the app to work on iPhone, Android, and Web browsers with the same code.
*   **Styling**: **NativeWind 4** (Tailwind CSS for mobile), enabling a "premium" and adaptable design.
*   **Backend**: Node.js with **tRPC**, ensuring type safety from server to client.
*   **Database**: **MySQL** managed by **Drizzle ORM** for ultra-fast and secure queries.
*   **AI**: Optional integration with **OpenAI** to generate narrative diagnoses that explain the numbers in human language.

---

## 🚀 Quick Start

### Prerequisites
*   Node.js 18 or superior.
*   pnpm (recommended) or npm.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Jon-ai-tech/CruxAnalytics.git
cd CruxAnalytics

# 2. Install dependencies
pnpm install

# 3. Setup environment and local database
pnpm setup
```

### Execution

```bash
# Start server and web interface simultaneously
pnpm dev
```

---

## 🗺️ Documentation

- [Architecture Overview](docs/ARCHITECTURE-V2.md)
- [Database Schema](docs/database-migration.md)
- [Vanguard Metrics Methodology](docs/architecture/ADR-003-vanguard-metrics.md)

---

## 📄 License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute it, even for commercial purposes. See the [LICENSE](LICENSE) file for details.

---

**Built with excellence by the Vanguard Crux community.**
*Transforming complexity into competitive advantages.*
