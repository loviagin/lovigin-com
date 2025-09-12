// import Link from "next/link";
// import styles from "./page.module.css";

// export const metadata = {
//   title: "Документы компании | LOVIGIN LTD",
//   description: "Основные корпоративные документы LOVIGIN LTD с быстрым предпросмотром и ссылками на скачивание.",
// };

// type CompanyDocument = {
//   id: string;
//   title: string;
//   description: string;
//   href: string;
//   note?: string;
// };

// const documents: CompanyDocument[] = [
//   {
//     id: "incorporation",
//     title: "Certificate of Incorporation",
//     description:
//       "Сертификат о регистрации LOVIGIN LTD. Подтверждает факт инкорпорации компании.",
//     href: "/documents/certificate-of-incorporation.pdf",
//   },
//   {
//     id: "maa",
//     title: "Memorandum & Articles of Association",
//     description:
//       "Уставные документы компании (можно объединить в один PDF-файл).",
//     href: "/documents/memorandum-articles-of-association.pdf",
//   },
//   {
//     id: "companies-house",
//     title: "Company Register extract (Companies House)",
//     description:
//       "Актуальная выписка (Current Company Information) из государственного реестра.",
//     href: "/documents/companies-house-current-info.pdf",
//   },
//   {
//     id: "paye-letter",
//     title: "PAYE Registration Letter",
//     description:
//       "Письмо о регистрации в PAYE. Применяется, если официально оформлена заработная плата.",
//     href: "/documents/paye-registration-letter.pdf",
//   },
// ];

// export default function DocumentsPage() {
//   return (
//     <main>
//       <section className={styles.container}>
//         <div className={styles.inner}>
//           <section className={styles.header}>
//             <h1 className={styles.title}>Документы компании</h1>
//             <p className={styles.subtitle}>
//               Здесь собраны ключевые корпоративные документы LOVIGIN LTD. Нажмите на
//               карточку, чтобы открыть или скачать PDF.
//             </p>
//           </section>

//           <section className={styles.grid}>
//             {documents.map((doc) => (
//               <Link key={doc.id} href={doc.href} target="_blank" className={styles.card}>
//                 <div className={styles.preview}>
//                   <span className={styles.badge}>PDF</span>
//                   <div className={styles.previewBars}>
//                     <span />
//                     <span />
//                     <span />
//                   </div>
//                 </div>
//                 <div className={styles.content}>
//                   <h2 className={styles.cardTitle}>{doc.title}</h2>
//                   <p className={styles.description}>{doc.description}</p>
//                   {doc.note && <span className={styles.note}>{doc.note}</span>}
//                   <div className={styles.actions}>
//                     <span className={styles.link}>Открыть документ</span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </section>
//         </div>
//       </section>
//     </main>
//   );
// }


