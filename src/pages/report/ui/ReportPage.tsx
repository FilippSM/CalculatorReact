import { Container } from "@/shared/components/Container"
import styles from "./ReportPage.module.scss"

export const Report = () => {
  return (
    <Container className={styles.page}>
      <article className={styles.document}>
        <header className={styles.docHeader}>
          <span>Приложение 35 РК-04-2024 Редакция 4 от 16.02.2024</span>
          <span className={styles.docHeaderRight}>260119-M-959</span>
        </header>

        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.labelCell}>Дата испытаний:</td>
              <td className={styles.valueCell} colSpan={3}>
                19.01.2026
              </td>
            </tr>
            <tr>
              <td className={styles.labelCell}>Наименование заказчика:</td>
              <td className={styles.valueCell} colSpan={3}>
                ООО «ОЕМЛ»
              </td>
            </tr>
            <tr>
              <td className={styles.labelCell}>Наименование объекта испытаний:</td>
              <td className={styles.valueCell} colSpan={3}>
                Масло гидравлическое PM2101 Hydro ISO 32 LONGLIFE
              </td>
            </tr>
            <tr>
              <td className={styles.labelCell}>Регистрационный номер объекта испытаний:</td>
              <td className={styles.valueCell} colSpan={3}>
                260119-M-959
              </td>
            </tr>
            <tr>
              <td className={styles.labelCell}>
                Условия проведения испытаний:
              </td>
              <td colSpan={3}>
                <table className={styles.nestedTable}>
                  <tbody>
                    <tr>
                      <th colSpan={3}>Применяемое оборудование</th>
                    </tr>
                    <tr>
                      <td colSpan={3}>Термогигрометр ИВА-6Н-КП-Д № 22506</td>
                    </tr>
                    <tr>
                      <th colSpan={3}>Параметры</th>
                    </tr>
                    <tr className={styles.paramsRow}>
                      <td>t, °C: 21,9</td>
                      <td>p, кПа: 98,3</td>
                      <td>φ, %: 25,9</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <h2 className={styles.sectionTitle}>Испытания</h2>

        <section className={styles.testBlock}>
          <h3 className={styles.testTitle}>
            1. Температура вспышки в открытом тигле, °С по ГОСТ 4333
          </h3>
          <div className={styles.equipment}>
            <p>
              <strong>Оборудование:</strong>
            </p>
            <ul>
              <li>Аппарат для определения температуры вспышки в открытом тигле ТВО-ПХП № 1052</li>
              <li>Термометр ASTM 11c № 30</li>
              <li>Секундомер электронный «Интеграл С-01» № 433939</li>
              <li>Термогигрометр ИВА-6Н-КП-Д № 22506</li>
            </ul>
          </div>
          <p className={styles.dataLabel}>Данные:</p>
          <table className={`${styles.table} ${styles.dataTable}`}>
            <thead>
              <tr className={styles.headerGroup}>
                <th colSpan={4}>Первое измерение</th>
                <th colSpan={4}>Второе измерение</th>
                <th colSpan={2}>Результаты</th>
              </tr>
              <tr>
                <th>
                  t<sub>0</sub>, °C
                </th>
                <th>p, кПа</th>
                <th>Поправка, °C</th>
                <th>
                  t<sub>c</sub> скорректированное, °C
                </th>
                <th>
                  t<sub>0</sub>, °C
                </th>
                <th>p, кПа</th>
                <th>Поправка, °C</th>
                <th>
                  t<sub>c</sub> скорректированное, °C
                </th>
                <th>Повторяемость r, °C</th>
                <th>
                  Среднее значение t<sub>cp</sub>, °C
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>235</td>
                <td>98,3</td>
                <td>1</td>
                <td>236</td>
                <td>234</td>
                <td>98,3</td>
                <td>1</td>
                <td>235</td>
                <td>1</td>
                <td>236</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className={styles.testBlock}>
          <h3 className={styles.testTitle}>2. Содержание механических примесей, % по ГОСТ 6370</h3>
          <div className={styles.equipment}>
            <p>
              <strong>Оборудование:</strong>
            </p>
            <ul>
              <li>Весы лабораторные электронные Radwag AS 220/C/2 № 376438/12</li>
              <li>Весы лабораторные электронные Radwag PS 10100/C/2/MS № 698940</li>
              <li>Электропечь низкотемпературная лабораторная SNOL 58/350 № 1176</li>
            </ul>
          </div>
          <p className={styles.dataLabel}>Данные:</p>
          <table className={`${styles.table} ${styles.dataTable}`}>
            <thead>
              <tr className={styles.headerGroup}>
                <th colSpan={4}>Первое измерение</th>
                <th colSpan={4}>Второе измерение</th>
                <th colSpan={2}>Результаты</th>
              </tr>
              <tr>
                <th>
                  Масса стакана + ф-тр + мех. примеси m<sub>1</sub>, г
                </th>
                <th>
                  Масса стакана + фильтр m<sub>2</sub>, г
                </th>
                <th>
                  Масса пробы m<sub>3</sub>, г
                </th>
                <th>
                  Содержание мех. примесей X<sub>1</sub>, %
                </th>
                <th>
                  Масса стакана + ф-тр + мех. примеси m<sub>1</sub>, г
                </th>
                <th>
                  Масса стакана + фильтр m<sub>2</sub>, г
                </th>
                <th>
                  Масса пробы m<sub>3</sub>, г
                </th>
                <th>
                  Содержание мех. примесей X<sub>2</sub>, %
                </th>
                <th>Повторяемость r, %</th>
                <th>
                  Среднее значение X<sub>cp</sub>, %
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>47,0315</td>
                <td>47,0295</td>
                <td>100,00</td>
                <td>0,0020</td>
                <td>46,4103</td>
                <td>46,4082</td>
                <td>100,00</td>
                <td>0,0021</td>
                <td>0,0001</td>
                <td>0,0021</td>
              </tr>
            </tbody>
          </table>
        </section>

        <h2 className={styles.sectionTitle}>Результаты испытаний</h2>
        <p className={styles.resultsIntro}>
          Масло гидравлическое PM2101 Hydro ISO 32 LONGLIFE от 19.01.2026 № 260119-M-959:
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: "6%" }}>№ п/п</th>
              <th>Наименование показателя, единицы измерения, ТНПА на метод испытания</th>
              <th style={{ width: "14%" }}>Результаты испытаний</th>
              <th style={{ width: "18%" }}>Расширенная неопределенность, U</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }}>1.</td>
              <td>Температура вспышки в открытом тигле, °С по ГОСТ 4333</td>
              <td style={{ textAlign: "center" }}>236</td>
              <td style={{ textAlign: "center" }}>6</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>2.</td>
              <td>Содержание механических примесей, % по ГОСТ 6370</td>
              <td style={{ textAlign: "center" }}>0,0021</td>
              <td style={{ textAlign: "center" }}>0,0018</td>
            </tr>
          </tbody>
        </table>
        <p className={styles.footnote}>
          Оценивание расширенной неопределенности проведено в соответствии с методиками расчета
          неопределенностей для данных показателей
        </p>

        <table className={`${styles.table} ${styles.signatureTable}`}>
          <thead>
            <tr>
              <th>Ф.И.О. исполнителя</th>
              <th>Подпись</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.nameCell}>Шпаковская С.М.</td>
              <td>
                <div className={styles.signaturePlaceholder} aria-hidden />
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </Container>
  )
}
