export function ChartDataTable({ caption, data, rowKey, labelKey, valueKey, labelHeader, valueHeader }) {
  return (
    <div className="sr-only">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{labelHeader}</th>
            <th scope="col">{valueHeader}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((point) => (
            <tr key={point[rowKey]}>
              <th scope="row">{point[labelKey]}</th>
              <td>{point[valueKey]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
