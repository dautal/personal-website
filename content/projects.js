window.SITE_CONTENT = {
  projects: {
    title: "Selected Work",
    items: [
      {
        slug: "dnevnik-todo-calendar",
        meta: "2026 | Product Design, Full-Stack Planning System",
        detailMeta: "Jul 2025 - Present",
        title: "Nev Todo Calendar",
        subtitle: "A weekly planner that turns paper-journal discipline into a calm digital product.",
        bullets: [
          {
            label: "Product",
            text: "Designed a two-page weekly spread that borrows the structure and discipline of a Soviet and post-Soviet paper planner rather than the endless-feed feel of a typical to-do app.",
          },
          {
            label: "UX",
            text: "Built around ritual and rhythm: rich notes, current-day highlighting, drag-and-drop planning, a misc inbox, and theme variations that keep the planner calm but still modern.",
          },
          {
            label: "Platform",
            text: "Under the surface, it combines React, TypeScript, Vite, Supabase sync with localStorage fallback, Google-first beta access control, localization, and expandable calendar views.",
          },
        ],
        stack: "React, TypeScript, Vite, Supabase, localStorage fallback, Vercel",
        links: [
          {
            label: "Learn More",
            href: "/projects/dnevnik-todo-calendar/",
            primary: true,
          },
          {
            label: "Try Nev",
            href: "https://dnevnik-todo-calendar.vercel.app/#",
            newTab: true,
          },
        ],
      },
      {
        slug: "halo-smart-safety-device",
        meta: "2023 | Embedded Systems, Hardware Prototyping, Mobile Integration",
        detailMeta: "Sep 2022 - May 2023",
        title: "Halo Smart Safety Device",
        subtitle: "A portable safety device combining physical sensing, Bluetooth alerts, and product-led hardware design.",
        bullets: [
          {
            label: "Leadership",
            text: "Designed Halo and led a five-person team through the second half of the academic year, coordinating work in Trello and maintaining biweekly technical progress logs.",
          },
          {
            label: "System",
            text: "Built a portable smart device that used calibrated accelerometer and strain-gauge sensing with Bluetooth-connected smartphone alerts to detect drink tampering.",
          },
          {
            label: "Execution",
            text: "Implemented Arduino logic, integrated BLE communication, contributed to iOS app development, and carried out hardware testing, soldering, prototype construction, and sensor calibration.",
          },
        ],
        stack: "Arduino Nano 33 BLE, BLE, strain gauge, accelerometer, gyroscope, iOS app, 3D-printed hardware",
        links: [
          {
            label: "Learn More",
            href: "/projects/halo-smart-safety-device/",
            primary: true,
          },
        ],
      },
      {
        slug: "mlops-practicum-databricks",
        meta: "2022 | Cloud MLOps, Platform Evaluation, CI/CD",
        detailMeta: "Sep 2022 - Jan 2023",
        title: "MLOps Practicum - Databricks",
        subtitle: "An MLOps practicum that tested Databricks across AWS, Azure, GitHub Actions, and Azure DevOps.",
        bullets: [
          {
            label: "Collaboration",
            text: "Worked with a Fortune 500 financial services cloud engineering team to evaluate Databricks as a possible MLOps platform across AWS and Azure.",
          },
          {
            label: "Execution",
            text: "Explored Databricks through hands-on fraud detection pipelines and learned the end-to-end MLOps lifecycle using Azure and CI/CD workflows.",
          },
          {
            label: "Reporting",
            text: "Delivered biweekly sprint reports and presentations covering platform scalability, cost efficiency, performance, and usability.",
          },
        ],
        stack: "Databricks, AWS, Azure, GitHub Actions, Azure DevOps, MLflow, Python",
        links: [
          {
            label: "Learn More",
            href: "/projects/mlops-practicum-databricks/",
            primary: true,
          },
        ],
      },
    ],
    miscellaneous: {
      slug: "miscellaneous-projects",
      meta: "2019-present | Hardware, Software, ML, Finance, Business, Data Analysis",
      title: "Miscellaneous Projects",
      subtitle: "Smaller tools, experiments, and side projects that I can add here over time.",
      bullets: [
        "Smaller tools, experiments, and utilities to add here later.",
        "Short automation or scripting projects.",
        "Data, scraping, and workflow side projects.",
        "Quick frontend or product experiments.",
      ],
    },
  },
};
