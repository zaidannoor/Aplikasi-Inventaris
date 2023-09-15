import React, { Fragment, useEffect, useState } from "react";
import { Page, Text, StyleSheet, Document, View } from "@react-pdf/renderer";
import loading from "../../images/loading.gif";
import moment from "moment";

function TableData({ items, place, title }) {
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

  const column = ["No", "Nama Barang", "Baik", "Buruk", "Total", "Tahun"];
  const column2 = ["name", "baik", "buruk", "total", "date"];

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
        <Text style={styles.title}>Inventaris {place} {title}</Text>
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
            <Text style={{ width: `${100 / column2.length}%` }}>{++a}</Text>
            <Text style={{ width: `${100 / column2.length}%` }}>
              {rowData["name"]}
            </Text>
            <Text style={{ width: `${100 / column2.length}%` }}>
              {rowData["baik"]}
            </Text>
            <Text style={{ width: `${100 / column2.length}%` }}>
              {rowData["buruk"]}
            </Text>
            <Text style={{ width: `${100 / column2.length}%` }}>
              {rowData["total"]}
            </Text>
            <Text style={{ width: `${100 / column2.length}%` }}>
              {moment(rowData["data"]).format("YYYY")}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}

export default TableData;
