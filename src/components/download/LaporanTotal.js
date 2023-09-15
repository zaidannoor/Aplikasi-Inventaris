import React from "react";
import { Page, Text, StyleSheet, Document, View } from "@react-pdf/renderer";
import loading from "../../images/loading.gif";
import moment from "moment";

function LaporanTotal({ items}) {
  const styles = StyleSheet.create({
    rowView: {
      display: "flex",
      flexDirection: "row",
      borderTop: "1px solid #EEE",
      paddingTop: 8,
      paddingBottom: 8,
      textAlign: "center",
      fontSize: "12px",
    },
    title: {
      fontSize: "28px",
      textAlign: "center",
      margin: "20px",
    },
  });

  const column = ["No", "Kode Kategori", "Kode Barang", "Nama Barang", "Jumlah"];

  if (!(items)) {
    return (
      <img
        className="position-absolute top-50 start-50 translate-middle"
        src={loading}
        alt="loading"
        width={200}
      />
    );
  }

  return (
    <Document>
      <Page>
        <Text style={styles.title}>Total Inventaris Sekolah</Text>
        <View style={styles.rowView}>
          {column.map((c, i = 0) => (
            <Text
              key={i++}
              style={{
                width: `${100 / column.length}%`,
              }}
            >
              {c}
            </Text>
          ))}
        </View>
        {items.map((rowData, a = 0) => (
          <View style={styles.rowView} key={a++}>
            <Text style={{ width: `${100 / column.length}%` }}>{++a}</Text>
            <Text style={{ width: `${100 / column.length}%` }}>
              {rowData["code_type"]}
            </Text>
            <Text style={{ width: `${100 / column.length}%` }}>
              {rowData["code"]}
            </Text>
            <Text style={{ width: `${100 / column.length}%` }}>
              {rowData["name"]}
            </Text>
            <Text style={{ width: `${100 / column.length}%` }}>
              {rowData["quantity"]}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}

export default LaporanTotal;
