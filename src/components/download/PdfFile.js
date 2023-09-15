import React, { useCallback, useState, useEffect } from "react";
import loading from "../../images/loading.gif";
import {
  Page,
  Text,
  StyleSheet,
  Document,
  PDFViewer,
} from "@react-pdf/renderer";

import Swal from "sweetalert2";
import moment from "moment";

function PdfFile() {
  const styles = StyleSheet.create({
    header: {
      textAlign: "center",
    },
    paragraf: {
        fontSize: "16px"
    }
  });

  return (
    <Document>
      <Page>
        <Text style={styles.header}>Inventaris Jurusan</Text>
        <Text style={styles.paragraf}>
          Lorem ipsum, dolor sit amet consectetur adipisicing, elit. Dolorum
          nam, doloribus quae, dolore, officia maiores amet corporis sapiente
          vitae expedita enim provident nulla accusamus excepturi. Laudantium
          explicabo repellendus saepe unde aliquid at consectetur officia
          pariatur id tempore laboriosam minus magnam, eos reiciendis eveniet
          maxime sapiente ab accusamus illo nemo dolorum.
        </Text>
      </Page>
    </Document>
  );
}

export default PdfFile;
