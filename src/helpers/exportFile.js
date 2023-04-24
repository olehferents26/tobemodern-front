import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow, WidthType, ImageRun } from "docx";

export const handleExportFile = async (imagesData, detailsTableData, furnitureTableData) => {

   const getImagesData = async () => {
      const result = await imagesData;
      return result;
   };

   async function createImages() {
      const imageData = await getImagesData();
      const images = imageData.map((data) => {
         return new ImageRun({
            data: data,
            transformation: {
               width: 300,
               height: 200,
            },
            altText: {
               title: "This is title",
               description: "This is image",
               name: "My Image",
            },
         });
      });
      const paragraphs = images.map((image) => {
         return new Paragraph({
            children: [image],
         });
      });
      return paragraphs;
   }

   const Images = await createImages();

   const DetailsTable = new Table({
      columnWidths: [1000, 1000, 1000, 1000],
      rows: [
         new TableRow({
            children: [
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Найменування")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Матеріал")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Виріб")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Товщина")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Довжина")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Ширина")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Зверху (довжина)")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Знизу (довжина)")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Зправа (ширина)")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Зліва (ширина)")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Паз")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Сверління")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Фрезерування")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Опис")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Кількість")],
               }),
            ],
         }),
      ],
   });

   const FurnitureTable = new Table({
      columnWidths: [2000, 2000, 2000, 2000],
      rows: [
         new TableRow({
            children: [
               new TableCell({
                  width: {
                     size: 2000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Параметер 1")],
               }),
               new TableCell({
                  width: {
                     size: 2000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Параметер 2")],
               }),
               new TableCell({
                  width: {
                     size: 2000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Параметер 3")],
               }),
               new TableCell({
                  width: {
                     size: 2000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Параметер 4")],
               }),
            ],
         }),
      ],
   });

   detailsTableData.forEach((complectation) => {
      const newRow = new TableRow({
         children: [
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param1)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param2)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param3)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param4)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param5)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param6)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param7)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param8)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param9)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param10)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param11)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param12)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param13)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param14)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param15)],
            }),
         ],
      });

      DetailsTable.addChildElement(newRow);
   });

   furnitureTableData.forEach((complectation) => {
      const newRow = new TableRow({
         children: [
            new TableCell({
               width: {
                  size: 2000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param1)],
            }),
            new TableCell({
               width: {
                  size: 2000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param2)],
            }),
            new TableCell({
               width: {
                  size: 2000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param3)],
            }),
            new TableCell({
               width: {
                  size: 2000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param4)],
            }),
         ],
      });

      FurnitureTable.addChildElement(newRow);
   });

   const doc = new Document({
      compatibility: {
      },
      sections: [
         {
            properties: {},
            children: [
               ...Images,
               new Paragraph({
                  children: [
                     new TextRun(""),
                  ],
               }),
               new Paragraph({
                  children: [
                     new TextRun("Деталі"),
                  ],
               }),
               DetailsTable,
               new Paragraph({
                  children: [
                     new TextRun("Фурнітура"),
                  ],
               }),
               FurnitureTable,
            ],
         },
      ],
   });

   Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "example.docx");
   });
};