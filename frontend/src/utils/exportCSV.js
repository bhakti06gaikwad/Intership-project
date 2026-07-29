export function exportToCSV(data, filename = "history.csv") {

  if (data.length === 0) {
    alert("No data available.");
    return;
  }

  const headers = [
    "Filename",
    "Variable",
    "Line Number",
    "Value",
    "Timestamp"
  ];

  const rows = data.map(item => [
    item.filename,
    item.variable_name,
    item.line_number,
    item.serialized_value,
    new Date(item.timestamp).toLocaleString()
  ]);

  const csvContent = [
    headers,
    ...rows
  ]
    .map(row => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = filename;

  link.click();

  URL.revokeObjectURL(url);

}