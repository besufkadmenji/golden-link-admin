import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage } from "@/utils/http";
import { ExportParams } from "@/types/export/export.params";
import { ExportModel } from "@/types/export/export.model";

export class ExportService {
  static async exportToExcel(
    model: ExportModel | string,
    params: ExportParams = {},
    lang: string = "en",
  ): Promise<void> {
    try {
      // Add exclude parameter if not provided
      if (!params.exclude) {
        params.exclude = "id,createdAt";
      }

      const response = await axiosClient.get(`/export/${model}`, {
        params,
        headers: {
          "Accept-Language": lang,
        },
        responseType: "blob",
      });

      // Create blob from response
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split("T")[0];
      link.download = `${model}-export-${timestamp}.xlsx`;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      throw new Error(
        extractAxiosErrorMessage(
          error,
          `Failed to export ${model} data to Excel.`,
        ),
      );
    }
  }

  static async generateExcelFromRows(
    rows: Record<string, unknown>[],
    filename: string = "export",
    sheetName: string = "Sheet1",
    removeColumns: string[] = [],
  ): Promise<void> {
    try {
      // Dynamic import of xlsx library
      const XLSX = await import("xlsx");

      if (!rows || rows.length === 0) {
        throw new Error("No data provided for export");
      }

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Convert rows to worksheet
      const worksheet = XLSX.utils.json_to_sheet(
        rows.map((row) => {
          const newRow = { ...row };
          removeColumns.forEach((col) => {
            delete newRow[col];
          });
          return newRow;
        }),
      );

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

      // Generate filename with timestamp if not provided custom name
      const timestamp = new Date().toISOString().split("T")[0];
      const finalFilename = filename.includes(".xlsx")
        ? filename
        : `${filename}-${timestamp}.xlsx`;

      // Write the file
      XLSX.writeFile(workbook, finalFilename);
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to generate Excel file from rows.",
      );
    }
  }
}
